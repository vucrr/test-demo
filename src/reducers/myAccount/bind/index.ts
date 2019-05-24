import { combineReducers } from 'redux-immutable'
import management from './management'
import result from './result'

export default combineReducers({
  management,
  result,
})
