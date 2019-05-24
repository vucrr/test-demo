import {
  CHECK_ENTERPRISE_APPLY_EMAIL,
  FETCH_ENTERPRISE_APPLY_GUIDE,
  FETCH_ENTERPRISE_APPLY_RESULT,
} from 'constant/index'
import { fromJS } from 'immutable'
import { GuideReturns, ResultStatusReturns, VerifyEmailReturns } from 'interfaces/enterprise/apply'
import { handleActions } from 'redux-actions'

interface ApplyReturns {
  guide: GuideReturns
  result: Partial<ResultStatusReturns>
  form: VerifyEmailReturns
}

const initialGuide: Partial<ApplyReturns> = {
  guide: [],
  result: {
    authenticated: 0,
  },
  form: {
    partner_enterprise: 1, // 1-合作企业，0-非合作企业
    form_field: {
      employee_no: 0, // 1-工号需填写,0-工号无需填写
      idcard: 0, // 身份证号，同上
      employee_card: 0, // 工牌，同上
    },
  },
}

const apply = handleActions(
  {
    [FETCH_ENTERPRISE_APPLY_GUIDE](state, { payload }) {
      const data: GuideReturns = payload
      return state.set('guide', fromJS(data))
    },
    [FETCH_ENTERPRISE_APPLY_RESULT](state, { payload }) {
      const data: ResultStatusReturns = payload
      return state.set('result', fromJS(data))
    },
    [CHECK_ENTERPRISE_APPLY_EMAIL](state, { payload }) {
      const data: VerifyEmailReturns = payload
      return state
        .setIn(['form', 'partner_enterprise'], fromJS(data.partner_enterprise))
        .setIn(['form', 'form_field'], fromJS(data.form_field))
    },
  },
  fromJS(initialGuide),
)

export default apply
