import classnames from 'classnames'
import React from 'react'
import Swiper, { SwiperProps } from 'react-id-swiper'
import { noop } from 'utils/tools'
import styles from './Swiper.less'

export interface MySwiperProps {
  children: React.ReactNode
  className?: string
  dotPosition?: 'left' | 'center' | 'right' | 'bottom'
  dots?: boolean
  afterChange?: Function
}

const MySwiper: React.FunctionComponent<MySwiperProps & SwiperProps> = ({
  children,
  className,
  dots,
  dotPosition,
  afterChange,
  ...props
}) => {
  if (!dots) {
    props.pagination = {}
  }
  if (afterChange) {
    props.on!.slideChange = function() {
      const $swiper = this as any
      afterChange($swiper.activeIndex)
    }
  }
  return (
    <div className={styles.swiper_wrap}>
      <Swiper {...props} containerClass={classnames(styles.swiper, className, styles[`dot_${dotPosition}`])}>
        {children}
      </Swiper>
    </div>
  )
}

MySwiper.defaultProps = {
  dots: true,
  dotPosition: 'center',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    bulletActiveClass: 'active',
  },
  on: {
    slideChange: noop,
  },
}

export default MySwiper
