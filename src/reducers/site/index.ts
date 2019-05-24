import { combineReducers } from 'redux-immutable'
import appdownload from './appdownload'
import appdownloadproceed from './appdownloadproceed'

export default combineReducers({
  appdownload,
  appdownloadproceed,
})
