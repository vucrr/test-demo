import { LazyImage } from 'components'
import React from 'react'
import { Animated } from 'react-animated-css'
import styles from './Disburden.less'
import HeaderImg from './HeaderImg'

export interface DisburdenProps {
  active: boolean
}

const Disburden: React.FunctionComponent<DisburdenProps> = ({ active }) => {
  return (
    <div className={styles.disburden}>
      <LazyImage className={styles.page_bg} src={require('images/activity/guide-new-user/page_3_bg.png')} alt="" />
      <LazyImage className={styles.page3Left} src={require('images/activity/guide-new-user/page_3_left.png')} alt="" />
      <LazyImage
        className={styles.page3Right}
        src={require('images/activity/guide-new-user/page_3_right.png')}
        alt=""
      />
      <HeaderImg />
      <LazyImage className={styles.around_img} src={require('images/activity/guide-new-user/around_img.png')} alt="" />
      <Animated className={styles.animated_style} animationIn="fadeIn" animationOut="fadeOut" isVisible={active}>
        <div className={styles.title}>放心</div>
        <p className={styles.title_dec}>正品保障 一站式服务体验</p>
      </Animated>
      <div className={styles.item_list}>
        <div className={styles.item_member}>
          <div className={styles.member_logo}>
            <LazyImage src={require('images/activity/guide-new-user/logo_1.png')} alt="" />
          </div>
          <div className={styles.member_text}>
            <p className={styles.text_top}>正品保证</p>
            <p className={styles.text_bottom}>我们承诺，享换机平台的全新手机，均为国行正品。</p>
          </div>
        </div>
        <div className={styles.item_member}>
          <div className={styles.member_logo}>
            <LazyImage src={require('images/activity/guide-new-user/logo_2.png')} alt="" />
          </div>
          <div className={styles.member_text}>
            <p className={styles.text_top}>意外保障</p>
            <p className={styles.text_bottom}>租机时遇到手机损坏问题，由享换机负责维修，维修过程中会提供备用机。</p>
          </div>
        </div>
        <div className={styles.item_member}>
          <div className={styles.member_logo}>
            <LazyImage src={require('images/activity/guide-new-user/logo_3.png')} alt="" />
          </div>
          <div className={styles.member_text}>
            <p className={styles.text_top}>隐私服务</p>
            <p className={styles.text_bottom}>享换机由FutureDial提供专业隐私擦除服务</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Disburden
