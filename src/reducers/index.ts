import { combineReducers } from 'redux-immutable'
import account from './account'
import activitys from './activitys'
import app from './app'
import assess from './assess'
import cacheList from './cache-list'
import easeu from './easeu'
import enterprise from './enterprise'
import home from './home'
import myAccount from './myAccount'
import myTrade from './myTrade'
import product from './product'
import serverApp from './server-app'
import site from './site'
import terms from './terms'
import trade from './trade'

export default combineReducers<any>({
  app,
  serverApp,
  cacheList,
  home,
  product,
  trade,
  account,
  site,
  easeu,
  myAccount,
  myTrade,
  terms,
  assess,
  activitys,
  enterprise,
})
