import { combineReducers } from 'redux-immutable'
import buyOut from './buy-out'
import cancel from './cancel'
import detail from './detail'
import list from './list'
import orderRecord from './order-record'
import privilege from './privilege'
import returnPlan from './return-plan'

export default combineReducers({
  list,
  cancel,
  detail,
  returnPlan,
  privilege,
  buyOut,
  orderRecord,
})
