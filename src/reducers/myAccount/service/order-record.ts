import { FETCH_SERVICE_RECORD_DETAIL, FETCH_SERVICE_RECORD_LIST } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialReturn: any = {
  list: {},
  detail: {
    trade_info: [],
    logistics_info: [],
    coupon_info: [],
    vas_price_info: [],
    rent_info: {},
    first_per_reduce_info: {},
    repay_info: {},
    price_schemeInfo: {},
    advance_rent_info: {},
  },
}

const orderRecord = handleActions(
  {
    [FETCH_SERVICE_RECORD_LIST](state, { payload }) {
      const res: any = payload
      return state.set('list', fromJS(res))
    },
    [FETCH_SERVICE_RECORD_DETAIL](state, { payload }) {
      const res: any = payload
      return state
        .set('detail', fromJS(res))
        .setIn(['detail', 'price_schemeInfo', 'price'], fromJS(res.rent_info.after_rent_price))
    },
  },

  fromJS(initialReturn),
)

export default orderRecord
