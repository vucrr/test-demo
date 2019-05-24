import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { axios, tools } from 'utils/index'

export const fetchCertifyForm = (body: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/trade/certification/form'
  const headers = getHeaders2()
  try {
    const { data } = await axios.post<any>(url, body, { headers })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 信用套餐结果
export const getZmxyResult = ({ orderNo, q, req }: { orderNo: string; q: string; req: any }) => async (
  _: Dispatch<Action>,
) => {
  const url = 'node-api/trade/certification/result/zmxy'
  const headers = getHeaders2(req)
  const query = {
    orderNo,
    q,
  }
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 芝麻扫脸结果
export const getZmfaceResult = ({ biz_content, req }: { biz_content: string; req: any }) => async (
  _: Dispatch<Action>,
) => {
  const url = 'node-api/trade/certification/result/zmface'
  const headers = getHeaders2(req)
  const { biz_no } = JSON.parse(biz_content)
  const query = {
    biz_no,
  }
  try {
    const { data } = await axios.get<any>(url, { params: query, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 查询结果
export const getCertifyResult = (query: any, req: any) => async (dispatch: Dispatch<any>) => {
  const certifyType = query.certifyType ? query.certifyType : 'zmface'
  if (certifyType === 'zmxy') {
    return dispatch(
      getZmxyResult({
        orderNo: query.orderNo,
        q: query.q,
        req,
      }),
    )
  } else {
    return dispatch(
      getZmfaceResult({
        biz_content: query.biz_content,
        req,
      }),
    )
  }
}

export const postUserIdentity = (body: any, req: any) => async (_: Dispatch<Action>) => {
  const url = 'node-api/trade/certification/save'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.post<any>(url, body, { headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const postCertifyUrl = ({ query, isServer, res, req }: any) => async (
  _: Dispatch<Action>,
  getState: Function,
) => {
  const url = 'node-api/trade/certification/getUrl'
  const headers = getHeaders2(req)
  const ua = getState().getIn(['serverApp', 'ua'])
  let channel
  if (ua.get('isApp')) {
    channel = 'xhjapp'
  } else if (ua.get('isAlipay')) {
    channel = 'alipay'
  }
  const body = {
    redirect: query.redirect || '/',
    channel,
  }
  try {
    const { data } = await axios.post<any>(url, body, { headers })
    if (data.zm_url) {
      if (isServer) {
        res.redirect(data.zm_url)
        res.end()
      } else {
        await Router.push(data.zm_url)
      }
    }
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const getCertifyType = ({ query, isServer, res, req }: any) => async (dispatch: Dispatch<any>) => {
  const url = 'node-api/trade/certification/getType'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<any>(url, { headers })
    if (data.certify_type === 'zmxy') {
      return dispatch(
        postCertifyUrl({
          query,
          isServer,
          res,
          req,
        }),
      )
    }
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
