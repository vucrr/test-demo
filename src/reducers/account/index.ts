import { combineReducers } from 'redux-immutable'
import autoRent from './auto-rent'
import buyOut from './buy-out'
import center from './center'
import footprint from './footprint'
import footprintList from './footprintList'
import privilege from './privilege'
import unionPay from './unionPay'

export default combineReducers({
  footprint,
  footprintList,
  center,
  privilege,
  unionPay,
  autoRent,
  buyOut,
})
