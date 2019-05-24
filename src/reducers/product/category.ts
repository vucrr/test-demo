import { CHANGE_PRODUCT_CATEGROY_BRAND_ID, GET_PRODUCT_CATEGORY_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { ListCategoryReturns } from 'interfaces/product/category'
import { handleActions } from 'redux-actions'

const initialCategory: Partial<ListCategoryReturns> & { selectedBrandId: number } = {
  selectedBrandId: 0,
  brand: {},
  tag_list: [],
  brand_list: [],
  category_ad: {},
  product_list: [],
}

const category = handleActions(
  {
    [GET_PRODUCT_CATEGORY_INFO](state, { payload }) {
      const { brand, tag_list, brand_list, category_ad, product_list }: ListCategoryReturns = payload
      return state
        .set('brand', fromJS(brand))
        .set('tag_list', fromJS(tag_list))
        .set('brand_list', fromJS(brand_list))
        .set('category_ad', fromJS(category_ad))
        .set('product_list', fromJS(product_list))
    },
    [CHANGE_PRODUCT_CATEGROY_BRAND_ID](state, { payload }) {
      return state.set('selectedBrandId', payload.selectedBrandId)
    },
  },
  fromJS(initialCategory),
)

export default category
