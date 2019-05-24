import { FETCH_ENTERPRISE_PICK_NUMBER, SELECT_NEW_PHONE_NUMBER } from 'constant/index'
import { fromJS } from 'immutable'
import { PickNumber } from 'interfaces/enterprise/mytrade/pickNumber'
import { handleActions } from 'redux-actions'

const initialPickNumber = {
  is_empty: '',
  page_index: '',
  page_size: '',
  phone: [],
  vas_detail: {},
  title: '',
  subtitle: '',
  tips: '',
  phoneNum: '',
}

const pickNumber = handleActions(
  {
    [FETCH_ENTERPRISE_PICK_NUMBER](state, { payload }) {
      const { is_empty, page_index, page_size, phone, vas_detail, title, subtitle, tips }: PickNumber = payload
      return state
        .set('is_empty', fromJS(is_empty))
        .set('page_index', fromJS(page_index))
        .set('page_size', fromJS(page_size))
        .set('phone', fromJS(phone))
        .set('vas_detail', fromJS(vas_detail))
        .set('title', fromJS(title))
        .set('subtitle', fromJS(subtitle))
        .set('tips', fromJS(tips))
    },
    [SELECT_NEW_PHONE_NUMBER](state, { payload }) {
      return state.set('phoneNum', payload)
    },
  },
  fromJS(initialPickNumber),
)

export default pickNumber
