import { getHeaders2 } from 'actions/actionHelper'
import { DetailReturns } from 'interfaces/repair'
import { Action, Dispatch } from 'redux'
import { axios, tools } from 'utils'

export const getRepairCategory = (tradeNo: string, req: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/account/repair/category/'
  const headers = getHeaders2(req)
  const params = {
    trade_no: tradeNo,
  }
  try {
    const { data } = await axios.get<DetailReturns>(url, { params, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
