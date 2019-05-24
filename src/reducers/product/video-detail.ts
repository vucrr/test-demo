import { GET_VIDEO_DETAIL_INFO } from 'constant/index'
import { fromJS } from 'immutable'
import { VideoDetailReturns } from 'interfaces/video-detail'
import { handleActions } from 'redux-actions'

const initialVideoDetail: VideoDetailReturns = {
  video: {
    url: '',
    title: '',
    desc: '',
    views: '',
    duration: '',
    pic: '',
  },
  video_product: [],
  recommend_products: [],
}

const videoDetail = handleActions(
  {
    [GET_VIDEO_DETAIL_INFO](state, { payload }) {
      const { video, video_product, recommend_products }: VideoDetailReturns = payload
      return state
        .set('video', fromJS(video))
        .set('video_product', fromJS(video_product))
        .set('recommend_products', fromJS(recommend_products))
    },
  },
  fromJS(initialVideoDetail),
)

export default videoDetail
