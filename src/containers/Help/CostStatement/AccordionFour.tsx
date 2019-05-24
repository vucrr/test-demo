import { Accordion, Flex, List } from 'antd-mobile'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel

const AccordionFourData = [
  {
    key: 12,
    title: '12.买断需要付多少钱？',
    content: [
      '用户在租赁到期可选择支付一定费用买断手机，买断费用以下单时协议里的买断价为准，也可以去订单详情的租赁信息中查看。',
    ],
  },
  {
    key: 13,
    title: '13.买断的金额可以分期付吗，付款方式是什么？',
    content: [
      '买断需一次性支付金额。',
      '• 若冻结预授权=买断金额，则预授权转消费；',
      '• 若冻结预授权>买断金额，则其中等于买断金额的预售前转消费，其余预授权释放给用户；',
      '• 若冻结预授权<买断金额，则全部预授权转消费后，剩余金额需一次性支付。',
    ],
  },
]
const isCmblife: any = {
  0: {
    key: 12,
    title: '9.租赁到期后怎么买断？',
    content: ['用户在租赁到期，招行信用卡中剩余冻结的享换机预授权金额会转为消费，进入招行账单。'],
  },
  1: {
    key: 11,
    title: '',
    content: [],
  },
}
const AccordionFour = ({ activeKey, onAccordionChange, utm }: AccordionProps) => {
  if (utm.get('isCmblife')) {
    const key = Object.keys(isCmblife)
    key.forEach((item: any) => {
      AccordionFourData[item] = isCmblife[item]
    })
  }
  return (
    <List className={styles.itemTitle} renderHeader="买断">
      <Accordion className={styles.itemBox} accordion={true} activeKey={activeKey} onChange={onAccordionChange}>
        {AccordionFourData.map(item => {
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

export default AccordionFour
