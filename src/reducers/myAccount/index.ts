import { combineReducers } from 'redux-immutable'
import bind from './bind'
import receipt from './receipt'
import repair from './repair'
import returnApply from './return'
import returnPhone from './returnPhone'
import returnflow from './returnflow'
import service from './service'
import termsList from './termsList'
import withholding from './withholding'

export default combineReducers({
  repair,
  returnflow,
  bind,
  returnPhone,
  service,
  termsList,
  receipt,
  withholding,
  returnApply,
})
