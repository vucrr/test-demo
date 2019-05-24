import { getHeaders2 } from 'actions/actionHelper'
import { FETCH_EXCHANGE_INDEX_INFO } from 'constant/index'
// import { ClientRequest } from 'interfaces/router'
import { ReplaceContract } from 'interfaces/exchange'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

export const fetchExchange = ({ query, req }: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/trade/exchange'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.post(url, { ...query }, { headers })
    if (data) {
      dispatch(createAction<ReplaceContract>(FETCH_EXCHANGE_INDEX_INFO)(data))
      return data
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}
