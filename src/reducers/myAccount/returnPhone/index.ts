import { combineReducers } from 'redux-immutable'
import city from './city'
import price from './price'

export default combineReducers({
  price,
  city,
})
