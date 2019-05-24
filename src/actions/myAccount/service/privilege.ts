import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_SERVICE_PRIVILEGE } from 'constant/index'
import { PrivilegeListReturns } from 'interfaces/account/service/privilege'
import { Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const fetchPrivilege = (contractNo: string, req: any) => async (dispatch: Dispatch) => {
  const url = 'node-api/account/service/privilege'
  const headers = getHeaders2(req)
  const params = { contract_no: contractNo }
  try {
    const { data } = await axios.get<PrivilegeListReturns>(url, { headers, params })
    data && dispatch(createAction<PrivilegeListReturns>(FETCH_SERVICE_PRIVILEGE)(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
