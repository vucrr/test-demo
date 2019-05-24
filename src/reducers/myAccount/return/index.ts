import { combineReducers } from 'redux-immutable'
import express from './apply/express'
import store from './apply/store'

export default combineReducers({
  express,
  store,
})
