import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  getServiceList: {
    method: Resource.GET,
    template: 'contract/list',
  },
  getCancelDetail: {
    method: Resource.GET,
    template: 'trade/v2/getCancelDetail',
  },
  cancelContract: {
    method: Resource.POST,
    template: 'trade/v2/cancelContract',
  },
  getCancelResult: {
    method: Resource.GET,
    template: 'trade/v2/cancelContractResult',
  },
  getServiceDetail: {
    method: Resource.GET,
    template: 'contract/getServiceDetail',
  },
  getContractPlanList: {
    method: Resource.GET,
    template: 'contract/getContractPlanList',
  },
  getExclusiveEquity: {
    method: Resource.GET,
    template: 'trade/v2/getExclusiveEquity',
  },
  // 主动还款 http://gitlab.xianghuanji.com/business/bfa/wikis/apis/pay/getPayInfo
  pay: {
    method: Resource.POST,
    template: 'pay/v2/getPayInfo',
  },
  getRecordList: {
    method: Resource.GET,
    template: 'trade/v2/getTradeList',
  },
  getRecordTradeDetail: {
    method: Resource.GET,
    template: 'trade/v2/getTradeDetail',
  },
  checkReturnStatus: {
    method: Resource.GET,
    template: 'order/v2/checkReturnStatus',
  },
  checkReplacement: {
    method: Resource.GET,
    template: 'trade/v2/checkReplacement',
  },
  checkBuyOutStatus: {
    method: Resource.GET,
    template: 'order/v2/checkBuyOutStatus',
  },
}

type TermsResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as TermsResource
