import { FETCH_RETURN_PHONE_DETAIL, FETCH_RETURN_PHONE_PRICE, FETCH_RETURN_PHONE_STORE_BY_ID } from 'constant/index'
import { fromJS } from 'immutable'
import { PriceReturns } from 'interfaces/returnPhone'
import { Action, handleActions } from 'redux-actions'

const initial = {
  sku_name: '',
  sku_img: '',
  total_installments_number: 0,
  dt_end_date: '',
  return_price: 0,
  left_day: 0,
  left_hour: 0,
  chosenStore: {},
  end_date: '',
  return_type: '',
  store_info: {},
  express_number: '',
  price_list: [],
}

export default handleActions(
  {
    [FETCH_RETURN_PHONE_PRICE](state, { payload }: Action<PriceReturns>) {
      if (!payload || !payload.sku_info) return state
      return state
        .set('sku_name', payload.sku_info.sku_name)
        .set('sku_img', payload.sku_info.sku_img)
        .set('total_installments_number', payload.trade_info.total_installments_number)
        .set('dt_end_date', payload.trade_info.dt_end_date)
        .set('return_price', payload.return_price.return_price)
        .set('left_day', payload.return_info.left_day)
        .set('left_hour', payload.return_info.left_hour)
        .set('price_list', fromJS(payload.return_price.price_list))
        .set('unpaid_plan_amount', fromJS(payload.return_price.unpaid_plan_amount))
    },
    [FETCH_RETURN_PHONE_STORE_BY_ID](state, { payload }) {
      return state.set('chosenStore', fromJS(payload))
    },
    [FETCH_RETURN_PHONE_DETAIL](state, { payload }) {
      if (!payload || !payload.sku_info) return state
      return state
        .set('sku_name', payload.sku_info.sku_name)
        .set('sku_img', payload.sku_info.sku_img)
        .set('total_installments_number', payload.trade_info.total_installments_number)
        .set('dt_end_date', payload.trade_info.dt_end_date)
        .set('return_price', payload.return_price.return_price)
        .set('left_day', payload.left_time.left_day)
        .set('left_hour', payload.left_time.left_hour)
        .set('end_date', payload.end_date)
        .set('store_info', fromJS(payload.store_info))
        .set('return_type', payload.return_info.return_type)
        .set('express_number', payload.return_info.express_number)
        .set('price_list', fromJS(payload.return_price.price_list))
    },
  },
  fromJS(initial),
)
