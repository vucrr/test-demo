import { combineReducers } from 'redux-immutable'
import confirm from './confirm'
import pay from './pay'
import result from './result'

export default combineReducers({
  confirm,
  pay,
  result,
})
