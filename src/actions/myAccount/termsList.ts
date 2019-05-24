import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_CREDIT_LBF_AGREEMENT, FETCH_SERVICE_TERMS_LIST } from 'constant/index'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const TermsListInfo = createAction<any>(FETCH_SERVICE_TERMS_LIST)

export const fetchTermsList = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/termsList'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data && dispatch(TermsListInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
const TermsLbfAgreement = createAction<any>(FETCH_CREDIT_LBF_AGREEMENT)
export const getLbfAgreement = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/termsList/getLbfAgreement'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data && dispatch(TermsLbfAgreement(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
