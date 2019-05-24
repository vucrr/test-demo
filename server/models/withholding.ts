import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  // 代扣方式定制化展示列表接口
  getWithholdList: {
    method: Resource.POST,
    template: 'sign/custom_list',
  },

  // 已签约代扣列表
  listSigns: {
    method: Resource.POST,
    template: 'sign/list',
  },
  // 新增代扣方式列表接口
  listNewSigns: {
    method: Resource.POST,
    template: 'sign/addSignList',
  },
  // 验证解约接口
  validateIfCanUnSign: {
    method: Resource.POST,
    template: 'sign/validate',
  },
  // 代扣解约接口
  unSign: {
    method: Resource.POST,
    template: 'withhold/unSign',
  },
  // 签约接口
  sign: {
    method: Resource.POST,
    template: 'withhold/sign',
  },
}

export default new Resource(configs) as Resource & Record<keyof typeof configs, ModelFn>
