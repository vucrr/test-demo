import { Flex } from 'antd-mobile'
import { Icon } from 'components'
import React from 'react'
import styles from './Empty.less'

function Empty(props: { content: React.ReactNode }) {
  return (
    <Flex direction="column" justify="center" className={styles.container}>
      <Icon type={require('svg/warning-gray.svg')} className={styles.icon} />
      <p>{props.content}</p>
    </Flex>
  )
}

export default Empty
