import { getHeaders2 } from 'actions/actionHelper'
import Cookies from 'js-cookie'
import axios from 'utils/axiosClient'
import * as tools from 'utils/tools'

export const bindPhone = () => async () => {
  const url = 'node-api/account/bind_phone'
  const headers = getHeaders2()
  const params = {
    open_id: Cookies.get('open_id') || '',
    open_type: Cookies.get('open_type') || '',
  }
  try {
    const { data } = await axios.get(url, { headers, params })
    return data
  } catch (err) {
    tools.ErrorLog(err)
  }
}
