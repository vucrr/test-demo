import { LazyImage } from 'components'
import React from 'react'
import { Animated } from 'react-animated-css'
import styles from './Cheap.less'
import HeaderImg from './HeaderImg'

export interface CheapProps {
  active: boolean
}

const Cheap: React.FunctionComponent<CheapProps> = ({ active }) => {
  return (
    <div className={styles.cheap}>
      <HeaderImg />
      <LazyImage className={styles.aroundImg} src={require('images/activity/guide-new-user/around_img.png')} alt="" />
      <Animated className={styles.animatedStyle} animationIn="fadeIn" animationOut="fadeOut" isVisible={active}>
        <div className={styles.title}>便宜</div>
        <div className={styles.example}>
          <LazyImage
            className={styles.imgLogo}
            src={require('images/activity/guide-new-user/example_img.png')}
            alt=""
          />
          <span className={styles.firstChild}>以 iPhone XS 64G 为例</span>
          <span>(实际价格以线上为准）</span>
        </div>
      </Animated>
      <LazyImage
        className={styles.directPurchase}
        src={require('images/activity/guide-new-user/directPurchase.png')}
        alt=""
      />
      <LazyImage
        className={styles.installments}
        src={require('images/activity/guide-new-user/installments.png')}
        alt=""
      />
      <div className={styles.description}>
        <span>!</span>
        <span>首月需支付意外维修服务费</span>
      </div>
    </div>
  )
}
export default Cheap
