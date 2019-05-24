import { FETCH_SEARCH_LIST, FETCH_SELECT_LIST } from 'constant/index'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { tools } from 'utils'
import Geo from 'utils/geo'

export const handleCityDetail = (city: string, lnglat: any, type: boolean) => async (dispatch: Dispatch<Action>) => {
  try {
    // type 正向编码（根据城市获取）还是逆向编码（根据经纬度获取）
    const cityDetail: any = await Geo.cityDetail(city, lnglat, type)
    // 获得详细地址
    if (cityDetail.info === 'OK') {
      return dispatch(createAction(FETCH_SELECT_LIST)(cityDetail)).payload
    }
  } catch (err) {
    tools.ErrorLog(err)
  }
}

enum MSG {
  Loading = '加载中...',
  Fail = '加载失败',
  Null = '',
}
export const changeSearch = (city: any, keyword: any) => async (dispatch: Dispatch<Action>) => {
  try {
    if (city === 'loading') {
      return dispatch(createAction(FETCH_SEARCH_LIST)(MSG.Fail)).payload
    }
    const poiList: any = (await Geo.placeSearch(city, keyword)) || MSG.Fail
    return dispatch(createAction(FETCH_SEARCH_LIST)(poiList)).payload
  } catch (err) {
    tools.ErrorLog(err)
  }
}
