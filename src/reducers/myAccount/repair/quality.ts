import { LOAD_REPAIR_QUALITY_RECORD_LIST, REPAIR_QUALITY_DETAIL, REPAIR_QUALITY_RECORD_LIST } from 'constant/index'
import { fromJS } from 'immutable'
import { DetailReturns, Record2Return } from 'interfaces/repair'
import { handleActions } from 'redux-actions'

const initialReturn: any = {
  data: [],
  page: 1,
  page_size: 6,
  record: {},
}

const orderDetailReturn = handleActions(
  {
    [REPAIR_QUALITY_DETAIL](state, { payload }) {
      const res: DetailReturns = payload
      return state.set('detail', fromJS(res))
    },
    [REPAIR_QUALITY_RECORD_LIST](state, { payload }) {
      const { data, count, errorMsg }: any = payload
      if (errorMsg) {
        return state.set('data', fromJS(payload))
      }
      return state
        .set('data', fromJS(data))
        .set('count', fromJS(count))
        .set('page', fromJS(1))
    },
    [LOAD_REPAIR_QUALITY_RECORD_LIST](state, { payload }) {
      const { data, count, page }: Record2Return = payload
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
