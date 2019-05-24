import { Flex } from 'antd-mobile'
import React from 'react'
import styles from './State.less'

export interface StateProps {
  authorizeInfo: any
  stepDoc: any
}

const State: React.FunctionComponent<StateProps> = ({ authorizeInfo, stepDoc }) => {
  return (
    <div className={styles.stateBox}>
      <Flex justify="center" align="center">
        <img src={authorizeInfo.get('icon')} />
        您已选择{authorizeInfo.get('name')}
      </Flex>
      <p>{stepDoc}</p>
    </div>
  )
}

export default State
