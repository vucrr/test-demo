import React, { Fragment } from 'react'
import classnames from 'classnames'
import { Flex } from 'antd-mobile'
import propTypes from 'prop-types'
import { Link } from 'components'
import styles from './Top.less'

const Item = Flex.Item

const Top = ({ userInfo }) => {
  Top.propTypes = {
    userInfo: propTypes.object.isRequired,
  }
  const phone = `${userInfo.get('phone').substring(0, 3)}****${userInfo.get('phone').substring(7)}`
  const userBalance = (userInfo.get('user_balance') / 100).toFixed(2)
  return (
    <Fragment>
      <Flex className={styles.top1_box} align="center">
        <Item className={styles.left}>
          <span className={styles.greeting}>您好！</span>
          <span className={styles.mobile}>{phone}</span>
        </Item>
        <Item className={styles.right}>
          <Link native to="/account/info-new" className={classnames(styles.btn)}>
            账户设置
          </Link>
        </Item>
      </Flex>
      <div className={styles.top2_box} align="center">
        <Flex className={styles.top2_center}>
          <Item>
            <Link to="/account/balance" native>
              <p>{userBalance}</p>
              <span>余额(元)</span>
            </Link>
          </Item>
          <Item>
            <Link to="/account/couponlist" native>
              <p>{userInfo.get('coupon_list_count')}</p>
              <span>卡券(个)</span>
            </Link>
          </Item>
        </Flex>
      </div>
    </Fragment>
  )
}

export default Top
