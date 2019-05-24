import { Flex } from 'antd-mobile'
import { LazyImage, Link, Swiper } from 'components'
import { TrackEventHome } from 'configs/trackEventLabels'
import React from 'react'
import { convertIndexToDigital } from 'utils/tools'
import styles from './ActivityList.less'

export interface ActivityListProps {
  title: string
  list: any
}

const ActivityList: React.FunctionComponent<ActivityListProps> = ({ title, list }) => {
  if (!list) {
    return null
  }

  const swiperProps = {
    className: styles.swiper_box,
    slidesPerView: 2.4726,
    spaceBetween: 10,
    freeMode: true,
    dots: false,
  }

  const getBgImage = (url: string) => {
    return {
      background: `url(${url}) top center no-repeat`,
      backgroundSize: 'contain',
    }
  }

  return (
    <div className={styles.pro_box}>
      <h1>{title}</h1>
      {list.map((info: any, key: number) => (
        <div key={key} className={styles.list} style={{ ...getBgImage(info.get('header_img')) }}>
          <Swiper {...swiperProps}>
            {info.get('products').map((item: any, ikey: number) => {
              const trackEvent = {
                label: `${TrackEventHome.ActivityList.Topic + convertIndexToDigital(key)}\t${item.get('product_id')}`,
                category: TrackEventHome.Category,
              }
              return (
                <Link
                  to={`/product/detail?id_activity=${item.get('product_id')}`}
                  className={styles.item}
                  key={ikey}
                  trackEvent={trackEvent}
                >
                  <Flex className={styles.thumb} justify="center">
                    <LazyImage key={key} src={item.get('image')} />
                    {item.get('tag') && <p>{item.get('tag')}</p>}
                  </Flex>
                  <div className={styles.text_box}>
                    <h5>{item.get('name')}</h5>
                    <Flex className={styles.badge_box} align="start" wrap="wrap">
                      {item.get('property_tags').map((tag: any, key: number) => <span key={key}>{tag}</span>)}
                    </Flex>
                    <p className={styles.price}>
                      ¥{item.get('price')}
                      <span className={styles.union}>{item.get('price_unit')}</span>
                      {item.get('base_fee') > item.get('price') && (
                        <span className={styles.line}>￥{item.get('base_fee')}</span>
                      )}
                    </p>
                  </div>
                </Link>
              )
            })}
          </Swiper>
        </div>
      ))}
    </div>
  )
}

export default ActivityList
