import { InitTabBarPayload } from 'actions/app'
import {
  CHECK_TRADE_DONE,
  GET_NAV_ICONS,
  HIDDEN_TABBAR,
  INIT_TABBAR,
  RAS_PRIVATE_KEY,
  TOGGLE_TABBAR,
} from 'constant/index'
import { fromJS } from 'immutable'
import { NavIcons, NavIconsReturns } from 'interfaces/common'
import { handleActions } from 'redux-actions'

interface AppState {
  tabBar: InitTabBarPayload
  signature: object
  navIcons: Partial<NavIconsReturns>
  orderTips: {
    is_have_undone_trade: boolean
    tips: string
  }
}

const initialApp: AppState = {
  tabBar: {
    selectedTab: '',
    show: false,
  },
  signature: {},
  navIcons: {
    is_festival: 0,
    icons: [],
  },
  orderTips: {
    is_have_undone_trade: false,
    tips: '',
  },
}

const app = handleActions(
  {
    [INIT_TABBAR](state, { payload }) {
      const { selectedTab, show }: InitTabBarPayload = payload
      return state.setIn(['tabBar', 'selectedTab'], selectedTab).setIn(['tabBar', 'show'], show)
    },
    [TOGGLE_TABBAR](state) {
      const show = state.getIn(['tabBar', 'show'])
      return state.setIn(['tabBar', 'show'], !show)
    },
    [HIDDEN_TABBAR](state) {
      return state.setIn(['tabBar', 'show'], false)
    },
    [RAS_PRIVATE_KEY](state, { payload }) {
      const { key, timespan, token } = payload
      return state.setIn(['signature', key], fromJS({ timespan, token }))
    },
    [GET_NAV_ICONS](state, { payload }) {
      const dicKey: any = {
        0: 'home',
        1: 'product',
        2: 'myCenter',
      }
      const { is_festival, icons }: NavIconsReturns = payload
      const list = (icons || []).map((item: NavIcons, index: number) => ({
        ...item,
        key: dicKey[index],
      }))
      return state.set('navIcons', fromJS({ is_festival, icons: list }))
    },
    [CHECK_TRADE_DONE](state, { payload }) {
      const { is_have_undone_trade, tips }: AppState['orderTips'] = payload
      return state.setIn(['orderTips', 'is_have_undone_trade'], is_have_undone_trade).setIn(['orderTips', 'tips'], tips)
    },
  },
  fromJS(initialApp),
)

export default app
