import { ErrorReturn } from '../../interfaces/error'
import { BrandsReturns, HeadTop, Product } from '../../interfaces/product/brands'
import { RouterRequest } from '../../interfaces/router'
import productModel from '../../models/product'
import { errorHandler } from '../../utils/tools'

export async function listBrands(req: RouterRequest): Promise<BrandsReturns | ErrorReturn> {
  const res1 = await productModel.BrandsTab<HeadTop>(req)
  if (res1.code === 200) {
    if (res1.data.tag_list.length > 0) {
      req.query.tag_id = req.query.tag_id || res1.data.tag_list[0].tag_id
      const res2 = await productModel.BrandsProduct<Product[]>(req)
      if (res2.code === 200) {
        return { headTop: res1.data, products: res2.data }
      }
      return errorHandler(res2)
    } else {
      return { headTop: res1.data, products: [] }
    }
  }
  return errorHandler(res1)
}
