import {
  FETCH_UNION_PAY_CHECK_BANK_LIST,
  FETCH_UNION_PAY_DETAIL,
  FETCH_UNION_PAY_INFO,
  FETCH_UNION_PAY_LIST,
  GO_TO_NEXT,
  SAVE_FORM_FILEDS,
  SAVE_SMS_FILEDS,
} from 'constant/index'
import { fromJS } from 'immutable'
import { UnionPayBankListReturn, UnionPayFormReturn, UnionPayListReturn } from 'interfaces/unionPay'
import { handleActions } from 'redux-actions'

interface UnionPay {
  list: UnionPayListReturn
  checkBankList: UnionPayBankListReturn
  detail: UnionPayFormReturn
  form: UnionPayFormReturn & {
    verifyCode: string
    isEdit: boolean
    hasSubmit: boolean
  }
}

const initialUnionPayForm: UnionPay = {
  list: [],
  detail: {
    realName: '',
    idNo: '',
  },
  checkBankList: [],
  form: {
    realName: '',
    idNo: '',
    verifyCode: '',
    isEdit: true,
    hasSubmit: false, // 是否提交成功
  },
}

const unionPayForm = handleActions(
  {
    [FETCH_UNION_PAY_LIST](state, { payload }) {
      const { list }: { list: UnionPayListReturn } = payload
      return state.set('list', fromJS(list))
    },
    [FETCH_UNION_PAY_DETAIL](state, { payload }) {
      const { detail }: { detail: UnionPayFormReturn } = payload
      return state.set('detail', fromJS(detail))
    },
    [FETCH_UNION_PAY_CHECK_BANK_LIST](state, { payload }) {
      const { bankList }: { bankList: UnionPayBankListReturn } = payload
      return state.set('checkBankList', fromJS(bankList))
    },
    [FETCH_UNION_PAY_INFO](state, { payload }) {
      const { form }: UnionPay = payload
      return state
        .setIn(['form', 'realName'], form.realName)
        .setIn(['form', 'idNo'], form.idNo)
        .setIn(['form', 'isEdit'], form.realName.length === 0)
    },
    [GO_TO_NEXT](state, { payload }) {
      const { form }: UnionPay = payload
      return state.set('form', fromJS(form))
    },
    [SAVE_FORM_FILEDS](state, { payload }) {
      const { form }: { form: UnionPay['form'] } = payload
      return state
        .setIn(['form', 'realName'], form.realName)
        .setIn(['form', 'idNo'], form.idNo)
        .setIn(['form', 'bankCardNo'], form.bankCardNo)
        .setIn(['form', 'tel'], form.tel)
        .setIn(['form', 'hasSubmit'], !!form.hasSubmit)
    },
    [SAVE_SMS_FILEDS](state, { payload }) {
      return state.setIn(['form', 'verifyCode'], payload.verifyCode)
    },
  },
  fromJS(initialUnionPayForm),
)

export default unionPayForm
