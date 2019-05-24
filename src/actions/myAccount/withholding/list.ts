import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_WITHHOLDING_LIST_INFO } from 'constant/index'
import { WithHoldingInfoReturns } from 'interfaces/withholding/list'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

export const fetchInfo = ({ req, query }: { req?: any; query?: any }) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/withholding/list_signs'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<WithHoldingInfoReturns>(url, { headers, params: query })
    dispatch(createAction<WithHoldingInfoReturns>(FETCH_WITHHOLDING_LIST_INFO)(data))
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}

// 验证代扣是否可解
export const validateIfCanUnSign = () => async () => {
  const url = 'node-api/trade/withholding/validate'
  const headers = getHeaders2()

  try {
    const { data } = await axios.get(url, { headers })
    return data
  } catch (e) {
    tools.ErrorLog(e)
  }
}

// 解代扣
export const unSign = ({ agreement_no, type }: { agreement_no: string; type: number }) => async () => {
  const url = 'node-api/trade/withholding/un_sign'
  const headers = getHeaders2()
  const body = {
    agreement_no,
    type,
  }
  try {
    const { data } = await axios.post(url, body, { headers })
    return data
  } catch (e) {
    tools.ErrorLog(e)
  }
}

// 签代扣
export const sign = (body: { type: number; return_url: string }) => async () => {
  const url = 'node-api/trade/withholding/sign'
  const headers = getHeaders2()

  try {
    const { data } = await axios.post(url, body, { headers })
    if (data.signUrl) {
      location.href = data.signUrl
    }
  } catch (e) {
    tools.ErrorLog(e)
  }
}
