import { GET_CACHE_LIST, REMOVE_ALL_CACHE, REMOVE_CACHE } from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

interface InitCacheListPayload {
  list: string[]
}

const initialCacheList: InitCacheListPayload = {
  list: [],
}

const cacheList = handleActions(
  {
    [GET_CACHE_LIST](state, { payload: { list } }) {
      return state.set('list', fromJS(list))
    },
    [REMOVE_CACHE](state, { payload: { index } }) {
      return state.deleteIn(['list', fromJS(index)])
    },
    [REMOVE_ALL_CACHE](state) {
      return state.set('list', fromJS([]))
    },
  },
  fromJS(initialCacheList),
)

export default cacheList
