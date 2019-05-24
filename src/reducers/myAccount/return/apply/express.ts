import {
  CHANGE_EXPRESS_ADDRESS,
  CHANGE_EXPRESS_TIME,
  CHANGE_EXPRESS_TYPE,
  FETCH_EXPRESS_LOGISTICS,
  FETCH_RETURN_APPLY_DETAIL,
  GET_EXPRESS_NUMBER,
} from 'constant/index'
import { fromJS } from 'immutable'
import { ExpressDetailReturn, LogisticReturn } from 'interfaces/account/return/apply'
import { handleActions } from 'redux-actions'

const initialInfo: any = {
  expressTime: {},
  expressType: '',
  detail: {},
  expressNo: '',
  expressAddress: {},
  logistics: {}, // 物流详情
}

const expressInfoReturn = handleActions(
  {
    [FETCH_RETURN_APPLY_DETAIL](state, { payload }) {
      const res: ExpressDetailReturn = payload
      return state.set('detail', fromJS(res))
    },
    [CHANGE_EXPRESS_TIME](state, { payload }) {
      const res = payload
      return state.set('expressTime', fromJS(res))
    },
    [CHANGE_EXPRESS_TYPE](state, { payload }) {
      const res = payload
      return state.set('expressType', fromJS(res))
    },
    [GET_EXPRESS_NUMBER](state, { payload }) {
      const res = payload
      return state.set('expressNo', fromJS(res))
    },
    [CHANGE_EXPRESS_ADDRESS](state, { payload }) {
      const res = payload
      return state.set('expressAddress', fromJS(res))
    },
    [FETCH_EXPRESS_LOGISTICS](state, { payload }) {
      const res: LogisticReturn = payload
      return state.set('logistics', fromJS(res))
    },
  },
  fromJS(initialInfo),
)

export default expressInfoReturn
