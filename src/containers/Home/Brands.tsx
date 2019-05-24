import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { LazyImage, Swiper } from 'components'
import { TrackEventHome } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './Brands.less'

export interface BrandsProps {
  list: any
}

export interface BrandsState {
  showMore: boolean
}

class Brands extends React.Component<BrandsProps, BrandsState> {
  readonly state: Readonly<BrandsState> = {
    showMore: false,
  }
  handleClick = (item: any, index?: number) => async () => {
    if (index === 3 && item.get('is_more_icon')) {
      if (this.state.showMore) {
        trackClickEvent({ category: TrackEventHome.Category, label: TrackEventHome.BrandIcon.MoreIconClose })
      } else {
        trackClickEvent({ category: TrackEventHome.Category, label: TrackEventHome.BrandIcon.MoreIconOpen })
      }
      this.setState({ showMore: !this.state.showMore })
    } else {
      trackClickEvent({
        category: TrackEventHome.Category,
        label: `${TrackEventHome.BrandIcon.BrandIcon}\t${item.get('brand_id')}`,
      })
      await Router.push(`/product/brands?brand_id=${item.get('brand_id')}`)
    }
  }

  render() {
    const { list } = this.props

    if (!list) {
      return null
    }

    const { showMore } = this.state
    const listStart = list.filter((_: any, index: number) => index < 4)
    const listEnd = list.filter((_: any, index: number) => index >= 4)

    const swiperProps = {
      className: styles.swiper,
      dots: false,
      slidesPerView: listEnd.size > 4 ? 3.8 : 4,
      spaceBetween: 12,
      freeMode: true,
    }

    return (
      <div className={styles.container}>
        <Flex className={styles.brands} justify="between">
          {listStart.map((item: any, key: number) => {
            return (
              <Flex
                direction="column"
                justify="between"
                key={key}
                className={classnames(styles.brand, key === 3 && item.get('is_more_icon') && showMore && styles.active)}
                onClick={this.handleClick(item, key)}
              >
                <LazyImage className={styles.thumb} src={item.get('main_icon')} />
              </Flex>
            )
          })}
        </Flex>
        <div className={classnames(styles.more_list, showMore && styles.active)}>
          <Swiper {...swiperProps}>
            {listEnd.map((item: any, key: number) => (
              <div key={key} className={styles.brandLogo}>
                <LazyImage src={item.get('sub_icon')} onClick={this.handleClick(item)} />
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    )
  }
}

export default Brands
