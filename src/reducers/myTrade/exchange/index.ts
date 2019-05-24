import { combineReducers } from 'redux-immutable'
import confirmReturn from './confirm'
import entrance from './entrance'
import exchangeReturn from './return'

export default combineReducers({
  entrance,
  exchangeReturn,
  confirmReturn,
})
