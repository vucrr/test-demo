import { RouterRequest } from '../../interfaces/router'
import tradeModel from '../../models/trade'
import { BFA_Returns } from '../../utils/tools'

export async function fetchCertifyForm(req: RouterRequest): Promise<void | any> {
  const res = await tradeModel.fetchCertifyForm(req)
  return BFA_Returns(res)
}

export async function getZmfaceCertifyResult(req: RouterRequest): Promise<any> {
  const res = await tradeModel.getZmfaceCertifyResult<any>(req)
  return BFA_Returns(res)
}

export async function getZmxyCertifyResult(req: RouterRequest): Promise<any> {
  const res = await tradeModel.getZmxyCertifyResult<any>(req)
  return BFA_Returns(res)
}

export async function postUserIdentity(req: RouterRequest): Promise<void | any> {
  const res = await tradeModel.postUserIdentity(req)
  return BFA_Returns(res)
}

export async function getCertifyType(req: RouterRequest): Promise<void | any> {
  const res = await tradeModel.getCertifyType(req)
  return BFA_Returns(res)
}

export async function postCertifyUrl(req: RouterRequest): Promise<void | any> {
  const res = await tradeModel.postCertifyUrl(req)
  return BFA_Returns(res)
}
