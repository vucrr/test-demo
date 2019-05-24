import { Flex } from 'antd-mobile'
import React from 'react'
import styles from './StepBox.less'

export interface StepBoxProps {}

const StepBox: React.FunctionComponent<StepBoxProps> = ({}) => {
  return (
    <div className={styles.step_box}>
      <h5>认证企业员工，下单即享福利</h5>
      <Flex className={styles.box} justify="between" align="center">
        <div className={styles.item}>
          <Flex className={styles.num} justify="center">
            1
          </Flex>认证企业员工
        </div>
        <span>>>></span>
        <div className={styles.item}>
          <Flex className={styles.num} justify="center">
            2
          </Flex>选择机型
        </div>
        <span>>>></span>
        <div className={styles.item}>
          <Flex className={styles.num} justify="center">
            3
          </Flex>下单享福利
        </div>
      </Flex>
      <p className={styles.desc}>在职期间换新机，可继续享受下单福利</p>
    </div>
  )
}

export default StepBox
