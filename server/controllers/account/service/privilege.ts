import { PrivilegeListReturns } from '../../../interfaces/account/service/privilege'
import { ErrorReturn } from '../../../interfaces/error'
import { RouterRequest } from '../../../interfaces/router'
import model from '../../../models/service'
import { BFA_Returns } from '../../../utils/tools'

export async function listPrivilege(req: RouterRequest): Promise<ErrorReturn | PrivilegeListReturns> {
  const res = await model.getExclusiveEquity<PrivilegeListReturns>(req)
  return BFA_Returns(res)
}
