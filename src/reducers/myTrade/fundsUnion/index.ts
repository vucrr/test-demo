import { combineReducers } from 'redux-immutable'
import cards from './cards'
import checkCard from './checkCard'
import confirm from './confirm'

export default combineReducers({
  cards,
  confirm,
  checkCard,
})
