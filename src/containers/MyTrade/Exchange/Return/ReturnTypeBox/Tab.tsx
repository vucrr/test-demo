import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import { tabStatus } from '.'
import styles from './Tab.less'

const Item = Flex.Item

export interface TabProps {
  tab: tabStatus
  onChange(tab: tabStatus): void
  info: any
}

const Tab: React.FunctionComponent<TabProps> = ({ tab, onChange, info }) => {
  return (
    <Flex className={styles.tab_box}>
      {info.getIn(['return_type', 'store', 'is_show']) && (
        <Item className={classnames(styles.tab, tab === 1 && styles.active)} onClick={() => onChange(1)}>
          <Icon type={require('svg/store.svg')} />
          <span>门店还机</span>
        </Item>
      )}
      {info.getIn(['return_type', 'mail', 'is_show']) && (
        <Item className={classnames(styles.tab, tab === 2 && styles.active)} onClick={() => onChange(2)}>
          <Icon type={require('svg/car.svg')} />
          <span>邮寄还机</span>
        </Item>
      )}
    </Flex>
  )
}

export default Tab
