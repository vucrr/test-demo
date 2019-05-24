import { combineReducers } from 'redux-immutable'
import address from './address'
import assess from './assess'
import canton from './canton'
import creditCard from './creditCard'
import exchange from './exchange'
import extraInfo from './extraInfo'
import fundsUnion from './fundsUnion'
import hunanMobile from './hunanMobile'
import order from './order'
import withholding from './withholding'

export default combineReducers({
  canton,
  order,
  assess,
  address,
  hunanMobile,
  fundsUnion,
  exchange,
  withholding,
  creditCard,
  extraInfo,
})
