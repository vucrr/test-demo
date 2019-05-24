import { combineReducers } from 'redux-immutable'
import apply from './apply'
import mytrade from './mytrade'

export default combineReducers({
  apply,
  mytrade,
})
