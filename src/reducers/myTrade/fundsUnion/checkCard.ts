import { FETCH_OPT_BILL_NO, FETCH_UNION_PAY_INFO, SAVE_FORM_FILEDS } from 'constant/index'
import { fromJS } from 'immutable'
import { Action, handleActions } from 'redux-actions'

const initial = {
  billNo: '',
  form: {
    realName: '',
    idNo: '',
    hasSubmit: false, // 是否提交成功
  },
}

const confirmInfo = handleActions(
  {
    [FETCH_UNION_PAY_INFO](state, { payload }) {
      const { form } = payload
      return state.setIn(['form', 'realName'], form.realName).setIn(['form', 'idNo'], form.idNo)
    },
    [SAVE_FORM_FILEDS](state, { payload }) {
      const { form } = payload
      return state
        .setIn(['form', 'realName'], form.realName)
        .setIn(['form', 'idNo'], form.idNo)
        .setIn(['form', 'cardNo'], form.cardNo)
        .setIn(['form', 'tel'], form.tel)
        .setIn(['form', 'hasSubmit'], !!form.hasSubmit)
    },
    [FETCH_OPT_BILL_NO](state, { payload }: Action<any>) {
      return state.set('billNo', payload)
    },
  },
  fromJS(initial),
)

export default confirmInfo
