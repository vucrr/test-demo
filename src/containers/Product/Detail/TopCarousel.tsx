import { Flex } from 'antd-mobile'
import { Icon, LazyImage, Swiper, withSource } from 'components'
import { SourceProps } from 'components/withSource'
import Router from 'next/router'
import React, { useState } from 'react'
import { noop } from 'utils/tools'
import styles from './TopCarousel.less'

interface TopCarouselProps {
  imageList: any
  newOrderInfo: any
}

const TopCarousel: React.FunctionComponent<TopCarouselProps & SourceProps> = ({ imageList, newOrderInfo }) => {
  const [page, setPage] = useState<number>(1)

  const handleChange = (cur: number) => {
    setPage(cur + 1)
  }

  const handleBack = () => {
    Router.back()
  }

  return (
    <div id="carouselBox" className={styles.content_box}>
      <Swiper className={styles.pro_list} dots={false} afterChange={handleChange} on={{ slideChange: noop }}>
        {imageList.map((item: string, index: number) => {
          return (
            <Flex align="center" justify="center" className={styles.topImg} key={index}>
              <LazyImage src={item} />
            </Flex>
          )
        })}
      </Swiper>
      <Flex align="center" justify="center" className={styles.callback} onClick={handleBack}>
        <Icon type={require('svg/arrow-left.svg')} className={styles.back} />
      </Flex>
      {newOrderInfo.size ? (
        <Swiper
          className={styles.swiper_inner}
          direction="vertical"
          dots={false}
          loop={true}
          autoplay={{ delay: 2000 }}
        >
          {newOrderInfo.map((item: string, index: number) => <p key={index}>{item}</p>)}
        </Swiper>
      ) : null}
      <h4>
        {page}/{imageList.size}
      </h4>
    </div>
  )
}

export default withSource<TopCarouselProps>(TopCarousel)
