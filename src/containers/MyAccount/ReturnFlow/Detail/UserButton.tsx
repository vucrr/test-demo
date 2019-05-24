import { Flex, Toast } from 'antd-mobile'
import { Button } from 'components'
import { withRouter } from 'next/router'
import React from 'react'
import styles from './UserButton.less'

const Item = Flex.Item
const UserButton = (props: any) => {
  const handleClick = async () => {
    const data = await props.onPayReturnFlow({ query: props.query })
    if (data && data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      window.location.href = data
    }
  }
  if (props.isPay) {
    return (
      <Flex className={styles.button}>
        <Button fixed={true} type="primary" className={styles.user_button} onClick={handleClick}>
          确定
        </Button>
      </Flex>
    )
  }
  return (
    <Flex className={styles.button}>
      <div className={styles.user_payba}>
        支付金额<span>￥{props.actualReturnPrice}</span>
      </div>
      <Item>
        <Button fixed={true} type="primary" className={styles.user_button} onClick={handleClick}>
          立即支付
        </Button>
      </Item>
    </Flex>
  )
}
export default withRouter(UserButton)
