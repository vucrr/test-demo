import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  // 轻松用买断逻辑
  getInfo: {
    method: Resource.GET,
    template: 'contract/getTradeContractPrice',
  },
  getResultInfo: {
    method: Resource.GET,
    template: 'contract/buyout/result',
  },
  payBuyOut: {
    method: Resource.POST,
    template: 'contract/buyout/handle',
  },
  // 享换机买断逻辑
  getXhjInfo: {
    method: Resource.GET,
    template: 'order/buyout',
  },
  getXhjResultInfo: {
    method: Resource.GET,
    template: 'order/buyout/pay/result',
  },
  payXhjBuyOut: {
    method: Resource.POST,
    template: 'order/buyout/apply',
  },
}

type AccountResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as AccountResource
