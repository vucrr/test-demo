import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_CITY_LIST } from 'constant/index'
import { CityList } from 'interfaces/trade'
import { Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const getCityList = (req: any) => async (dispatch: Dispatch) => {
  const url = 'node-api/trade/address/city'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<CityList>(url, { headers })
    return dispatch(createAction(FETCH_CITY_LIST)(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
