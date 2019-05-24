import {
  CLEAR_RETURN_PHONE_STORE_LIST,
  FETCH_RETURN_PHONE_CITY,
  FETCH_RETURN_PHONE_CITY_REGION,
  FETCH_RETURN_PHONE_STORE,
  SELECT_RETURN_PHONE_STORE,
} from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initial = {
  list: {},
  region: [],
  store: [],
}

export default handleActions(
  {
    [FETCH_RETURN_PHONE_CITY](state, { payload }) {
      return state.set('list', fromJS(payload.all)).set('hot', fromJS(payload.hot))
    },
    [FETCH_RETURN_PHONE_CITY_REGION](state, { payload }) {
      return state.set('region', fromJS(payload))
    },
    [FETCH_RETURN_PHONE_STORE](state, { payload }) {
      payload = payload.data.map((d: any) => {
        d.selected = d.store_id === parseInt(payload.selectedId, 10)
        return d
      })
      return state.set('store', fromJS(payload))
    },
    [SELECT_RETURN_PHONE_STORE](state, { payload }) {
      const store = state.get('store').map((item: any) => item.set('selected', false))
      return state.set('store', store).updateIn(['store', payload], (item: any) => {
        return item.set('selected', !item.get('selected'))
      })
    },
    [CLEAR_RETURN_PHONE_STORE_LIST](state) {
      return state.set('store', fromJS([]))
    },
  },
  fromJS(initial),
)
