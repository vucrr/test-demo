import { Request } from 'express'
import { ErrorReturn } from '../../interfaces/error'
import { ListCategoryReturns, Omit } from '../../interfaces/product/category'
import productModel from '../../models/product'
import { errorHandler } from '../../utils/tools'

type TabsReturns = 'brand' | 'tag_list'
type CategoryTabs = Pick<ListCategoryReturns, TabsReturns>
type CategoryProducts = Omit<ListCategoryReturns, TabsReturns>

export async function listCategory(req: Request): Promise<ListCategoryReturns | ErrorReturn> {
  const res1 = await productModel.getCategoryTags<CategoryTabs>(req)
  if (res1.code === 200) {
    if (res1.data.tag_list.length > 0) {
      req.query.tag_id = req.query.tag_id || res1.data.tag_list[0]!.tag_id
      const res2 = await productModel.getCategoryProducts<CategoryProducts>(req)
      if (res2.code === 200) {
        return { ...res1.data, ...res2.data }
      }
      return errorHandler(res2)
    } else {
      return { ...res1.data, brand_list: [], category_ad: {}, product_list: [] }
    }
  }
  return errorHandler(res1)
}
