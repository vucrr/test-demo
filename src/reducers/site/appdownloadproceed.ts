import { FETCH_APPDOWNLOAD_PROCEED } from 'constant/index'
import { fromJS } from 'immutable'
import { ProceedReturns } from 'interfaces/appdownload'
import { handleActions } from 'redux-actions'

const initialAppdownload: ProceedReturns = {
  appDownloadUrl: {
    android: '',
    ios: '',
  },
  pagetitle: '',
}

const appdownloadproceed = handleActions(
  {
    [FETCH_APPDOWNLOAD_PROCEED](state, { payload }) {
      const { appDownloadUrl }: ProceedReturns = payload
      return state.set('appDownloadUrl', fromJS(appDownloadUrl))
    },
  },
  fromJS(initialAppdownload),
)

export default appdownloadproceed
