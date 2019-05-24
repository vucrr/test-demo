import { combineReducers } from 'redux-immutable'
import brands from './brands'
import category from './category'
import comments from './comments'
import detail from './detail'
import introduce from './introduce'
import videoDetail from './video-detail'

export default combineReducers({
  category,
  detail,
  introduce,
  videoDetail,
  comments,
  brands,
})
