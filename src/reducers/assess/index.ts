import { combineReducers } from 'redux-immutable'
import identity from './identity'
import informationData from './informationManage'

export default combineReducers({
  identity,
  informationData,
})
