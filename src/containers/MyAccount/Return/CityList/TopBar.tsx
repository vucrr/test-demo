import { Flex } from 'antd-mobile'
import { withRouter } from 'next/router'
import React from 'react'
import styles from './TopBar.less'

interface TopBarProps {
  router?: any
}

const TopBar = (props: TopBarProps) => {
  if (!props.router.query.selected) return null
  return (
    <Flex align="center" className={styles.container}>
      {decodeURIComponent(props.router.query.selected)}
      <span>（已选城市）</span>
    </Flex>
  )
}
export default withRouter(TopBar)
