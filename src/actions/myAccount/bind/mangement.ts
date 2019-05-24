import { getHeaders2 } from 'actions/actionHelper'
import { Toast } from 'antd-mobile'
import { FETCH_BIND_WECHAT_INFO } from 'constant/index'
import { Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const fetchManagement = ({ req }: { req: any }) => async (dispatch: Dispatch) => {
  const url = 'node-api/account/bind_wechat/configuration'
  const query = {
    action: 'getRedirectUrl',
    sourceCode: 100,
  }
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get(url, { headers, params: query })
    dispatch(data && createAction(FETCH_BIND_WECHAT_INFO)(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const unbindWechat = () => async (_: Dispatch) => {
  const url = 'node-api/account/bind_wechat/unbind'
  const query = {
    action: 'unbindWeixin',
  }
  const headers = getHeaders2()
  try {
    const { data } = await axios.get(url, { headers, params: query })
    if (data.result) return data.result
    else Toast.info('解绑失败')
  } catch (err) {
    tools.ErrorLog(err)
  }
}
