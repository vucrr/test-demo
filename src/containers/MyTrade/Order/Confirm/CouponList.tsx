import { Flex } from 'antd-mobile'
import React from 'react'
import Box from './Box'
import styles from './CouponList.less'

export interface CouponListProps {
  couponList: any
}

const CouponList: React.FunctionComponent<CouponListProps> = ({ couponList }) => {
  if (!couponList.size) return null

  return (
    <Box classNames={styles.coupon_list}>
      {couponList.map((item: any, key: number) => (
        <Flex justify="between" className={styles.item} key={key}>
          <Flex align="center" className={styles.left}>
            <img src={item.get('coupon_icon')} className={styles.icon_coupon} alt="" />
            {item.get('coupon_title')}
          </Flex>
          <div className={styles.price}>-￥{item.get('coupon_price')}</div>
        </Flex>
      ))}
    </Box>
  )
}

export default CouponList
