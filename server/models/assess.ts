import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  postIdentity: {
    method: Resource.POST,
    template: 'user-many-identi-info',
  },
  receiveInformationData: {
    method: Resource.GET,
    template: 'fund/check',
  },
  receiveCreditEntryData: {
    method: Resource.POST,
    template: '/trade/v4/getCreditEntrydata',
  },
}

type AccountResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as AccountResource
