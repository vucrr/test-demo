import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  getCreditSMS: {
    method: Resource.POST,
    template: 'lebaifen/sms',
  },
  getCreditQuery: {
    method: Resource.POST,
    template: 'lebaifen/query',
  },
  getCreditCup: {
    method: Resource.POST,
    template: 'trade/v3/create/cup',
  },
}

type CreditCardResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as CreditCardResource
