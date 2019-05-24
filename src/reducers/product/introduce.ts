import { GET_PRODUCT_INTRODUCE_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { ReceiveInfoReturns } from 'interfaces/category'
import { handleActions } from 'redux-actions'

const initialIntroduce: ReceiveInfoReturns = {
  id: 0,
  product_name: '',
  product_introduce_img: '',
}

const introduce = handleActions(
  {
    [GET_PRODUCT_INTRODUCE_INFO](state, { payload }) {
      return state.merge(payload)
    },
  },
  fromJS(initialIntroduce),
)

export default introduce
