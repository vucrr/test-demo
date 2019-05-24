import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  exchangeCoupon: {
    method: Resource.GET,
    template: 'getExpireUserWalfare',
  },
  guideOldUser: {
    method: Resource.GET,
    template: 'getSoonExpire',
  },
  getCouponInfo: {
    method: Resource.GET,
    template: 'sendUserCoupon',
  },
}

type ActivitysResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as ActivitysResource
