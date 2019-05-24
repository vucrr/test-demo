import { INIT_TABBAR } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { getAuth, getBbfHeaders, getBfaHeaders, getQsyHeaders, getTabBar, getUtm } from 'store/createStore'
import cookies from 'utils/cookies'
import { getUA } from '../../server/utils/tools'

export const preloadedServerApp = fromJS({
  tabBar: {
    hideHome: false,
    linkToDic: {
      home: '/',
      product: '/product/category',
      myCenter: '/account/center',
    },
  },
  ua: {},
  utm: {},
  auth: {},
  headers: {},
  headers2: {
    userToken: '',
    userIdV2: '',
  },
})

const serverApp = handleActions(
  {
    [INIT_TABBAR](state) {
      // tslint:disable-next-line
      if (typeof window !== 'undefined') {
        const ua = navigator.userAgent
        const channelId = +(cookies.get('channelId') || '0')
        const userId = cookies.get('user_id_v2')
        return state
          .set('ua', fromJS(getUA(ua, channelId)))
          .set('utm', fromJS(getUtm(channelId)))
          .set('headers', fromJS(getBbfHeaders(document.cookie, ua)))
          .set('headers2', fromJS(getBfaHeaders()))
          .set('headers3', fromJS(getQsyHeaders()))
          .set('auth', fromJS(getAuth(userId)))
          .set('tabBar', fromJS(getTabBar(channelId)))
      }
      return state
    },
  },
  fromJS(preloadedServerApp),
)

export default serverApp
