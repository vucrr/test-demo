import { RECEIVE_INFORMATION_DATA } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialData = {
  needBindCard: 1, // 0：不需要 1：需要
  needUpload: 1, //
}

const informationData = handleActions(
  {
    [RECEIVE_INFORMATION_DATA](state, { payload }) {
      const { needBindCard, needUpload } = payload
      return state.set('needBindCard', needBindCard).set('needUpload', needUpload)
    },
  },
  fromJS(initialData),
)

export default informationData
