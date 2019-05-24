import { getHeaders2 } from 'actions/actionHelper'
import {
  FETCH_RECEIPT_INVOICE,
  FETCH_RECEIPT_INVOICE_CANCEL,
  FETCH_RECEIPT_INVOICE_DETAIL,
  LOAD_FETCH_RECEIPT_INVOICE_DETAIL,
} from 'constant/index'
import { ReceiptData, ReceiptDetail } from 'interfaces/account/receipt'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const TermsListInfo = createAction<ReceiptData>(FETCH_RECEIPT_INVOICE)

export const fetchReceiptInvoice = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/receipt/invoice'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ReceiptData>(url, { params: query, headers })
    return data && dispatch(TermsListInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchReceiptInvoiceCancel = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/receipt/invoice/cancel'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data && dispatch(createAction<any>(FETCH_RECEIPT_INVOICE_CANCEL)(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

const receiptInvoiceInfo = createAction<any>(FETCH_RECEIPT_INVOICE_DETAIL)
const loadReceiptInvoiceInfo = createAction<any>(LOAD_FETCH_RECEIPT_INVOICE_DETAIL)

export const ReceiptInvoiceActions = ({ query, req }: ClientRequest, isLoadMore?: boolean) => async (
  dispatch: Dispatch<Action>,
) => {
  const url = 'node-api/account/receipt/invoice/detail'
  const headers = getHeaders2(req)
  try {
    const currentPage = isLoadMore ? query.current_page : 1
    const { data } = await axios.get<ReceiptDetail>(url, {
      params: { ...query, page_size: 10, current_page: currentPage },
      headers,
    })
    const datas = {
      ...data,
      current_page: currentPage,
    }
    if (isLoadMore) {
      return datas && dispatch(loadReceiptInvoiceInfo(datas)).payload
    }

    return datas && dispatch(receiptInvoiceInfo(datas)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
