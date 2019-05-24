import {
  FETCH_RECEIPT_INVOICE,
  FETCH_RECEIPT_INVOICE_CANCEL,
  FETCH_RECEIPT_INVOICE_DETAIL,
  LOAD_FETCH_RECEIPT_INVOICE_DETAIL,
  SAVE_RECEIPT_INVOICE_APPLY,
  SAVE_RECEIPT_INVOICE_EMAIL,
} from 'constant/index'
import { fromJS } from 'immutable'
import { ReceiptData } from 'interfaces/account/receipt'
import { handleActions } from 'redux-actions'

const initialReturn: any = {
  invoice: {},
  data: [],
  current_page: 1,
}

const serviceTermsList = handleActions(
  {
    [FETCH_RECEIPT_INVOICE](state, { payload }) {
      const res: ReceiptData = payload
      return state.set('invoice', fromJS(res))
    },
    [FETCH_RECEIPT_INVOICE_CANCEL](state, { payload }) {
      const res: any = payload
      return state.set('cancel', fromJS(res))
    },
    [SAVE_RECEIPT_INVOICE_APPLY](state, { payload }) {
      const res: any = payload
      return state.set('apply', fromJS(res))
    },
    [SAVE_RECEIPT_INVOICE_EMAIL](state, { payload }) {
      const res: any = payload
      return state.set('email', fromJS(res))
    },
    [FETCH_RECEIPT_INVOICE_DETAIL](state, { payload }) {
      const {
        recordList: { list, count },
        errorMsg,
      }: any = payload
      if (errorMsg) {
        return state.set('data', fromJS(payload))
      }
      return state
        .set('data', fromJS(list))
        .set('count', fromJS(count))
        .set('current_page', fromJS(1))
    },
    [LOAD_FETCH_RECEIPT_INVOICE_DETAIL](state, { payload }) {
      const {
        recordList: { list },
        current_page,
      }: any = payload
      const datas = state.get('data').concat(fromJS(list))
      return state.set('data', datas).set('current_page', fromJS(current_page))
    },
  },
  fromJS(initialReturn),
)

export default serviceTermsList
