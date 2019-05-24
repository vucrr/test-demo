import { withAuth } from 'components'
import { AuthProps } from 'components/withAuth'
import React from 'react'
import styles from './Coupon.less'

interface CouponProps {
  title: string
  type: number
  click: Function
  readyClick: boolean
}

class Coupon extends React.Component<CouponProps & AuthProps> {
  handleClick = async () => {
    const { auth } = this.props
    if (!auth.get('isLogin')) {
      location.href = `/account/login?redirect=${encodeURIComponent('/activitys/exchange-coupon?readyClick=true')}`
    } else {
      if (this.props.readyClick === false) {
        this.props.click()
      }
    }
  }
  render() {
    const { title, type } = this.props
    return (
      <div className={styles.coupon}>
        <div className={styles.couponbg} />
        <p className={styles.tit}>老用户尊享</p>
        <div className={styles.couponCon} onClick={() => this.handleClick()}>
          <p className={styles.couponTit}>
            <span className={styles.couponPrice}>{title}元</span>优惠券
          </p>
          <p className={styles.couponTips}>全场通用 租机立减</p>
          <div className={type === 1 ? styles.couponBtn : styles.couponUnBtn}>
            {type === 2 ? '您已领取' : '立即领取'}
          </div>
        </div>
        <img className={styles.couponImg} src={require('images/activitys/ExchangeCoupon/couponimg.png')} alt="" />
      </div>
    )
  }
}

export default withAuth(Coupon)
