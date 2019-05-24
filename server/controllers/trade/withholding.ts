import { RouterRequest } from '../../interfaces/router'
import model from '../../models/withholding'
import { BFA_Returns, errorHandler } from '../../utils/tools'

export default class WithholdingCtrl {
  static async listWithhold(req: RouterRequest): Promise<any> {
    const res = await model.getWithholdList(req)
    return BFA_Returns(res)
  }

  static async listSigns(req: RouterRequest): Promise<any> {
    const [res1, res2] = await Promise.all([model.listSigns(req), model.listNewSigns(req)])
    if (res1.code === 200 && res2.code === 200) {
      return { ...res1.data, popup: res2.data }
    } else {
      return errorHandler(res1 || res2)
    }
  }

  static async unSign(req: RouterRequest): Promise<any> {
    const res = await model.unSign(req)
    return BFA_Returns(res)
  }

  static async validateIfCanUnSign(req: RouterRequest): Promise<any> {
    const res = await model.validateIfCanUnSign(req)
    return BFA_Returns(res)
  }

  static async sign(req: RouterRequest): Promise<any> {
    const res = await model.sign(req)
    return BFA_Returns(res)
  }
}
