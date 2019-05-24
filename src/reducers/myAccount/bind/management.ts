import { FETCH_BIND_WECHAT_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {
  btnText: '',
  link: '',
}

export default handleActions(
  {
    [FETCH_BIND_WECHAT_INFO](state, { payload }) {
      return state.set('btnText', payload.content).set('link', payload.redirect_url)
    },
  },
  fromJS(initial),
)
