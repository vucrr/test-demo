import { GET_CACHE_LIST, REMOVE_ALL_CACHE, REMOVE_CACHE } from 'constant/index'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

const getCacheList = createAction<{ list: string[] }>(GET_CACHE_LIST)

export const fetchList = () => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/cache/list'
  try {
    const { data } = await axios.get<{ list: string[] }>(url)
    data && dispatch(getCacheList(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}

const removeCache = createAction<{ index: number }>(REMOVE_CACHE)

export const remove = (key: string, index: number) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/cache/remove'
  try {
    const { data } = await axios.post<{ success: boolean }>(url, { key })
    data && data.success && dispatch(removeCache({ index }))
  } catch (err) {
    tools.ErrorLog(err)
  }
}

const removeAllCache = createAction(REMOVE_ALL_CACHE)

export const removeAll = () => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/cache/remove-all'
  try {
    const { data } = await axios.post<{ success: boolean }>(url)
    data && data.success && dispatch(removeAllCache())
  } catch (err) {
    tools.ErrorLog(err)
  }
}
