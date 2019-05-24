import { FETCH_ACTIVITYS_GUIDE_OLD_USER } from 'constant/index'
import dayjs from 'dayjs'
import { fromJS } from 'immutable'
import { GuideOldUserData } from 'interfaces/activitys/guide-old-user'
import { handleActions } from 'redux-actions'

const initialGuideOldUserData = {
  showHour: true,
  day: '00',
  hour: '00',
  showExpired: false,
  product_name: '',
}

const GuideOldUserDataReturn = handleActions(
  {
    [FETCH_ACTIVITYS_GUIDE_OLD_USER](state, { payload }) {
      const { dt_end_date, product_name }: GuideOldUserData = payload
      const now = dayjs()
      const leftDate = dayjs.unix(dt_end_date)
      const day = leftDate.diff(now, 'day')
      const hour = leftDate.diff(now, 'hour') - day * 24
      const dayData = day.toString().padStart(2, '0')
      const hourData = hour.toString().padStart(2, '0')
      return state
        .set('day', fromJS(parseInt(dayData, 10) > 0 ? dayData : '00'))
        .set('hour', fromJS(parseInt(hourData, 10) > 0 ? hourData : '00'))
        .set('showHour', fromJS(day < 7))
        .set('showExpired', fromJS(hour <= 0))
        .set('product_name', fromJS(product_name))
    },
  },
  fromJS(initialGuideOldUserData),
)

export default GuideOldUserDataReturn
