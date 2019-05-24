import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  // 取消还机单接口（邮寄）
  cancelReturn: {
    method: Resource.GET,
    template: 'return_flow/v2/cancelReturnBill',
  },
  // 申请详情页接口（邮寄）
  getReturnDetail: {
    method: Resource.GET,
    template: 'return_flow/v2/getReturnDetail',
  },
  // 创建还机单接口（邮寄）
  createExpressReturnBill: {
    method: Resource.GET,
    template: 'return_flow/v2/CreateMailReturnBill',
  },
  // 换机还机单预约上门取件
  commitApplyReturn: {
    method: Resource.GET,
    template: '/deliver/pickup/commit',
  },
  // 还机详情显示接口（邮寄）
  getApplyResult: {
    method: Resource.GET,
    template: 'return_flow/v2/getApplyResult',
  },
  // 地址是否可以申请取件接口
  isAddressAvailable: {
    method: Resource.GET,
    template: '/deliver/pickup/isAddressAvailable',
  },
  // 获取取件时间列表接口
  getSchedule: {
    method: Resource.GET,
    template: '/deliver/pickup/getSchedule',
  },
  // 取件单修改接口
  changePickUp: {
    method: Resource.GET,
    template: '/deliver/pickup/change',
  },
  // 订单物流详情接口（用户校验，只支持上门取件的订单）
  getLogistics: {
    method: Resource.GET,
    template: '/deliver/pickup/getRoute',
  },
  // 门店还机页
  getStoreReturnDetail: {
    method: Resource.GET,
    template: 'returnflow/store/index',
  },
  // 门店还机申请接口
  applyReturnByStore: {
    method: Resource.GET,
    template: 'returnflow/store/apply',
  },
  // 还机详情接口
  getApplyResultByStore: {
    method: Resource.GET,
    template: 'returnflow/store/detail',
  },
  // 取消申请接口
  cancelApplyByStore: {
    method: Resource.GET,
    template: 'returnflow/store/cancel',
  },
}

type ReturnResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as ReturnResource
