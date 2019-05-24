import { FETCH_BIND_RESULT_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {
  phone: '',
  btnText: '',
  link: '',
}

export default handleActions(
  {
    [FETCH_BIND_RESULT_INFO](state, { payload }) {
      return state
        .set('phone', payload.phone)
        .set('btnText', payload.content)
        .set('link', payload.redirect_url)
    },
  },
  fromJS(initial),
)
