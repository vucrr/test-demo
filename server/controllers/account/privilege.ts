import { ErrorReturn } from '../../interfaces/error'
import { PrivilegeListReturns, UserPrivilegeItem, UserPrivilegeReturns } from '../../interfaces/privilege'
import { RouterRequest } from '../../interfaces/router'
import accountModel from '../../models/account'
import { BFA_Returns } from '../../utils/tools'

export async function listPrivileges(req: RouterRequest): Promise<ErrorReturn | PrivilegeListReturns> {
  const res = await accountModel.listPrivileges<PrivilegeListReturns>(req)
  return BFA_Returns(res)
}

export async function getPrivilege(req: RouterRequest): Promise<ErrorReturn | UserPrivilegeReturns> {
  const res = await accountModel.getPrivilegeById<UserPrivilegeReturns>(req)
  return BFA_Returns(res)
}

export async function exchangeCode(req: RouterRequest): Promise<any> {
  const res = await accountModel.exchangeCode<UserPrivilegeItem>(req)
  return BFA_Returns(res)
}
