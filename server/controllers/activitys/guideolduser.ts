import { GuideOldUserData } from '../../interfaces/activitys/guide-old-user'
import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import activitysResource from '../../models/activitys'
import { BFA_Returns } from '../../utils/tools'

export async function guideOldUser(req: RouterRequest): Promise<ErrorReturn | GuideOldUserData> {
  const res = await activitysResource.guideOldUser<GuideOldUserData>(req)
  return BFA_Returns(res)
}
