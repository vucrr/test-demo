import { Flex } from 'antd-mobile'
import React from 'react'
import Box from './Box'
import styles from './RentPriceBox.less'

export interface RentPriceBoxProps {
  priceInfo: any
}

const RentPriceBox: React.FunctionComponent<RentPriceBoxProps> = ({ priceInfo }) => {
  return (
    <Box title="请确认租机方案">
      <Flex className={styles.line} align="center" justify="between">
        <div>租期</div>
        <div>{priceInfo.get('lease_term')}期</div>
      </Flex>
      <Flex className={styles.line} align="center" justify="between">
        <div>月租</div>
        <div>
          {priceInfo.get('is_show_term_line') && (
            <span className={styles.line_price}>￥{priceInfo.get('term_rent_line_price')}</span>
          )}
          ￥{priceInfo.get('term_rent_price')}
        </div>
      </Flex>
      <div className={styles.rent_price_tips}>
        第一期月租还款在签收后次月的同一自然日扣除，剩余每期还款时间间隔一个月。
      </div>
    </Box>
  )
}

// {couponList.map((item: any, key: number) => (
//   <List.Item className={classnames(styles.coupon_box, styles.item_box)} key={key}>
//     <Flex className={styles.item}>
//       <Item className="flex-box">
//         <img src={item.get('coupon_icon')} className={styles.icon_coupon} />
//         {item.get('coupon_title')}
//       </Item>
//       <span>-￥{item.get('coupon_price')}</span>
//     </Flex>
//   </List.Item>
// ))}

export default RentPriceBox
