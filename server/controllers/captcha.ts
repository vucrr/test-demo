import { ErrorReturn } from '../interfaces/error'
import { RouterRequest } from '../interfaces/router'
import captchaModel from '../models/captcha'
import { BFA_Returns } from '../utils/tools'

interface ImageCode {
  image_code: string
}

export async function getCaptchaImage(req: RouterRequest): Promise<ImageCode> {
  const res = await captchaModel.getImage<{ image_code: string }>(req)
  return BFA_Returns(res)
}

interface SMSReturns {
  sms_code: number
  send_res: boolean
  refresh_image_code: boolean
}

export async function getCaptchaSMS(req: RouterRequest): Promise<SMSReturns> {
  const res = await captchaModel.getSMS<SMSReturns>(req)
  return BFA_Returns(res)
}

interface VerifyCaptcha {
  verify_res: boolean
}

export async function verifyCaptchaImage(req: RouterRequest): Promise<VerifyCaptcha> {
  const res = await captchaModel.verifyImage<VerifyCaptcha>(req)
  return BFA_Returns(res)
}

export async function verifyCaptchaSMS(req: RouterRequest): Promise<VerifyCaptcha | ErrorReturn> {
  const res = await captchaModel.verifySMS<VerifyCaptcha>(req)
  return BFA_Returns(res)
}
