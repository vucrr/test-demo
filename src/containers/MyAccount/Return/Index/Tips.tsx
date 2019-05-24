import { List } from 'antd-mobile'
import { Icon } from 'components'
import Router from 'next/router'
import React from 'react'
import styles from './Tips.less'

const Item = List.Item
const Brief = Item.Brief

const forward = (route: string) => async () => {
  await Router.push(route)
}

interface TipsProps {
  via: string
}

const Tips = (props: TipsProps) => (
  <List className={styles.container}>
    <Item
      thumb={<Icon size="xs" type={require('svg/qsy-return-std.svg')} />}
      arrow="horizontal"
      onClick={forward('/myaccount/return/standard')}
    >
      还机标准
      <Brief>了解质检内容 还机更高效</Brief>
    </Item>
    <Item
      thumb={<Icon size="xs" type={require('svg/qsy-must-known.svg')} />}
      arrow="horizontal"
      onClick={forward('/myaccount/return/tips?via=' + props.via)}
    >
      还机须知
      <Brief>还机小贴士</Brief>
    </Item>
  </List>
)

export default Tips
