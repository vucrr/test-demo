import {
  FETCH_CREDIT_COOKIE,
  FETCH_CREDIT_CREATE_CUP,
  FETCH_CREDIT_CREATE_QUERY,
  FETCH_CREDIT_PAY_INFO,
  FETCH_CREDIT_SMS,
} from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {
  realName: '',
  idNo: '',
  SMS: {},
  cup: {},
  query: {},
  cookie: {
    // sms_code: '',
    // name:  '',
    // card_id:  '',
    // acc_no: '',
    // phone: '',
    // cvn: '',
  },
}

export default handleActions(
  {
    [FETCH_CREDIT_PAY_INFO](state, { payload }) {
      const { realName, idNo } = payload
      return state.set('realName', realName).set('idNo', idNo)
    },
    [FETCH_CREDIT_SMS](state, { payload }) {
      return state.set('SMS', payload)
    },
    [FETCH_CREDIT_CREATE_CUP](state, { payload }) {
      return state.set('cup', payload)
    },
    [FETCH_CREDIT_CREATE_QUERY](state, { payload }) {
      return state.set('query', payload)
    },
    [FETCH_CREDIT_COOKIE](state, { payload }) {
      return state.set('cookie', fromJS(payload))
    },
  },
  fromJS(initial),
)
