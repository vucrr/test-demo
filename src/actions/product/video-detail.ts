import { getHeaders } from 'actions/actionHelper'
import { GET_VIDEO_DETAIL_INFO } from 'constant/index'
import { ClientRequest } from 'interfaces/router'
import { VideoDetailReturns } from 'interfaces/video-detail'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils/index'

const getVideoDetailInfo = createAction<VideoDetailReturns>(GET_VIDEO_DETAIL_INFO)

export const fetchVideoDetail = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/product/video'
  const headers = getHeaders(req)
  try {
    const { data } = await axios.get<VideoDetailReturns>(url, { params: query, headers })
    return data && dispatch(getVideoDetailInfo(data))
  } catch (err) {
    tools.ErrorLog(err)
  }
}
