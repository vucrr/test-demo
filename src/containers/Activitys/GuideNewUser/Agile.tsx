import React from 'react'
import { Animated } from 'react-animated-css'
import Lottie from 'react-lottie'
import styles from './Agile.less'
import HeaderImg from './HeaderImg'

const LottieProps1 = {
  options: {
    loop: true,
    autoplay: true,
    animationData: require('./data/animate_1').default,
  },
  width: '100%',
  height: '100%',
}
const LottieProps2 = {
  options: {
    loop: true,
    autoplay: true,
    animationData: require('./data/animate_2').default,
  },
  width: '100%',
  height: '100%',
}
const LottieProps3 = {
  options: {
    loop: true,
    autoplay: true,
    animationData: require('./data/animate_3').default,
  },
  width: '100%',
  height: '100%',
}
const LottieProps4 = {
  options: {
    loop: true,
    autoplay: true,
    animationData: require('./data/animate_4').default,
  },
  width: '100%',
  height: '100%',
}

export interface AgileProps {
  active: boolean
}

const Agile: React.FunctionComponent<AgileProps> = ({ active }) => {
  return (
    <div className={styles.agile}>
      <HeaderImg />
      <Animated className={styles.animatedStyle} animationIn="fadeIn" animationOut="fadeOut" isVisible={active}>
        <div className={styles.title}>灵活</div>
        <p className={styles.titleDec}>租期满后您可以选择以下方案</p>
      </Animated>
      <div className={styles.lottieProps_1}>
        <p className={styles.titleLeft}>换新机</p>
        <p className={styles.decLeft}>年年用上新手机</p>
        <Lottie {...LottieProps1} />
      </div>
      <div className={styles.lottieProps_2}>
        <p className={styles.titleRight}>续租</p>
        <p className={styles.decRight}>继续租用，期间可换新/买断</p>
        <Lottie {...LottieProps2} />
      </div>
      <div className={styles.lottieProps_3}>
        <p className={styles.titleLeft}>买断</p>
        <p className={styles.decLeft}>支付尾款，终身拥有</p>
        <Lottie {...LottieProps3} />
      </div>
      <div className={styles.lottieProps_4}>
        <p className={styles.titleRight}>还机</p>
        <p className={styles.decRight}>可选择门店还机和邮寄还机</p>
        <Lottie {...LottieProps4} />
      </div>
    </div>
  )
}
export default Agile
