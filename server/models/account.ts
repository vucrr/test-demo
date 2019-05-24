import { ModelFn } from '../interfaces/model'
import config from '../utils/config'
import Resource from '../utils/resource'

const configs = {
  getCenter: {
    method: Resource.GET,
    template: 'next-api/account/center',
    baseUrl: config.host,
  },
  getNewCenter: {
    method: Resource.GET,
    template: 'user/center',
  },
  listPrivileges: {
    method: Resource.GET,
    template: 'getUserPrivileges',
  },
  getPrivilegeById: {
    method: Resource.GET,
    template: 'getUserPrivilege',
  },
  exchangeCode: {
    method: Resource.GET,
    template: 'getJiedianCode',
  },
  receiveFootprint: {
    method: Resource.GET,
    template: 'next-api/account/footprint',
    baseUrl: config.host,
  },
  receiveFootprintList: {
    method: Resource.GET,
    template: 'next-api/account/violation',
    baseUrl: config.host,
  },
  // 换呗绑定没有用到的接口
  // bindPhone: {
  //   method: Resource.POST,
  //   template: 'bindOauthPhone',
  // },
  bindPhone: {
    method: Resource.GET,
    template: 'bindPhone',
  },
  // 微信，还呗 open_type === weixin | huanbei
  verifyAndBindPhone1: {
    method: Resource.POST,
    template: 'validateUserBindPhone',
  },
  // open_type === alipay
  verifyAndBindPhone2: {
    method: Resource.POST,
    template: 'verifyAndBindPhone',
  },
  // returnflow
  getCost: {
    method: Resource.GET,
    template: 'getReturnFlowDetail',
  },
  getOrderDetail: {
    method: Resource.GET,
    template: 'getPayReturnFlowDetail',
  },
  getResults: {
    method: Resource.GET,
    template: 'getReturnFlowStatus',
  },
  getSavePayInfo: {
    method: Resource.POST,
    template: 'saveReturnflowPayInfo',
  },
  // 微信解绑
  unbindWechat: {
    method: Resource.GET,
    template: 'weixinAccount',
  },
  // 配置的跳转链接和文案信息
  getBindWechatConfiguration: {
    method: Resource.GET,
    template: 'weixinAccount',
  },
  getUserData: {
    method: Resource.GET,
    template: 'modelComment',
  },
  // 支付宝用户的绑定信息，判断是否有手机号，有手机号没有绑定去绑定页，没有手机号没有绑定去填手机号绑定，绑定了就过
  getAlipayBindInfo: {
    method: Resource.GET,
    template: 'getAlipayuseridBindInfo',
  },
}

type AccountResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as AccountResource
