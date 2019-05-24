import { getHeaders2 } from 'actions/actionHelper'
import { Dispatch } from 'redux'
import { axios, tools } from 'utils/index'

export const uploadBase64 = (file: string) => async (_: Dispatch) => {
  const headers = getHeaders2()
  const url = 'node-api/common/upload'
  try {
    const { data } = await axios.post(url, { file }, { headers })
    return data
  } catch (e) {
    tools.ErrorLog(e)
  }
}
