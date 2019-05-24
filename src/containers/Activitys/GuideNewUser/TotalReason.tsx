import { LazyImage } from 'components'
import React from 'react'
import { Animated } from 'react-animated-css'
import Lottie from 'react-lottie'
import HeaderImg from './HeaderImg'
import styles from './TotalReason.less'

const lottieProps2 = {
  options: {
    loop: true,
    autoplay: true,
    animationData: require('./data/page1_loop').default,
  },
  width: '100%',
  height: '100%',
}

export interface TotalReasonProps {
  active: boolean
}

const TotalReason: React.FunctionComponent<TotalReasonProps> = ({ active }) => {
  return (
    <div className={styles.reason}>
      <LazyImage className={styles.bg_img} src={require('images/activity/guide-new-user/page_1_bg.png')} alt="" />
      <HeaderImg />
      <Animated className={styles.rea_title} animationIn="fadeIn" animationOut="fadeOut" isVisible={active}>
        <p>在享换机换手机的</p>
        <p>
          <span>4</span> 大理由。
        </p>
        <div className={styles.parenter}>
          <p>爱回收丨芝麻信用丨花呗丨三星</p>
          <p>— 战略合作伙伴 —</p>
        </div>
      </Animated>
      <LazyImage className={styles.page1_1} src={require('images/activity/guide-new-user/page1_1.png')} alt="" />
      <LazyImage className={styles.page1_2} src={require('images/activity/guide-new-user/page1_2.png')} alt="" />
      <LazyImage className={styles.page1_3} src={require('images/activity/guide-new-user/page1_3.png')} alt="" />
      <LazyImage className={styles.page1_4} src={require('images/activity/guide-new-user/page1_4.png')} alt="" />
      <div className={styles.lottieProps2}>
        <Lottie {...lottieProps2} />
      </div>
    </div>
  )
}

export default TotalReason
