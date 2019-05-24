import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  listHome: {
    method: Resource.GET,
    template: 'v2c/getHome',
  },
  getHomeAd: {
    method: Resource.GET,
    template: 'v2c/getHomeAd',
  },
  getUserTag: {
    method: Resource.GET,
    template: 'v2/getUserTag',
  },
  getNotLoginUserTag: {
    method: Resource.GET,
    template: 'v2c/getNotLoginUserTag',
  },
  loginForSCMobile: {
    method: Resource.GET,
    template: 'scyd/login',
  },
}

type HomeResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as HomeResource
