import { getHeaders2 } from 'actions/actionHelper'
import { LOAD_REPAIR_QUALITY_RECORD_LIST, REPAIR_QUALITY_DETAIL, REPAIR_QUALITY_RECORD_LIST } from 'constant/index'
import { DetailReturns, RecordReturn } from 'interfaces/repair'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const receiveDetailInfo = createAction<DetailReturns>(REPAIR_QUALITY_DETAIL)

export const repairQualityDetailActions = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/repair/quality/detail'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<DetailReturns>(url, { params: query, headers })
    return data && dispatch(receiveDetailInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

const receiveRecordInfo = createAction<RecordReturn>(REPAIR_QUALITY_RECORD_LIST)
const loadReceiveDetailInfo = createAction<RecordReturn>(LOAD_REPAIR_QUALITY_RECORD_LIST)

export const repairQualityRecordActions = ({ query, req }: ClientRequest, isLoadMore?: boolean) => async (
  dispatch: Dispatch<Action>,
) => {
  const url = 'node-api/account/repair/quality/record'
  const headers = getHeaders2(req)
  try {
    const page = isLoadMore ? query.page : 1
    const { data } = await axios.get<RecordReturn>(url, {
      params: { ...query, page_size: 6, page: page },
      headers,
    })
    const datas = {
      ...data,
      page: page,
    }
    if (isLoadMore) {
      return datas && dispatch(loadReceiveDetailInfo(datas)).payload
    }

    return datas && dispatch(receiveRecordInfo(datas)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
