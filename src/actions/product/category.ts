import { getHeaders2 } from 'actions/actionHelper'
import { CHANGE_PRODUCT_CATEGROY_BRAND_ID, GET_PRODUCT_CATEGORY_INFO } from 'constant/index'
import { ListCategoryReturns } from 'interfaces/product/category'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

const getProductCategoryInfo = createAction<ListCategoryReturns>(GET_PRODUCT_CATEGORY_INFO)

export const fetchInfo = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/v2c/product/category'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ListCategoryReturns>(url, { params: query, headers })
    return data && dispatch(getProductCategoryInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export const changeBrandId = createAction<{ selectedBrandId: number }>(CHANGE_PRODUCT_CATEGROY_BRAND_ID)
