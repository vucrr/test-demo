import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import { FETCH_RETURN_APPLY_DETAIL } from 'constant/index'
import { CancelReturn, CreateBillReturn, StoreDetailReturn } from 'interfaces/account/return/apply'
import { ErrorReturn } from 'interfaces/error'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

export const fetchDetail = (query: any, req?: any) => async (dispatch: Dispatch<Action>) => {
  let url = ''
  let params = {}
  if (query.returnflow_trade_no) {
    url = 'node-api/account/return/store/detail' // 还机申请详情
    // url = 'mock/myaccount/return/store/detail' //还机申请详情
    params = { trade_no: query.returnflow_trade_no }
  } else if (query.sub_trade_no) {
    url = 'node-api/account/return/store/result' // 申请成功的详情
    // url = 'mock/myaccount/return/store/result' //申请成功的详情
    params = { sub_trade_no: query.sub_trade_no }
  }
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<StoreDetailReturn>(url, { params, headers })
    console.log(data)
    data && dispatch(createAction<StoreDetailReturn>(FETCH_RETURN_APPLY_DETAIL)(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 创建还机单
export const applyReturn = (
  { trade_no, user_phone, ahs_store_id }: { trade_no: string; user_phone: string; ahs_store_id: string },
  req?: any,
) => async (_: Dispatch<Action>) => {
  // const url = 'mock/myaccount/return/store/apply'
  const url = 'node-api/account/return/store/apply'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<CreateBillReturn & ErrorReturn>(url, {
      headers,
      params: { trade_no, user_phone, ahs_store_id },
    })
    if (data.errorMsg) {
      Toast.info(data.errorMsg, 2)
      return
    }
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 取消还机
export const cancelReturn = ({ sub_trade_no }: { sub_trade_no: string }, req?: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/account/return/store/cancel'
  // const url = 'mock/myaccount/return/store/cancel'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<CancelReturn & ErrorReturn>(url, { params: { sub_trade_no }, headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg, 2)
      return
    }
    if (data.handle_result === 'success') {
      await Router.push('/myaccount/service/list')
    } else {
      Toast.info('取消失败', 2)
      return
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
