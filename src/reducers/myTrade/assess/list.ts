import { FETCH_TRADE_ASSESS_LIST_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { GetCreditEntrydata } from 'interfaces/mytrade/assess/list'
import { handleActions } from 'redux-actions'

const assessListData: GetCreditEntrydata = {
  credit_title: '',
  credit_desc: '',
  credit_icon: '',
  credit_tips: '',
  submit_text: '',
  submit_status: 0,
  agreement_info: [],
  step_list: [],
  step_bar: [],
}

const assessList = handleActions(
  {
    [FETCH_TRADE_ASSESS_LIST_INFO](state, { payload }) {
      const {
        credit_title,
        credit_desc,
        credit_icon,
        credit_tips,
        submit_text,
        submit_status,
        agreement_info,
        step_list,
        step_bar,
      }: GetCreditEntrydata = payload
      return state
        .set('credit_title', fromJS(credit_title))
        .set('credit_desc', fromJS(credit_desc))
        .set('credit_icon', fromJS(credit_icon))
        .set('credit_tips', fromJS(credit_tips))
        .set('submit_text', fromJS(submit_text))
        .set('submit_status', fromJS(submit_status))
        .set('agreement_info', fromJS(agreement_info))
        .set('step_list', fromJS(step_list))
        .set('step_bar', fromJS(step_bar))
    },
  },
  fromJS(assessListData),
)

export default assessList
