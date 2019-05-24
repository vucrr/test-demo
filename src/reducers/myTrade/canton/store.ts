import {
  FETCH_CANTON_STORE_CITY,
  FETCH_CANTON_STORE_DETAIL,
  FETCH_CANTON_STORE_SELECT,
  LOAD_FETCH_CANTON_STORE_SELECT,
  SELECT_CANTON_STORE_ITEM,
} from 'constant/index'
import { fromJS } from 'immutable'
import { CantonCity, CantonDetail } from 'interfaces/guangzhou'
import { handleActions } from 'redux-actions'

const initialReturn: any = {
  city: {},
  detail: {},
  store_list: [],
}

const contonStoreReturn = handleActions(
  {
    [FETCH_CANTON_STORE_CITY](state, { payload }) {
      const res: CantonCity = payload
      return state.set('city', fromJS(res))
    },
    [FETCH_CANTON_STORE_DETAIL](state, { payload }) {
      const res: CantonDetail = payload
      return state.set('detail', fromJS(res))
    },
    [FETCH_CANTON_STORE_SELECT](state, { payload }) {
      const { store_list, page_index, total_count, errorMsg } = payload
      if (errorMsg) {
        return state.set('store_list', fromJS(payload))
      } else {
        return state
          .set('store_list', fromJS(store_list))
          .set('page_index', fromJS(page_index))
          .set('total_count', fromJS(total_count))
      }
    },
    [LOAD_FETCH_CANTON_STORE_SELECT](state, { payload }) {
      const { store_list, page_index, total_count } = payload
      const storelists = state.get('store_list').concat(fromJS(store_list))
      return state
        .set('store_list', fromJS(storelists))
        .set('page_index', fromJS(page_index))
        .set('total_count', fromJS(total_count))
    },
    [SELECT_CANTON_STORE_ITEM](state, { payload }) {
      const newList = state.get('store_list').toJS()
      newList.map((item: any) => {
        item.selected = item.store_code === payload && !item.selected
        return item
      })
      return state.set('store_list', fromJS(newList))
    },
  },
  fromJS(initialReturn),
)

export default contonStoreReturn
