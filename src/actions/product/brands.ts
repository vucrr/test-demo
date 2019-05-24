import { getHeaders2 } from 'actions/actionHelper'
import { GET_PRODUCT_BRANDS_INFO } from 'constant/index'
import { BrandsReturns } from 'interfaces/product/brands'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

const getProductBrandsInfo = createAction<BrandsReturns>(GET_PRODUCT_BRANDS_INFO)

export const fetchInfo = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/v2c/product/brands'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<BrandsReturns>(url, { params: query, headers })
    return data && dispatch(getProductBrandsInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
