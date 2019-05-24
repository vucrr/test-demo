import { getHeaders2 } from 'actions/actionHelper'
import { SAVE_RECEIPT_INVOICE_APPLY } from 'constant/index'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const TermsListInfo = createAction<any>(SAVE_RECEIPT_INVOICE_APPLY)

export const saveInvoiceApply = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/receipt/invoice/apply'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data && dispatch(TermsListInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
