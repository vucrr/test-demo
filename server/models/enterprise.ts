import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  getPickNumber: {
    method: Resource.GET,
    template: 'selection/recommendPhone',
  },
  searchPhone: {
    method: Resource.GET,
    template: 'selection/searchPhone',
  },
  lockPhone: {
    method: Resource.GET,
    template: 'selection/lockPhone',
  },
  unlockPhone: {
    method: Resource.GET,
    template: 'selection/unlockPhone',
  },
  privileges: {
    method: Resource.GET,
    template: 'enterprise/privileges',
  },
  resultStatus: {
    method: Resource.GET,
    template: 'enterprise/query-status',
  },
  verifyEmail: {
    method: Resource.POST,
    template: 'enterprise/verify-email',
  },
  submitBind: {
    method: Resource.POST,
    template: 'enterprise/bind-enterprise',
  },
}

type EnterPriseResource = Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as Resource & EnterPriseResource
