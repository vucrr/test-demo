import { Flex, Modal } from 'antd-mobile'
// import classnames from 'classnames'
import { Button } from 'components'
import React from 'react'
import styles from './BottomBox.less'

const alert = Modal.alert
const Item = Flex.Item

const BottomBox = () => {
  const handleClick = () => {
    alert(
      '买断确认',
      '提交买断申请后不可取消哦，你确认要买断吗？',
      [
        { text: '暂不提交' },
        {
          text: '提交',
          // onPress: () => {
          //   console.log('1')
          // },
        },
      ],
      'android',
    )
  }

  return (
    <Flex className={styles.bottom_box}>
      <div className={styles.left}>
        支付金额<span>￥600</span>
      </div>
      <Item>
        <Button fixed={true} type="primary" onClick={handleClick}>
          立即支付
        </Button>
      </Item>
    </Flex>
  )
}

export default BottomBox
