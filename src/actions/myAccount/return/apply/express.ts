import { getHeaders2 } from 'actions/actionHelper'
import { Modal, Toast } from 'antd-mobile'
import { TrackEventMyAccountReturn } from 'configs/trackEventLabels'
import {
  CHANGE_EXPRESS_ADDRESS,
  CHANGE_EXPRESS_TIME,
  CHANGE_EXPRESS_TYPE,
  FETCH_EXPRESS_LOGISTICS,
  FETCH_RETURN_APPLY_DETAIL,
  GET_EXPRESS_NUMBER,
} from 'constant/index'
import {
  AddressAvailableReturn,
  CancelReturn,
  CreateBillReturn,
  ExpressDetailReturn,
  LogisticReturn,
  TimeScheduleReturn,
} from 'interfaces/account/return/apply'
import { ErrorReturn } from 'interfaces/error'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'
import { trackClickEvent } from 'utils/piwik'

interface CreateBillParams {
  orderType: number // 判断普通还机还是换机还机 1、商品订单 2、换机订单
  returnflow_trade_no: string
  type: string
  user_phone: number
  express_number?: string
  name?: string
  province?: string
  city?: string
  county?: string
  address?: string
  time?: string
  lat?: string
  long?: string
  house_number?: string
  detail_address?: string
}

export const changeExpressTime = createAction<any>(CHANGE_EXPRESS_TIME)

export const changeExpressType = createAction<{ expressType: any }>(CHANGE_EXPRESS_TYPE)

export const getExpressNumber = createAction<{ expressNumber: any }>(GET_EXPRESS_NUMBER)

export const changeExpressAddress = createAction<{ expressAddress: any }>(CHANGE_EXPRESS_ADDRESS)

export const fetchDetail = (query: any, req?: any) => async (dispatch: Dispatch<Action>) => {
  let url = ''
  let params = {}
  if (query.returnflow_trade_no) {
    url = 'node-api/account/return/express/returnDetail' // 还机申请详情
    // url = 'mock/myaccount/return/express/getReturnDetail' //还机申请详情
    params = { trade_no: query.returnflow_trade_no }
  } else if (query.sub_trade_no) {
    url = 'node-api/account/return/express/result' // 申请成功的详情
    // url = 'mock/myaccount/return/express/getApplyResult' //申请成功的详情
    params = { sub_trade_no: query.sub_trade_no }
  }
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ExpressDetailReturn>(url, { params, headers })
    data && dispatch(createAction<ExpressDetailReturn>(FETCH_RETURN_APPLY_DETAIL)(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
// 创建还机单
export const createReturnBill = (query: CreateBillParams, req?: any) => async (dispatch: Dispatch<Action>) => {
  let url
  const { orderType, ...resetParams } = query
  if (orderType === 1) {
    url = 'node-api/account/return/express/createBill'
  } else {
    url = 'node-api/account/return/express/commitApplyReturn'
  }
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<CreateBillReturn & ErrorReturn>(url, { headers, params: { ...resetParams } })
    if (data.errorMsg) {
      let title
      if (orderType === 1) {
        title = '申请失败'
      } else {
        title = '提交失败'
      }
      Modal.alert(
        title,
        data.errorMsg,
        [
          {
            text: '好的',
            onPress: async () => {
              const trackEvent = {
                label: `${TrackEventMyAccountReturn.Apply.name12}`,
                category: TrackEventMyAccountReturn.Apply.category,
              }
              trackClickEvent(trackEvent)
              dispatch(changeExpressTime(''))
            },
          },
        ],
        'android',
      )
      return
    } else {
      console.log(data)
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 取消还机
export const cancelReturn = (query: { sub_trade_no: string; returnflow_trade_no?: string }, req?: any) => async (
  _: Dispatch<Action>,
) => {
  const url = 'node-api/account/return/express/cancel'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<CancelReturn & ErrorReturn>(url, {
      params: { sub_trade_no: query.sub_trade_no },
      headers,
    })
    if (data.errorMsg) {
      Toast.info(data.errorMsg, 2)
      return
    }
    if (query.returnflow_trade_no && data.handle_result === 'success') {
      await Router.push(`/myaccount/return/apply/express?returnflow_trade_no=${query.returnflow_trade_no}`)
    } else if (data.handle_result === 'success') {
      await Router.push('/myaccount/service/list')
    } else {
      Toast.info('取消失败', 2)
      return
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 取件时间
export const fetchSchedule = (req?: any) => async (_: Dispatch<Action>) => {
  // const url = '/mock/myaccount/return/express/getTime'
  const url = 'node-api/account/return/express/getSchedule'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<TimeScheduleReturn>(url, { headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 地址是否可申请取件
export const isAddressAvailable = (params: any, req?: any) => async (_: Dispatch<Action>) => {
  // const url = 'mock/myaccount/return/express/isAddressAvailable'
  const url = 'node-api/account/return/express/isAddressAvailable'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<AddressAvailableReturn>(url, { params, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 修改取件单
export const changePickUp = ({ sub_trade_no, time }: { sub_trade_no: string; time: string }, req?: any) => async (
  _: Dispatch<Action>,
) => {
  // const url = 'mock/myaccount/return/express/change'
  const url = 'node-api/account/return/express/changePickUp'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<any>(url, { params: { sub_trade_no, time }, headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg, 2)
      return
    } else {
      Toast.info('取件时间修改成功啦', 2)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 物流详情
export const fetchLogistics = ({ sub_trade_no }: { sub_trade_no: string }, req?: any) => async (
  dispatch: Dispatch<Action>,
) => {
  // const url = 'mock/myaccount/return/express/getRoute'
  const url = 'node-api/account/return/express/getLogistics'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<LogisticReturn>(url, { params: { sub_trade_no }, headers })
    return data && dispatch(createAction<LogisticReturn>(FETCH_EXPRESS_LOGISTICS)(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}
