import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import styles from './BreadCrumb.less'

export interface BreadCrumbProps {
  list: any
}

const BreadCrumb: React.FunctionComponent<BreadCrumbProps> = ({ list }) => {
  return (
    <Flex className={styles.list_box}>
      {list.map((item: any, key: number) => (
        <Flex.Item className={classnames(styles.item, item.get('is_show') && styles.active)} key={key}>
          <span>{item.get('step_title')}</span>
          {key < list.size - 1 && <Icon className={styles.right} type="right" />}
        </Flex.Item>
      ))}
    </Flex>
  )
}

export default BreadCrumb
