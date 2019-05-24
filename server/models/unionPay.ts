import { ModelFn } from '../interfaces/model'
import Resource from '../utils/resource'

const configs = {
  getList: {
    method: Resource.GET,
    template: 'user-bind-card?action=getUserBindCardList',
  },
  getDetail: {
    method: Resource.GET,
    template: 'user-bind-card?action=getUserBindCardDetail',
  },
  getCheckBanklist: {
    method: Resource.GET,
    template: 'user-bind-card?action=getBankList',
  },
  getForm: {
    method: Resource.GET,
    template: 'user-many-identi-info?action=getUserManyIdentiInfoByUserId',
  },
  bindApply: {
    method: Resource.POST,
    template: 'card/bindApply',
  },
  bindSms: {
    method: Resource.POST,
    template: 'card/bindSms',
  },
  bindConfirm: {
    method: Resource.POST,
    template: 'card/bindConfirm',
  },
  bindCancel: {
    method: Resource.POST,
    template: 'card/bindCancel',
  },
  binCheck: {
    method: Resource.POST,
    template: 'card/binCheck',
  },
}

type UnionPayResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as UnionPayResource
