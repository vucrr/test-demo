import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_ACTIVITYS_EXCHANGECOUPON } from 'constant/index'
import { CouponInfo } from 'interfaces/activitys/couponInfo'
import { ExchangeCouponReturns } from 'interfaces/activitys/exchangeCoupon'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

const receiveInfo = createAction<ExchangeCouponReturns>(FETCH_ACTIVITYS_EXCHANGECOUPON)

export const fetchInfo = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/activitys/exchangecoupon/'
  // const url = 'mock/activitys/getExpireUserWalfare'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ExchangeCouponReturns>(url, { params: query, headers })
    return data && dispatch(receiveInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const fetchCouponInfo = ({ query, req }: ClientRequest) => async () => {
  const url = 'node-api/activitys/exchangecoupon/info'
  // const url = 'mock/activitys/getCouponInfo'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<CouponInfo>(url, { params: query, headers })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
