import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  getInfo: {
    method: Resource.GET,
    template: 'contract/getTradeRentDetails',
  },
  openAutoRent: {
    method: Resource.POST,
    template: 'contract/openAutoRent',
  },
  checkSign: {
    method: Resource.POST,
    template: 'withhold/checkSign',
  },
  userSign: {
    method: Resource.POST,
    template: 'withhold/userSign',
  },
  frozenAutoRent: {
    method: Resource.POST,
    template: 'pay/autoRentPay',
  },
}

type AccountResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as AccountResource
