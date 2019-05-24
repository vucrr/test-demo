import { Flex } from 'antd-mobile'
import { LazyImage, Swiper } from 'components'
import { TrackEventHome } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import { noop } from 'utils/tools'
import styles from './RecommendSwiper.less'

const Item = Flex.Item

export interface RecommendSwiperProps {
  title: string
  list: any
}

export interface RecommendSwiperState {
  page: number
}

class RecommendSwiper extends React.Component<RecommendSwiperProps, RecommendSwiperState> {
  readonly state: Readonly<RecommendSwiperState> = {
    page: 1,
  }

  handleChange = (cur: number) => {
    this.setState({
      page: cur + 1,
    })
  }

  handleClick = (item: any) => async () => {
    trackClickEvent({
      category: TrackEventHome.Category,
      label: `${TrackEventHome.BrandIcon.BrandIcon}\t${item.get('product_id')}`,
    })
    await Router.push(`/product/detail?id_activity=${item.get('product_id')}`)
    window.scrollTo(0, 0)
  }

  render() {
    const { title, list } = this.props

    if (!list) {
      return null
    }

    const swiperProps = {
      className: styles.swiper,
      dots: false,
      autoplay: false,
      // slidesPerView: 1.03,
      spaceBetween: 6,
      afterChange: this.handleChange,
      on: {
        slideChange: noop,
      },
    }

    return (
      <div className={styles.container}>
        <Flex className={styles.title_box} justify="between">
          <h1>{title}</h1>
          <p>
            <span>{this.state.page}</span> /{list.size}
          </p>
        </Flex>
        <Swiper {...swiperProps}>
          {list.map((item: any, key: number) => (
            <Flex className={styles.item} key={key} onClick={this.handleClick(item)}>
              <Flex className={styles.thumb} justify="center">
                <LazyImage key={key} src={item.get('image')} />
                {item.get('tag') && <p>{item.get('tag')}</p>}
              </Flex>
              <Item className={styles.right}>
                <h4>{item.get('name')}</h4>
                <Flex className={styles.price} align="end">
                  <span className={styles.union}>￥</span>
                  <span className={styles.cur_price}>{item.get('price')}</span>
                  <span className={styles.per}>{item.get('price_unit')}</span>
                  {item.get('base_fee') > item.get('price') && (
                    <span className={styles.line}>
                      ¥{item.get('base_fee')}
                      {item.get('price_unit')}
                    </span>
                  )}
                </Flex>
                <div className={styles.extra_box}>
                  <Flex className={styles.left} justify="center">
                    省
                  </Flex>
                  <div className={styles.right}>
                    {item.get('assurance') && <p>{item.get('assurance')}</p>}
                    {item.get('assurance_divide') && <p>{item.get('assurance_divide')}</p>}
                  </div>
                </div>
              </Item>
            </Flex>
          ))}
        </Swiper>
      </div>
    )
  }
}

export default RecommendSwiper
