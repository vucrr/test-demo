import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { LazyImage, Link } from 'components'
import { TrackEventHome } from 'configs/trackEventLabels'
import dayjs from 'dayjs'
import React from 'react'
import { convertIndexToDigital, renderLink } from 'utils/tools'
import styles from './Coupons.less'

export interface ImageDayLeftProps {
  ext: any
}

const ImageDayLeft: React.FunctionComponent<ImageDayLeftProps> = ({ ext }) => {
  const now = dayjs()
  const leftDate = dayjs.unix(ext.get('expire_datetime'))
  const day = leftDate.diff(now, 'day')
  const hour = leftDate.diff(now, 'hour') - day * 24
  const showHour = day < 7
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      className={classnames(styles.bg_date, showHour && styles.hour)}
    >
      <p>
        {day > 0 ? `${day}`.padStart(2, '0') : '00'}
        <span>天</span>
      </p>
      {showHour && (
        <p>
          {hour > 0 ? `${hour}`.padStart(2, '0') : '00'}
          <span>时</span>
        </p>
      )}
    </Flex>
  )
}

export interface CouponsProps {
  info: any
  fetchList: any
}

export interface CouponsState {}

class Coupons extends React.Component<CouponsProps, CouponsState> {
  componentDidMount() {
    const { fetchList } = this.props
    fetchList()
  }

  render() {
    const { info } = this.props
    const title = info.get('model_title')
    const list = info.get('model_data')
    if (!title || list.size !== 2) {
      return null
    }
    return (
      <div className={styles.container}>
        <h1>{title}</h1>
        <Flex className={styles.wrapper} justify="between">
          {list.map((item: any, key: number) => {
            const isTag = item.get('user_tag') === 'expire_user'
            const trackEventleft = {
              label: `${TrackEventHome.NewOldUser.NewOldBannerLeft + convertIndexToDigital(key)}\t${item.get(
                'image',
              )}\t${item.get('user_tag')}`,
              category: TrackEventHome.Category,
            }
            const trackEventright = {
              label: `${TrackEventHome.NewOldUser.NewOldBannerRight + convertIndexToDigital(key)}\t${item.get(
                'image',
              )}\t${item.get('user_tag')}`,
              category: TrackEventHome.Category,
            }

            return (
              <Link
                to={renderLink({ item })}
                key={key}
                className={styles.coupon}
                trackEvent={key === 0 ? trackEventleft : trackEventright}
              >
                <LazyImage className={styles.thumb} src={item.get('image')} />
                {isTag && key === 0 && <ImageDayLeft ext={item.get('ext')} />}
                {isTag &&
                  key === 1 && (
                    <span className={styles.right_text} style={{ color: `#${item.getIn(['ext', 'font_color'])}` }}>
                      {item.getIn(['ext', 'expire_title'])}
                    </span>
                  )}
              </Link>
            )
          })}
        </Flex>
      </div>
    )
  }
}

export default Coupons
