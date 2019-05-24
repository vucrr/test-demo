import { GET_PRODUCT_BRANDS_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { BrandsReturns } from 'interfaces/product/brands'
import { handleActions } from 'redux-actions'

const initialBrands: Partial<BrandsReturns> = {
  headTop: {},
  products: [],
}

const brands = handleActions(
  {
    [GET_PRODUCT_BRANDS_INFO](state, { payload }) {
      const { headTop, products }: BrandsReturns = payload
      return state.set('headTop', fromJS(headTop)).set('products', fromJS(products))
    },
  },
  fromJS(initialBrands),
)

export default brands
