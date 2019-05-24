import { FETCH_CENTER_INFO, GET_USER_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { MyCenterReturns } from 'interfaces/account/center'
import { CenterReturns } from 'interfaces/center'
import { handleActions } from 'redux-actions'

const initialCenter: CenterReturns & { newInfo: any } = {
  userInfo: {
    phone: '',
    user_balance: 0,
    coupon_list_count: 0,
  },
  tradeCount: {
    rent_list_count: 0,
    pending_list_count: 0,
    unpay_count: 0,
  },
  mpActivityInfo: [],
  newInfo: {},
}

const center = handleActions(
  {
    [GET_USER_INFO](state, { payload }) {
      const { userInfo, tradeCount, mpActivityInfo }: CenterReturns = payload
      return state
        .set('userInfo', fromJS(userInfo))
        .set('tradeCount', fromJS(tradeCount))
        .set('mpActivityInfo', fromJS(mpActivityInfo))
    },
    [FETCH_CENTER_INFO](state, { payload }) {
      const info: MyCenterReturns = payload
      return state.set('newInfo', fromJS(info))
    },
  },
  fromJS(initialCenter),
)

export default center
