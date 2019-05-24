import {
  CLEAR_TRADE_INFO_AFTER_SUBMITTED,
  FETCH_CHINA_UNICOM_USER_DATA,
  SAVE_TRADE_INFO_WHEN_UNMOUNT,
} from 'constant/index'
import { fromJS } from 'immutable'
import { UserDataReturns } from 'interfaces/trade'
import { handleActions } from 'redux-actions'

const initialForm = {
  info: {
    user_name: '',
    user_idcard: '',
    user_phone: '',
    idcard_bare_img: '',
    idcard_emblem_img: '',
    idcard_human_img: '',
    service_providers: 1,
    editable: true,
    agreed: false,
  },
}

const form = handleActions(
  {
    [FETCH_CHINA_UNICOM_USER_DATA](state, { payload }) {
      const {
        user_name,
        user_idcard,
        user_phone,
        idcard_bare_img,
        idcard_emblem_img,
        idcard_human_img,
        trade_no,
        service_providers,
        editable,
      }: UserDataReturns = payload
      const info = state.get('info')
      let newInfo
      if (editable) {
        newInfo = info
          .set('trade_no', trade_no)
          .set('service_providers', service_providers)
          .set('agreed', false)
      } else {
        newInfo = info
          .set('user_name', user_name)
          .set('user_idcard', user_idcard)
          .set('user_phone', user_phone)
          .set('idcard_bare_img', idcard_bare_img)
          .set('idcard_emblem_img', idcard_emblem_img)
          .set('idcard_human_img', idcard_human_img)
          .set('trade_no', trade_no)
          .set('service_providers', service_providers)
          .set('editable', editable)
          .set('agreed', true)
      }
      return state.set('info', newInfo)
    },
    [SAVE_TRADE_INFO_WHEN_UNMOUNT](state, { payload }) {
      const info = state.get('info')
      const {
        user_name,
        user_phone,
        user_idcard,
        idcard_human_img,
        idcard_emblem_img,
        idcard_bare_img,
        agreed,
      }: Partial<UserDataReturns> & { agreed: boolean } = payload
      const newInfo = info
        .set('user_name', user_name)
        .set('user_phone', user_phone)
        .set('user_idcard', user_idcard)
        .set('idcard_human_img', idcard_human_img)
        .set('idcard_emblem_img', idcard_emblem_img)
        .set('idcard_bare_img', idcard_bare_img)
        .set('agreed', agreed)
      return state.set('info', newInfo)
    },
    [CLEAR_TRADE_INFO_AFTER_SUBMITTED](state) {
      return state.set('info', initialForm.info)
    },
  },
  fromJS(initialForm),
)

export default form
