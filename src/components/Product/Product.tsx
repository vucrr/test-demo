import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Icon, LazyImage, Link } from 'components'
import React from 'react'
import { TrackClickEventProperties } from 'utils/piwik'
import withSource, { SourceProps } from '../withSource'
import styles from './Product.less'

interface ProductProps {
  item: any
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trackEvent?: TrackClickEventProperties
  recommend?: boolean
}

const Product = ({ ua, utm, item, size = 'md', trackEvent, recommend }: ProductProps & SourceProps) => {
  const isOld = item.get('tag') === 3
  const showOldPrice = item.get('price') < item.get('baseFee')
  const isApp = ua.get('isApp')
  const isCmblife = utm.get('isCmblife')
  const pathname = isApp ? '/product/index' : '/product/detail'

  return (
    <Link
      native={isApp || isCmblife}
      className={classnames(styles.product, styles[size], recommend && styles.recommend)}
      to={{ pathname, query: { id_activity: item.get('id') } }}
      trackEvent={trackEvent}
    >
      <Flex className={styles.thumb} justify="center">
        <LazyImage src={item.get('imgUrl')} />
        {!item.get('noBadge') ? (
          <span className={classnames(styles.badge, isOld && styles.used)}>{isOld ? '9成新' : '全新'}</span>
        ) : (
          ''
        )}
        {showOldPrice &&
          !item.get('noBadge') && (
            <div className={styles.icon_box}>
              <Icon className={styles.icon} type={require('svg/jiangjia.svg')} />
              <span>直降</span>
            </div>
          )}
      </Flex>
      <div className={styles.text_box}>
        <span className={classnames(styles.title, size !== 'xs' && 'ellipsis')}>{item.get('title')}</span>
        {item.get('assurance') && (
          <span className={classnames(styles.des, 'ellipsis')}>比购买省￥{item.get('assurance')}起</span>
        )}
        <div className={styles.price_box}>
          <span className={classnames(styles.price, 'special')}>
            ¥{item.get('price')}
            <span className={styles.unit}>/月起</span>
          </span>
          {showOldPrice && (
            <span className={styles.old_price}>
              ￥{item.get('baseFee')}
              <span className={styles.unit}>/月起</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default withSource<ProductProps>(Product)
