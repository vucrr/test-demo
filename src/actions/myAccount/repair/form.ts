import { getHeaders2 } from 'actions/actionHelper'
import { DetailReturns } from 'interfaces/repair'
import { Action, Dispatch } from 'redux'
import { axios, tools } from 'utils'

export const getRepairForm = (tradeNo: string, type: string, req: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/account/repair/form/'
  const headers = getHeaders2(req)
  const params = {
    trade_no: tradeNo,
    type: parseInt(type, 10),
  }
  try {
    const { data } = await axios.get<DetailReturns>(url, { params, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

interface CreateRepairFormBody {
  trade_no: string
  reason: string
  remark: string
  with_spare_machine: 1 | 0
}

export const createRepairForm = (body: CreateRepairFormBody) => async (_: Dispatch<Action>) => {
  const url = 'node-api/account/repair/form/'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<{ msg: string }>(url, body, { headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
