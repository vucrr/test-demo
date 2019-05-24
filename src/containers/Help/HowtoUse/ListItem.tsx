import { List } from 'antd-mobile'
import classnames from 'classnames'
import React from 'react'
import styles from './ListItem.less'

const Item = List.Item
const Brief = Item.Brief
const ListItemData = [
  {
    title: '选择喜欢的型号、使用时长',
    content: ['不同机型可选不同使用时长，6、12个月任您选。'],
  },
  {
    title: '押金0支付',
    content: ['无需支付现金，冻结预授权额度做押金；', '冻结额度不产生费用、无需还款、随还机释放。'],
  },
  {
    title: '月付租金',
    content: ['每月定期支付月租，资金无压力。'],
  },
  {
    title: '到期自动续租，可随时还机/买断',
    content: [
      '• 续租：申请续租，继续使用机器，方便灵活；',
      '• 归还：支持门店或邮寄归还；',
      '• 买断：支付机器尾款，终身拥有。',
    ],
  },
]
const isCmblife: any = {
  0: {
    title: '选择喜欢的型号',
    content: ['提供多种不同型号任您挑选。'],
  },
  3: {
    title: '到期可还机/买断',
    content: ['• 归还：支持门店或邮寄归还；', '• 买断：支付机器尾款，终身拥有。'],
  },
}
interface ListItemProps {
  utm: any
  inner: boolean
}
const ListItem = ({ inner = false, utm }: Partial<ListItemProps>) => {
  if (utm && utm.get('isCmblife')) {
    const key = Object.keys(isCmblife)
    key.forEach((item: any) => {
      ListItemData[item] = isCmblife[item]
    })
  }

  return (
    <List className={classnames(styles.list_box, !inner && styles.full)}>
      {ListItemData.map(
        (item, index): any => {
          return (
            <Item multipleLine={true} key={index}>
              <p className={styles.title}>
                <span className={styles.badge}>{index + 1}</span>
                {item.title}
              </p>
              {item.content.map((item2, index2) => {
                return <Brief key={index2}>{item2}</Brief>
              })}
            </Item>
          )
        },
      )}
    </List>
  )
}

export default ListItem
