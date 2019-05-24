import { combineReducers } from 'redux-immutable'
import list from './list'
import result from './result'

export default combineReducers({
  result,
  list,
})
