import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import { VideoDetailReturns } from '../../interfaces/video-detail'
import categoryModel from '../../models/product'
import { errorHandler, renderCenterProduct } from '../../utils/tools'

export async function receiveVideoDetail(req: RouterRequest): Promise<VideoDetailReturns | ErrorReturn> {
  const res = await categoryModel.getVideoDetail<any>(req)
  if (res && res.status === 0) {
    const { video, video_product, recommend_products } = res.data
    return {
      video,
      video_product,
      recommend_products: recommend_products.map((item: any) => item.map(renderCenterProduct)),
    }
  }
  return errorHandler(res)
}
