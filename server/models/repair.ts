import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  getRepairQualityDetail: {
    method: Resource.GET,
    template: 'afterSale/getUserRepairDetail',
  },
  getRepairQualityRecord: {
    method: Resource.GET,
    template: 'afterSale/getUserRepairList',
  },
  getStandbyQualityDetail: {
    method: Resource.GET,
    template: 'afterSale/spareMachineDetail',
  },
  getStandbyQualityRecord: {
    method: Resource.GET,
    template: 'afterSale/spareMachineList',
  },
  getCategory: {
    method: Resource.GET,
    template: 'after/sale/apply/type',
  },
  getForm: {
    method: Resource.GET,
    template: 'after/sale/apply',
  },
  createForm: {
    method: Resource.POST,
    template: 'after/sale/apply/save',
  },
}

type RepairResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as RepairResource
