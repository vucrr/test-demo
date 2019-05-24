import { combineReducers } from 'redux-immutable'
import exchangeCoupon from './exchangeCoupon'
import guideOldUser from './guideOldUser'

export default combineReducers({
  exchangeCoupon,
  guideOldUser,
})
