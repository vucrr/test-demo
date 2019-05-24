import { GET_HOME_INFO, GET_HOME_USER_TAG } from 'constant/index'
import { fromJS } from 'immutable'
import { HomeDataReturns, UserTagReturns } from 'interfaces/home'
import { handleActions } from 'redux-actions'

const initialHome: Partial<HomeDataReturns & { userTag: Partial<UserTagReturns> }> = {
  userTag: {},
}

const home = handleActions(
  {
    [GET_HOME_INFO](state, { payload }) {
      const homeData: HomeDataReturns = payload
      return state.merge(fromJS(homeData))
    },
    [GET_HOME_USER_TAG](state, { payload }) {
      const userTagData: UserTagReturns = payload
      return state.set('userTag', fromJS(userTagData))
    },
  },
  fromJS(initialHome),
)

export default home
