import { getHeaders3 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import * as constants from 'constant/index'
// import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

// 检查flow
export const checkFlow = ({ query, req }: { query: any; req: any }) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/easeu/trade/checkFlow'
  const headers = getHeaders3(req)
  try {
    const { data } = await axios.get(url, { params: query, headers })
    return dispatch(createAction<any>(constants.CHECK_FLOW)(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 获取下单页面数据
export const fetchInfo = ({ query, req }: { query: any; req: any }) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/easeu/trade/info'
  const headers = getHeaders3(req)
  try {
    const { data } = await axios.get(url, { params: query, headers })
    return dispatch(createAction<any>(constants.GET_TRADE_INDEX)(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 风控实名成功回跳回来后处理实名
export const riskHandle = ({ zhima_unique_no }: { zhima_unique_no: string }, req: any) => async (
  _: Dispatch<Action>,
) => {
  const url = 'node-api/easeu/trade/riskHandle'
  const headers = getHeaders3(req)
  try {
    const { data } = await axios.post(url, { zhima_unique_no }, { headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 签代扣
export const userSign = ({ flowCode }: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/easeu/trade/userSign'
  const headers = getHeaders3()
  try {
    const { data } = await axios.post(url, { flowCode }, { headers })
    if (data.url) {
      location.href = data.url
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 花呗、信用卡创建订单
export const createPayQsy = ({ type, flowCode }: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/easeu/trade/createPayQsy'
  const headers = getHeaders3()
  try {
    const { data } = await axios.post(url, { flowCode }, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
      return
    }
    if (type === 'huabei') {
      const handleType = data && data.handleType
      const handleString = data && data.handleString
      if (handleType === 'payJs') {
        AlipayJSBridge.call('tradePay', { orderStr: handleString }, (data: any) => {
          const resultCode = data.resultCode
          if (resultCode !== '6001') {
            if (resultCode !== '9000') {
              Toast.info('支付失败，请重试')
            } else {
              location.reload()
            }
          }
        })
      } else {
        location.href = handleString
      }
    } else {
      const payNo = data && data.payNo
      location.href = `/easeu/creditcard/index/${flowCode}?payNo=${payNo}`
      // await Router.push({
      //   pathname: `/easeu/creditcard/index/${flowCode}`,
      //   query: { payNo }
      // })
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 下单成功页获取数据
export const fetchSuccessInfo = ({ query, req }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/easeu/trade/success'
  const headers = getHeaders3(req)
  try {
    const { data } = await axios.get(url, { params: query, headers })
    return dispatch(createAction<any>(constants.GET_TRADE_SUCCESS)(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
