import { FETCH_SERVICE_LIST, FETCH_SERVICE_LIST_MORE } from 'constant/index'
import { fromJS } from 'immutable'
import { ServiceListReturns } from 'interfaces/account/service/list'
import { handleActions } from 'redux-actions'

interface InitialProps extends ServiceListReturns {
  page: number
}

const initial: InitialProps = {
  list: [],
  page: 1,
  has_more: false,
}

interface ListInfo {
  page: number
  info: ServiceListReturns
}

const category = handleActions(
  {
    [FETCH_SERVICE_LIST](state, { payload }) {
      const {
        page,
        info: { list, has_more },
      }: ListInfo = payload
      return state
        .set('list', fromJS(list))
        .set('has_more', has_more)
        .set('page', page)
    },
    [FETCH_SERVICE_LIST_MORE](state, { payload }) {
      const {
        page,
        info: { list, has_more },
      }: ListInfo = payload
      const newList = state.get('list').concat(fromJS(list))
      return state
        .set('list', fromJS(newList))
        .set('has_more', has_more)
        .set('page', page)
    },
  },
  fromJS(initial),
)

export default category
