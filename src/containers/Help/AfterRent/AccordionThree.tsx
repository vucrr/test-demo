import { Accordion, Flex, List } from 'antd-mobile'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel
const AccordionThreeData = [
  {
    key: 11,
    title: '11.我的订单怎么进行买断？',
    content: [
      '订单到期时间≤30天时可以进行买断操作。',
      '在“个人中心”→“我的订单”→找到符合条件的订单，点击买断按钮，在确认买断页面确认买断金额等信息后完成买断。',
    ],
  },
  {
    key: 12,
    title: '12.什么情况下需要买断？',
    content: [
      '情况一：机器未在租期满后7个自然日内归还者系统自动为用户买断；',
      '情况二：经过工程师检测，不符合正常归还标准的机器，需用户买断机器，自己拥有；',
      '情况三：用户自主买断机器。',
    ],
  },
]
const isCmblife: any = {
  0: {
    key: 10,
    title: '8.我的订单怎么进行买断？',
    content: [
      '订单到期时间≤30天时可以进行买断操作。',
      '在“个人中心”→“我的订单”→找到符合条件的订单，点击买断按钮，在确认买断页面确认买断金额等信息后完成买断。',
    ],
  },
  1: {
    key: 11,
    title: '9.什么情况下需要买断？',
    content: [
      '情况一：机器未在租期满后7个自然日内归还者系统自动为用户买断；',
      '情况二：经过工程师检测，不符合正常归还标准的机器，需用户买断机器，自己拥有；',
      '情况三：用户自主买断机器。',
    ],
  },
}
const AccordionThree = ({ activeKey, onAccordionChange, utm }: AccordionProps) => {
  if (utm.get('isCmblife')) {
    const key = Object.keys(isCmblife)
    key.forEach((item: any) => {
      AccordionThreeData[item] = isCmblife[item]
    })
  }
  return (
    <List className={styles.itemTitle} renderHeader="买断">
      <Accordion className={styles.itemBox} accordion={true} activeKey={activeKey} onChange={onAccordionChange}>
        {AccordionThreeData.map(item => {
          if (item.title === '') {
            return ''
          }
          return (
            <Panel key={item.key} header={item.title} id={'question' + item.key}>
              <Flex wrap="wrap" className={styles.item_box}>
                {item.content.map((item2, index2) => {
                  return <p key={item.key + index2}>{item2}</p>
                })}
              </Flex>
            </Panel>
          )
        })}
      </Accordion>
    </List>
  )
}

export default AccordionThree
