import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_TERMS_AGREEMENT } from 'constant/index'
// import { ClientRequest } from 'interfaces/router'
import { AgreementRequest } from 'interfaces/terms'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const termsAgreement = createAction<AgreementRequest>(FETCH_TERMS_AGREEMENT)

export const termsAgreementActions = ({ query, req }: any) => async (dispatch: Dispatch<Action>) => {
  const url = query.type !== '3' ? 'node-api/terms/agreement/public' : 'node-api/terms/agreement/elecontract'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<AgreementRequest>(url, { params: query, headers })
    return data && dispatch(termsAgreement(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
