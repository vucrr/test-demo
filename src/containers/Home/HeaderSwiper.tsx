import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { LazyImage, Link, Swiper } from 'components'
import { TrackEventHome } from 'configs/trackEventLabels'
import React from 'react'
import { convertIndexToDigital, renderLink } from 'utils/tools'
import styles from './HeaderSwiper.less'

export interface HeaderSwiperProps {
  festival: any
  brand: any
  list: any
  brands: any
}

const HeaderSwiper: React.FunctionComponent<HeaderSwiperProps> = ({ festival, brand, list, brands }) => {
  const swiperProps = {
    autoplay: true,
    loop: true,
    className: styles.topSwiper,
    loopFillGroupWithBlank: true,
  }

  const isFestival = +festival.get('is_festival') === 1

  const bgProps = isFestival
    ? {
        background: `url(${festival.get('image')}) top center no-repeat`,
        backgroundSize: 'cover',
      }
    : {}

  return (
    <div className={classnames(styles.container, isFestival && styles.festival)}>
      {festival && <div className={styles.bg} style={{ ...bgProps }} />}
      {brand && (
        <Flex align="end" className={styles.title}>
          <h1>{brand.get('name')}</h1>
          <p>{brand.get('positioning')}</p>
        </Flex>
      )}
      {list && (
        <div className={styles.swiper_wrap}>
          <Swiper dotPosition="right" {...swiperProps}>
            {list.map((item: any, key: number) => {
              const trackEvent = {
                label: `${TrackEventHome.BannerNav.Carousel + convertIndexToDigital(key)}\t${item.get('image')}`,
                category: TrackEventHome.Category,
              }

              return (
                <Link className={styles.thumb_box} to={renderLink({ item })} key={key} trackEvent={trackEvent}>
                  <img className={styles.thumb} src={item.get('image')} />
                </Link>
              )
            })}
          </Swiper>
        </div>
      )}
      {brands && (
        <Flex justify="between" className={styles.tips}>
          {brands.map((item: any, key: number) => {
            return (
              <Flex className={styles.tip} key={key}>
                <LazyImage src={item.get('image')} />
                {item.get('text')}
              </Flex>
            )
          })}
        </Flex>
      )}
    </div>
  )
}

export default HeaderSwiper
