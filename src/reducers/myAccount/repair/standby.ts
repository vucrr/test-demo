import { LOAD_REPAIR_STANDBY_RECORD_LIST, REPAIR_STANDBY_DETAIL, REPAIR_STANDBY_RECORD_LIST } from 'constant/index'
import { fromJS } from 'immutable'
import { Standby2Record, StandbyDetail } from 'interfaces/repair'
import { handleActions } from 'redux-actions'

const initialReturn: any = {
  data: [],
  page: 1,
  page_size: 5,
  record: {},
}

const orderDetailReturn = handleActions(
  {
    [REPAIR_STANDBY_DETAIL](state, { payload }) {
      const res: StandbyDetail = payload
      return state.set('detail', fromJS(res))
    },
    [REPAIR_STANDBY_RECORD_LIST](state, { payload }) {
      const { data, count, errorMsg }: any = payload
      if (errorMsg) {
        return state.set('data', fromJS(payload))
      }
      return state
        .set('data', fromJS(data))
        .set('count', fromJS(count))
        .set('page', fromJS(1))
    },
    [LOAD_REPAIR_STANDBY_RECORD_LIST](state, { payload }) {
      const { data, count, page }: Standby2Record = payload
      const datas = state.get('data').concat(fromJS(data))
      return state
        .set('data', datas)
        .set('count', fromJS(count))
        .set('page', fromJS(page))
    },
  },
  fromJS(initialReturn),
)

export default orderDetailReturn
