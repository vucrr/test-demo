import { getHeaders2 } from 'actions/actionHelper'
import {
  CLOSE_PRODUCT_COMMENT_MODAL,
  FETCH_PRODUCT_COMMENTS,
  LOAD_MORE_PRODUCT_COMMENTS,
  OPEN_PRODUCT_COMMENT_MODAL,
} from 'constant/index'
import { CommentsReturns } from 'interfaces/comment'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

interface Modal {
  index: number
  data: any
}

export const openModal = createAction<Modal>(OPEN_PRODUCT_COMMENT_MODAL)
export const closeModal = createAction<null>(CLOSE_PRODUCT_COMMENT_MODAL)

export const fetchComments = (query: any, isLoadMore: boolean, req: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/product/comment'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<CommentsReturns>(url, {
      params: query,
      headers,
    })
    let action
    if (isLoadMore) {
      action = createAction<{ query: any; data: CommentsReturns }>(LOAD_MORE_PRODUCT_COMMENTS)
    } else {
      action = createAction<{ query: any; data: CommentsReturns }>(FETCH_PRODUCT_COMMENTS)
    }
    return data && dispatch(action({ query, data })).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
