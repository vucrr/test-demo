import { getHeaders2 } from 'actions/actionHelper'
import { LOAD_REPAIR_STANDBY_RECORD_LIST, REPAIR_STANDBY_DETAIL, REPAIR_STANDBY_RECORD_LIST } from 'constant/index'
import { StandbyDetail, StandbyRecord } from 'interfaces/repair'
import { ClientRequest } from 'interfaces/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { axios, tools } from 'utils'

const receiveDetailInfo = createAction<StandbyDetail>(REPAIR_STANDBY_DETAIL)

export const repairStandbyDetailActions = ({ query, req }: ClientRequest) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/repair/standby/detail'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<StandbyDetail>(url, { params: query, headers })
    return data && dispatch(receiveDetailInfo(data)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}

const receiveRecordInfo = createAction<StandbyRecord>(REPAIR_STANDBY_RECORD_LIST)
const loadReceiveDetailInfo = createAction<StandbyRecord>(LOAD_REPAIR_STANDBY_RECORD_LIST)

export const repairStandbyRecordActions = ({ query, req }: ClientRequest, isLoadMore?: boolean) => async (
  dispatch: Dispatch<Action>,
) => {
  const url = 'node-api/account/repair/standby/record'
  const headers = getHeaders2(req)
  try {
    const page = isLoadMore ? query.page : 1
    const { data } = await axios.get<StandbyRecord>(url, {
      params: { ...query, page_size: 5, page: page },
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
