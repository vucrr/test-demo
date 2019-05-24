import { ReceiveInfoReturns } from '../../interfaces/category'
import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import productModel from '../../models/product'
import { errorHandler } from '../../utils/tools'

export async function receiveInfo(req: RouterRequest): Promise<ReceiveInfoReturns | ErrorReturn> {
  const res = await productModel.getIntroduce<any>(req)
  if (res && res.status === 0) {
    const {
      activity_info: { id, product_name, product_introduce_img },
      ...info
    } = res.data

    return {
      ...info,
      id,
      product_name,
      product_introduce_img,
    }
  } else {
    return errorHandler(res)
  }
}
