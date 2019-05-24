import { createSelector } from 'reselect'

const productsSelector = (state: any) => state.get('product_list')

const selectedBrandIdSelector = (state: any) => state.get('selectedBrandId')

const productsFilterSelector = createSelector([productsSelector, selectedBrandIdSelector], (products, brandId) => {
  if (brandId === 0) {
    return products
  }
  return products.filter((item: any) => item.get('brand_id') === brandId)
})

export default (state: any) => {
  return {
    category: state.getIn(['product', 'category']),
    selectedBrandId: selectedBrandIdSelector(state.getIn(['product', 'category'])),
    products: productsFilterSelector(state.getIn(['product', 'category'])),
  }
}
