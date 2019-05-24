import { CreateCup, CreateQuery, CreateSms } from '../../interfaces/createLBF'
import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import creditResource from '../../models/creditCard'
import { BFA_Returns } from '../../utils/tools'

export async function getCreditSMS(req: RouterRequest): Promise<ErrorReturn | CreateSms> {
  const res = await creditResource.getCreditSMS<CreateSms>(req)
  return BFA_Returns(res)
}

export async function getCreditQuery(req: RouterRequest): Promise<ErrorReturn | CreateQuery> {
  const res = await creditResource.getCreditQuery<CreateQuery>(req)
  return BFA_Returns(res)
}

export async function getCreditCup(req: RouterRequest): Promise<ErrorReturn | CreateCup> {
  const res = await creditResource.getCreditCup<CreateCup>(req)
  return BFA_Returns(res)
}
