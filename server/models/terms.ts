import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  getAgreement: {
    method: Resource.GET,
    template: 'trade/v2/getAgreementDetail',
  },
  getElecontract: {
    method: Resource.GET,
    template: 'trade/v2/getContractDetail',
  },
  getServiceAgreement: {
    method: Resource.GET,
    template: 'service/agreement',
  },
  getLBFAgreement: {
    method: Resource.GET,
    template: 'getLbfAgreement',
  },
}

type TermsResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as TermsResource
