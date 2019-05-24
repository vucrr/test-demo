import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  saveUser: {
    method: Resource.POST,
    template: 'tradeUser/save',
  },
  getUser: {
    method: Resource.GET,
    template: 'tradeUser/detail',
  },
  // 广州CMCC线下
  getStoreCity: {
    method: Resource.GET,
    template: 'offline/getOfflineCity',
  },
  getStoreSelect: {
    method: Resource.GET,
    template: 'offline/getOfflineStore',
  },
  getStoreDetail: {
    method: Resource.GET,
    template: 'offline/getOfflineStoreDetail',
  },
  // 实人实名认证
  fetchCertifyForm: {
    method: Resource.POST,
    template: 'certify/getCertifyForm',
  },
  getZmfaceCertifyResult: {
    method: Resource.GET,
    template: 'certify/query',
  },
  getZmxyCertifyResult: {
    method: Resource.GET,
    template: 'auth/zhima',
  },
  postUserIdentity: {
    method: Resource.POST,
    template: 'user/saveUserIdentity',
  },
  getCertifyType: {
    method: Resource.GET,
    template: 'certify/getCertifyType',
  },
  postCertifyUrl: {
    method: Resource.POST,
    template: 'certify/getCertifyUrl',
  },
  // order/confirm
  getPlaceOrderDetail: {
    method: Resource.GET,
    template: 'trade/v2/getPlaceOrderDetail',
  },
  getConfirmReplace: {
    method: Resource.POST,
    template: 'trade/v2/getReplacementStatus',
  },
  ceateTrade: {
    method: Resource.POST,
    template: 'trade/v2/ceateTrade',
  },
  getPayDetail: {
    method: Resource.GET,
    template: 'trade/v4/getPayDetail',
  },
  createStrategyPay: {
    method: Resource.POST,
    template: 'trade/v4/createStrategyPay',
  },
  getPayResult: {
    method: Resource.GET,
    template: 'trade/v4/getPayResult',
  },
  getAppraiseResult: {
    method: Resource.GET,
    template: 'trade/v4/getAppraiseResult',
  },
  getCityList: {
    method: Resource.GET,
    template: 'trade/v2/getCitys',
  },
  getConfirmRemote: {
    method: Resource.GET,
    template: 'remote/district',
  },
  // address
  getAddressForm: {
    method: Resource.GET,
    template: 'trade/v2/getUserDeliveryAddress',
  },
  setAddressForm: {
    method: Resource.POST,
    template: 'trade/v2/saveUserDeliveryAddress',
  },
  // 湖南移动
  checkWhiteList: {
    method: Resource.GET,
    template: 'checkPhoneIsWhite',
  },
  getRecommendPhone: {
    method: Resource.GET,
    template: 'getRecommendPhone',
  },
  lockPhone: {
    method: Resource.GET,
    template: 'lockPhone',
  },
  searchPhone: {
    method: Resource.GET,
    template: 'searchPhone',
  },
  // 众联
  bindOTP: {
    method: Resource.GET,
    template: 'zhongan/bindOTP',
  },
  bindOTPRepeat: {
    method: Resource.GET,
    template: 'zhongan/bindOTPRepeat',
  },
  bindCard: {
    method: Resource.GET,
    template: 'zhongan/bindCard',
  },
  getAuthorizeResult: {
    method: Resource.GET,
    template: 'trade/v4/getAuthorizeResult',
  },
  getFundingResult: {
    method: Resource.GET,
    template: 'trade/v2/getFundingResult',
  },
  // exchange
  getReplaceStatus: {
    method: Resource.POST,
    template: 'trade/v2/getReplacementContract',
  },
  getReturnInfo: {
    method: Resource.POST,
    template: 'trade/v2/getReplacementReturnInfo',
  },
  saveReturnInfo: {
    method: Resource.POST,
    template: 'trade/v2/createReplacementTrade',
  },
  getStoreInfo: {
    method: Resource.GET,
    template: 'getAhsStore',
  },
  getCheckTradeCondition: {
    method: Resource.GET,
    template: 'contract/checkTradeCondition',
  },
  // 代扣方式定制化展示列表接口
  getWithholdList: {
    method: Resource.POST,
    template: 'sign/custom_list',
  },
  extraInfo: {
    method: Resource.POST,
    template: 'trade/v4/getSupplementDataStep',
  },
  gpsFlow: {
    method: Resource.POST,
    template: 'risk/data/GpsFlow',
  },
  tongdunStatistics: {
    method: Resource.POST,
    template: 'risk/data/DeviceInfo',
  },
  emergencyContact: {
    method: Resource.POST,
    template: 'risk/data/AddAddress',
  },
  finishCreditEntrydata: {
    method: Resource.POST,
    template: 'trade/v4/finishCreditEntrydata',
  },
}

type TradeResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as TradeResource
