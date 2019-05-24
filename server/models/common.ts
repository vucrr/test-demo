import { ModelFn } from '../interfaces/model'
import config from '../utils/config'
import Resource from '../utils/resource'

const configs = {
  checkToken: {
    method: Resource.POST,
    template: 'redpacket/jsapi',
    baseUrl: config.host,
  },
  upload: {
    method: Resource.POST,
    template: 'common/upload',
  },
  getNavIcons: {
    method: Resource.GET,
    template: 'v2c/getNavIcons',
  },
  getChannelId: {
    method: Resource.GET,
    template: 'v2c/common/getChannelId',
  },
  checkTradeDone: {
    method: Resource.GET,
    template: 'trade/v3/checkTradeDone',
  },
}

type CommonResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as CommonResource
