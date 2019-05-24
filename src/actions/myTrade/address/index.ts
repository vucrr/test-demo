import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_ADDRESS_FORM, SAVE_ADDRESS_FORM } from 'constant/index'
import { ClientRequest } from 'interfaces/router'
import { AddressForm } from 'interfaces/trade'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const FetchAddressForm = createAction<any>(FETCH_ADDRESS_FORM)

export const fetchAddressForm = ({ query, req }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/address/form'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<AddressForm>(url, { params: query, headers })
    return data && dispatch(FetchAddressForm(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

const SaveAddressForm = createAction<any>(SAVE_ADDRESS_FORM)
export const saveAddressForm = ({ query }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/address/setform'
  const headers = getHeaders2()
  try {
    const res = await axios.get<AddressForm>(url, { params: query, headers })
    return res && dispatch(SaveAddressForm(res)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
