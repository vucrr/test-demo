import { Flex } from 'antd-mobile'
import cx from 'classnames'
import { Swiper } from 'components'
import * as React from 'react'
import Lottie from 'react-lottie'
import Row from './Detail/Row'
import styles from './Detail/index.less'

const Item = Flex.Item

export interface ExchangeListProps {
  detail: any
}

function renderCarousel(detail: any) {
  const lottieProps = {
    options: {
      loop: true,
      autoplay: true,
      animationData: require('json/exchange-right.json'),
    },
    width: 27,
    height: 27,
  }
  if (detail.getIn(['replacement_list', 'list']).size === 0) {
    // 无换机记录
    return null
  } else if (detail.getIn(['replacement_list', 'list']).size > 1) {
    // 多次换机后的轮播展示
    return (
      <Swiper
        className={styles.pro_list}
        centeredSlides={true}
        slidesPerView={1.1}
        spaceBetween={10}
        dots={true}
        dotPosition="bottom"
      >
        {detail.getIn(['replacement_list', 'list']).map((item: any, index: number) => {
          return (
            <div key={index} className={styles.e_product}>
              <Flex className={styles.ex_detail}>
                <Item>
                  <img src={item.get('old_sku_img')} alt="OLD SKU" />
                  <p className={styles.oldphone}>{item.get('old_sku_name')}</p>
                </Item>
                <div className={styles.lottie_icon}>
                  <Lottie {...lottieProps} />
                </div>
                <Item>
                  <img src={item.get('new_sku_img')} alt="NEW SKU" />
                  <p>{item.get('new_sku_name')}</p>
                </Item>
              </Flex>
              <Row title="换机时间" content={item.get('replacement_time')} />
            </div>
          )
        })}
      </Swiper>
    )
  } else {
    // 一次换机记录
    const item = detail.getIn(['replacement_list', 'list']).get(0)
    return (
      <div className={cx(styles.e_product, styles.productWrapper)}>
        <Flex className={styles.ex_detail}>
          <Item>
            <img src={item.get('old_sku_img')} alt="OLD SKU" />
            <p className={styles.oldphone}>{item.get('old_sku_name')}</p>
          </Item>
          <div className={styles.lottie_icon}>
            <Lottie {...lottieProps} />
          </div>
          <Item>
            <img src={item.get('new_sku_img')} alt="NEW SKU" />
            <p>{item.get('new_sku_name')}</p>
          </Item>
        </Flex>
        <Row title="换机时间" content={item.get('replacement_time')} />
      </div>
    )
  }
}

function ExchangeList(props: ExchangeListProps) {
  const { detail } = props
  if (!detail.getIn(['replacement_list', 'list']).size) return null
  return (
    <div className={styles.list}>
      <Flex className={styles.exchange_tit} justify="between">
        换机次数<span>{detail.getIn(['replacement_list', 'count'])}</span>
      </Flex>
      {renderCarousel(detail)}
    </div>
  )
}

export default ExchangeList
