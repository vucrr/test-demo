import { Button, Router } from 'components'
import React from 'react'
import styles from './Bottom.less'

export interface BottomProps {}

const Bottom: React.FunctionComponent<BottomProps> = ({}) => {
  const toLink = async () => {
    await Router.push('/enterprise/apply/center')
  }
  return (
    <div className={styles.bottom_box}>
      <p className={styles.text}>
        想为您的企业申请权益？<a href="https://jinshuju.net/f/U17Y4I">立即加入</a>
      </p>
      <Button className={styles.btn} safeArea={true} type="primary" onClick={toLink}>
        去认证，立享企业权益
      </Button>
    </div>
  )
}

export default Bottom
