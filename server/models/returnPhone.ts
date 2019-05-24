import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  // 还机页面获取价格信息
  getReturnPrice: {
    method: Resource.GET,
    template: 'contract/return/price',
  },
  // 申请还机
  applyReturnPhone: {
    method: Resource.GET,
    template: 'contract/return/apply',
  },
  // 爱回收城市列表
  listAhsCity: {
    method: Resource.GET,
    template: 'contract/return/ahs/city',
  },
  // 爱回收城市区域列表，根据城市 id
  listAhsCityRegion: {
    method: Resource.GET,
    template: 'contract/return/ahs/city/region',
  },
  // 爱回收门店列表
  listAhsStore: {
    method: Resource.GET,
    template: 'contract/return/ahs/store',
  },
  // 爱回收门店
  getAhsStore: {
    method: Resource.GET,
    template: 'contract/return/ahs/store/detail',
  },
  // 还机详情
  getReturnDetail: {
    method: Resource.GET,
    template: 'contract/return/detail',
  },
  cancelApply: {
    method: Resource.GET,
    template: 'contract/return/cancel/apply',
  },
}

type ReturnPhoneResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as ReturnPhoneResource
