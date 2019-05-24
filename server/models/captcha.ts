import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  getImage: {
    method: Resource.GET,
    template: 'common/getImageCode',
  },
  verifyImage: {
    method: Resource.POST,
    template: 'common/verifyImageCode',
  },
  getSMS: {
    method: Resource.GET,
    template: 'common/getSmsCode',
  },
  verifySMS: {
    method: Resource.POST,
    template: 'common/verifySmsCode',
  },
}

type CaptchaResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as CaptchaResource
