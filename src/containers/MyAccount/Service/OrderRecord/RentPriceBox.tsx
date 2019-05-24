import { Flex } from 'antd-mobile'
import React from 'react'
import Box from './Box'
import styles from './RentPriceBox.less'

interface RentPriceBoxProps {
  priceInfo: any
}

const RentPriceBoxs: React.FunctionComponent<RentPriceBoxProps> = ({ priceInfo }) => {
  return (
    <Box title="租金费用">
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
      <div className={styles.rent_price_tips}>{priceInfo.get('lease_price_text')}</div>
    </Box>
  )
}

export default RentPriceBoxs
