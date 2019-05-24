import { RouterRequest } from '../../interfaces/router'
import assessModel from '../../models/assess'

export async function postIdentity(req: RouterRequest): Promise<void | any> {
  return assessModel.postIdentity(req)
}
