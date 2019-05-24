import { CommentsReturns } from '../../interfaces/comment'
import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import productModel from '../../models/product'
import { BFA_Returns } from '../../utils/tools'

export async function listComments(req: RouterRequest): Promise<ErrorReturn | CommentsReturns> {
  const res = await productModel.listComments<CommentsReturns>(req)
  return BFA_Returns(res)
}
