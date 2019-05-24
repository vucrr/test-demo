import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_SERVICE_RECORD_DETAIL, FETCH_SERVICE_RECORD_LIST } from 'constant/index'
import { RecordDetailReturns, RecordListReturns } from 'interfaces/account/service/order-record'
import { ErrorReturn } from 'interfaces/error'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const fetchDetail = (
  { trade_no, replacement_no }: { trade_no: string; replacement_no?: string },
  req?: any,
) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/service/order-record/detail'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<RecordDetailReturns>(url, { params: { trade_no, replacement_no }, headers })
    if (data) {
      dispatch(createAction<RecordDetailReturns>(FETCH_SERVICE_RECORD_DETAIL)(data))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchInfo = ({ query, req }: ClientRequest) => async (dispatch: any) => {
  const url = 'node-api/account/service/order-record/list'
  const headers = getHeaders2(req)
  try {
    const { contract_no } = query
    const { data } = await axios.get<ErrorReturn & RecordListReturns>(url, { params: { contract_no }, headers })
    if (data.errorMsg) {
      return data
    } else if (data.trade_list.length > 0) {
      const tradeItem = data.trade_list[0]
      const params: any = {
        trade_no: tradeItem.trade_no,
      }
      if (tradeItem.replacement_no) {
        params.replacement_no = tradeItem.replacement_no
      }
      dispatch(createAction<RecordListReturns>(FETCH_SERVICE_RECORD_LIST)(data))
      await dispatch(fetchDetail(params, req))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
