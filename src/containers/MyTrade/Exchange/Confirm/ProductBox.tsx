import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import React from 'react'
import Lottie from 'react-lottie'
import styles from './ProductBox.less'

const Item = Flex.Item

export interface Props {
  new_tips_info: any
  old_tips_info: any
}

const TimeBox: React.FunctionComponent<Props> = ({ new_tips_info, old_tips_info }) => {
  return (
    <Flex className={styles.time_box}>
      <Item>
        <span>{old_tips_info.get('text')}</span>
        <p>{old_tips_info.get('debit_date')}</p>
      </Item>
      <Item>
        <span>{new_tips_info.get('text')}</span>
        <p>{new_tips_info.get('debit_date')}</p>
      </Item>
    </Flex>
  )
}

export interface ProductBoxProps {
  sku_info: any
  new_tips_info: any
  old_tips_info: any
}

const ProductBox: React.FunctionComponent<ProductBoxProps> = ({ sku_info, new_tips_info, old_tips_info }: any) => {
  const lottieProps = {
    options: {
      loop: true,
      autoplay: true,
      animationData: require('json/exchange-right.json'),
    },
    width: 20,
    height: 20,
  }
  return (
    <div className={styles.product_box}>
      <div className={styles.title}>请确认换新订单明细</div>
      <Flex className={styles.product}>
        <Item className={styles.item}>
          <span className={styles.old}>{old_tips_info.get('tips')}</span>
          <img src={old_tips_info.get('sku_img_url')} />
          <p className={styles.desc}>{old_tips_info.get('sku_name')}</p>
        </Item>
        <div className={styles.lottie_icon}>
          <Lottie {...lottieProps} />
        </div>
        <Item className={classnames(styles.item, styles.new)}>
          <span className={styles.tag}>{new_tips_info.get('tips')}</span>
          <img src={sku_info.get('sku_img_url')} />
          <p className={styles.desc}>{sku_info.get('sku_name')}</p>
        </Item>
      </Flex>
      <TimeBox new_tips_info={new_tips_info} old_tips_info={old_tips_info} />
    </div>
  )
}

export default ProductBox
