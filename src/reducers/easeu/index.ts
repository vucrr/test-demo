import { combineReducers } from 'redux-immutable'

import creditCard from './credit-card'
import trade from './trade'

export default combineReducers({
  trade,
  creditCard,
})
