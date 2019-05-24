import { ErrorReturn } from '../../interfaces/error'
import { AuthorizeResultReturns, BindCardReturns, FundingResultReturns, OTPReturns } from '../../interfaces/fundsUnion'
import { RouterRequest } from '../../interfaces/router'
import tradeModel from '../../models/trade'
import { isDev, isProd } from '../../utils/config'
import { BFA_Returns } from '../../utils/tools'

export async function bindOTP(req: RouterRequest): Promise<ErrorReturn | OTPReturns> {
  const res = await tradeModel.bindOTP<OTPReturns>(req)
  return BFA_Returns(res)
}

export async function bindOTPRepeat(req: RouterRequest): Promise<ErrorReturn | OTPReturns> {
  const res = await tradeModel.bindOTPRepeat<OTPReturns>(req)
  return BFA_Returns(res)
}

export async function bindCard(req: RouterRequest): Promise<ErrorReturn | BindCardReturns> {
  const res = await tradeModel.bindCard<BindCardReturns>(req)
  return BFA_Returns(res)
}

export async function getAuthorizeResult(req: RouterRequest): Promise<ErrorReturn | AuthorizeResultReturns> {
  const res = await tradeModel.getAuthorizeResult<AuthorizeResultReturns>(req)
  return BFA_Returns(res)
}

export async function getFundingResult(req: RouterRequest): Promise<ErrorReturn | FundingResultReturns> {
  if (!isProd && !isDev) {
    console.log('createStrategyPay-funding-req', req.query)
  }
  const res = await tradeModel.getFundingResult<FundingResultReturns>(req)
  if (!isProd && !isDev) {
    console.log('createStrategyPay-funding-res', res)
  }

  return BFA_Returns(res)
}
