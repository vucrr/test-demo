import { combineReducers } from 'redux-immutable'
import quality from './quality'
import standby from './standby'

export default combineReducers({
  quality,
  standby,
})
