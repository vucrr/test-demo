import { FETCH_APPDOWNLOAD_LIST } from 'constant/index'
import { fromJS } from 'immutable'
import { DataReturns } from 'interfaces/appdownload'
import { handleActions } from 'redux-actions'

const initialAppdownload: DataReturns = {
  appDownloadUrl: {
    android: '',
    ios: '',
  },
  hot: [
    {
      id: 130,
      title: '三星Galaxy S9+',
      assurance: 2751,
      price: 329,
      imgUrl:
        'https://img2.xianghuanji.com/image/product/4471a3b7fd9880f00f161d1d0baa1bbd9f88a1cb.png@264w_264h_1e_1c.png',
      tag: 2,
    },
    {
      id: 138,
      title: 'vivo X21',
      assurance: 887,
      price: 164,
      imgUrl:
        'https://img2.xianghuanji.com/image/product/2fd55fffbb89dbf361cc5a42b8b2efeb7fdb0d92.png@264w_264h_1e_1c.png',
      tag: 2,
    },
    {
      id: 139,
      title: 'OPPO R15',
      assurance: 1025,
      price: 158,
      imgUrl: 'https://img2.xianghuanji.com/image/product/011ac4c2466f4b26a0152276fd6e0faa.png@264w_264h_1e_1c.png',
      tag: 2,
    },
  ],
  pagetitle: '',
}

const appdownload = handleActions(
  {
    [FETCH_APPDOWNLOAD_LIST](state, { payload }) {
      const { appDownloadUrl, hot, pagetitle }: DataReturns = payload
      return state
        .set('appDownloadUrl', fromJS(appDownloadUrl))
        .set('hot', fromJS(hot))
        .set('pagetitle', fromJS(pagetitle))
    },
  },
  fromJS(initialAppdownload),
)

export default appdownload
