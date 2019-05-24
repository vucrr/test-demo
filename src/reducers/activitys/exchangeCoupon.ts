import { FETCH_ACTIVITYS_EXCHANGECOUPON } from 'constant/index'
import { fromJS } from 'immutable'
import { ExchangeCouponReturns } from 'interfaces/activitys/exchangeCoupon'
import { handleActions } from 'redux-actions'

const initialExchangeCoupon: ExchangeCouponReturns = {
  brand_name: '',
  recommand_product: [],
  recommand_product_hot: [],
  discount_amount: '',
  coupon_rule_id: 0,
  coupon_type: 0,
}

const exchangecoupon = handleActions(
  {
    [FETCH_ACTIVITYS_EXCHANGECOUPON](state, { payload }) {
      const {
        brand_name,
        recommand_product,
        recommand_product_hot,
        discount_amount,
        coupon_rule_id,
        coupon_type,
      }: ExchangeCouponReturns = payload
      return state
        .set('brand_name', fromJS(brand_name))
        .set('recommand_product', fromJS(recommand_product))
        .set('recommand_product_hot', fromJS(recommand_product_hot))
        .set('discount_amount', fromJS(discount_amount))
        .set('coupon_rule_id', fromJS(coupon_rule_id))
        .set('coupon_type', fromJS(coupon_type))
    },
  },
  fromJS(initialExchangeCoupon),
)

export default exchangecoupon
