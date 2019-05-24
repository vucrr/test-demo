import {
  CLOSE_PRODUCT_COMMENT_MODAL,
  FETCH_PRODUCT_COMMENTS,
  LOAD_MORE_PRODUCT_COMMENTS,
  OPEN_PRODUCT_COMMENT_MODAL,
} from 'constant/index'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialComments = {
  showModal: false,
  modalData: {},
  list: [],
  total: 0,
  imageCount: 0,
}
const comments = handleActions(
  {
    [OPEN_PRODUCT_COMMENT_MODAL](state, { payload }) {
      return state
        .set('showModal', true)
        .set('modalData', fromJS(payload.data))
        .set('index', payload.index)
    },
    [CLOSE_PRODUCT_COMMENT_MODAL](state) {
      return state
        .set('showModal', false)
        .set('modalData', null)
        .set('index', 0)
    },
    [FETCH_PRODUCT_COMMENTS](state, { payload }) {
      const {
        data: { total, list, have_img_count },
        query,
      } = payload
      return state
        .set('list', fromJS(list))
        .set('total', total)
        .set('imageCount', have_img_count)
        .set('query', fromJS(query))
    },
    [LOAD_MORE_PRODUCT_COMMENTS](state, { payload }) {
      const {
        data: { total, list, have_img_count },
        query,
      } = payload
      const newList = state.get('list').concat(fromJS(list))
      return state
        .set('list', newList)
        .set('total', total)
        .set('imageCount', have_img_count)
        .set('query', fromJS(query))
    },
  },
  fromJS(initialComments),
)

export default comments
