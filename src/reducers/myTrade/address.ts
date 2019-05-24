import {
  FETCH_ADDRESS_FORM,
  FETCH_CITY_LIST,
  FETCH_SEARCH_LIST,
  FETCH_SELECT_LIST,
  SAVE_ADDRESS_FORM,
} from 'constant/index'
import { fromJS } from 'immutable'
import { AddressForm } from 'interfaces/trade'
import { handleActions } from 'redux-actions'

enum MSG {
  Loading = '加载中...',
  Fail = '加载失败',
  Null = '',
}

const initial: any = {
  form: {},
  city: {
    hot: [],
    all: {},
  },
  select: {
    pois: [],
    count: 0,
    msg: MSG.Loading,
  },
}

export default handleActions(
  {
    [FETCH_ADDRESS_FORM](state, { payload }) {
      const res: AddressForm = payload
      return state.set('form', fromJS(res))
    },
    [SAVE_ADDRESS_FORM](state, { payload }) {
      const res: AddressForm = payload
      return state.set('result', fromJS(res))
    },
    [FETCH_CITY_LIST](state, { payload }) {
      const city = state.get('city')
      const newCity = city.set('hot', fromJS(payload.hot_citys)).set('all', fromJS(payload.all_citys))
      return state.set('city', newCity)
    },
    [FETCH_SELECT_LIST](state, { payload }) {
      const res = payload
      const oldSelect = state.get('select')
      if (res.regeocode) {
        const select = oldSelect
          .set('pois', fromJS(res.regeocode.pois))
          .set('msg', fromJS(''))
          .set('count', fromJS(res.regeocode.pois.length))
        return state.set('select', select)
      } else {
        return state.set('geocode', payload)
      }
    },
    [FETCH_SEARCH_LIST](state, { payload }) {
      const poiList = payload
      const oldSelect = state.get('select')
      let pois
      let msg
      let count
      if (poiList === MSG.Fail) {
        pois = []
        msg = MSG.Fail
        count = 0
      } else if (poiList === 'no_data') {
        pois = []
        msg = MSG.Null
        count = -1
      } else {
        pois = poiList.pois
        msg = ''
        count = poiList.count
      }
      const select = oldSelect
        .set('pois', fromJS(pois))
        .set('msg', fromJS(msg))
        .set('count', fromJS(count))
      return state.set('select', select)
    },
  },
  fromJS(initial),
)
