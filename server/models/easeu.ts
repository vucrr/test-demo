import { ModelFn } from '../interfaces/model'
import config from '../utils/config'
import Resource from '../utils/resource'

const configs = {
  checkFlow: {
    method: Resource.GET,
    template: 'xhj-flow/get-current-step',
    baseUrl: config.host3,
  },
  getTrade: {
    method: Resource.GET,
    template: 'trade/getTradeDetailsQsy',
  },
  sendSms: {
    method: Resource.POST,
    template: 'sms/sendSms',
  },
  payCredit: {
    method: Resource.POST,
    template: 'pay/payCredit',
  },
  createPayQsy: {
    method: Resource.POST,
    template: 'pay/createPayQsy',
  },
  userSign: {
    method: Resource.POST,
    template: 'withhold/userSign',
  },
  riskHandle: {
    method: Resource.POST,
    template: 'user/riskHandle',
  },
}

type EaseuResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as EaseuResource
