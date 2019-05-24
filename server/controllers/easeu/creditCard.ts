import { ErrorReturn } from '../../interfaces/error'
import easeuModel from '../../models/easeu'
import { getFromCache, setToCache } from '../../utils/redis'
import { BFA_Returns } from '../../utils/tools'

export async function sendSms(req: any): Promise<ErrorReturn | any> {
  const res = await easeuModel.sendSms<any>(req)
  if (res.status === 101) {
    await setToCache(`easeu_${req.body.phone}`, res.data.code, 'EX', 2 * 60)
    return res.data
  }
  return res
}

export async function payCredit(req: any): Promise<ErrorReturn | any> {
  const code = await getFromCache(`easeu_${req.body.phone}`)
  if (!code) {
    return {
      status: 1001,
      msg: '短信验证码超时，请重新发送！',
    }
  }
  if (code !== req.body.code) {
    return {
      status: 1001,
      msg: '短信验证码错误！',
    }
  }
  const res = await easeuModel.payCredit(req)
  return BFA_Returns(res)
}
