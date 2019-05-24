import { Button, Router } from 'components'
import React from 'react'
import styles from './Bottom.less'

export interface BottomProps {
  buttonUrl: string
}

const Bottom: React.FunctionComponent<BottomProps> = ({ buttonUrl }) => {
  const hanldeClickButton = () => {
    if (buttonUrl) {
      Router.push(buttonUrl).catch()
    } else {
      Router.push('/product/category').catch()
    }
  }
  return (
    <div className={styles.box}>
      <Button className={styles.btn} type="primary" onClick={hanldeClickButton}>
        立即下单
      </Button>
      <p>下单后将进行复审，您所享受的权益以复审结果为准</p>
    </div>
  )
}

export default Bottom
