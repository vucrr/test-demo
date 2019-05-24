import { Accordion, Flex, List } from 'antd-mobile'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel

const AccordionTwo = ({ activeKey, onAccordionChange, utm }: AccordionProps) => {
  const BrandText = utm.get('brand')
  const AccordionTwoData = [
    {
      key: 7,
      title: '7.扣款周期是多久？',
      content: [
        '支付方式不同，扣款周期也不同。',
        '• 如果您选择的是蚂蚁花呗或支付宝代扣支付，每期周期为1个月，总期数视租赁周期而定。',
        '• 如果您选择的是信用卡支付，每期周期为25天，总期数视租赁周期而定。',
      ],
    },
    {
      key: 8,
      title: '8.每月什么时候还款？',
      content: [
        '不同支付方式，还款时间不同。',
        '• 支付宝代扣支付：用户收货日往后推1个月为第一个还款日，剩余周期的还款日往后退每月/次。',
        '• 信用卡支付：首期下单成功即扣一期租金，剩余周期的还款日以信用卡还款日为准。',
      ],
    },
    {
      key: 9,
      title: '9.信用卡还款为什么有时一个月会有2笔还款账单？',
      content: [
        '信用卡1个月为一个还款周期，' +
          BrandText +
          '用信用卡冻结额度，25天为一个扣款周期，所以有时会产生一个月有2笔还款账单的现象。',
      ],
    },
  ]
  const isCmblife: any = {
    0: {
      key: 7,
      title: '7.扣款周期是多久？',
      content: ['招行信用卡每期周期为1个月，总期数为13个月。'],
    },
    1: {
      key: 8,
      title: '8.每月什么时候还款？',
      content: [
        '设备签收后三个工作日内，首月租金从冻结的招行信用卡预授权中扣除，转为一笔消费记录，进入您信用卡当月账单，同时解冻对应金额的预授权；之后每月租金都将作为一笔消费记录（日期同首月），进入您当月信用卡账单；您当月信用卡账单已还，即视为租金已还款。',
      ],
    },
    2: {
      title: '',
    },
  }
  if (utm.get('isCmblife')) {
    const key = Object.keys(isCmblife)
    key.forEach((item: any) => {
      AccordionTwoData[item] = isCmblife[item]
    })
  }
  return (
    <List className={styles.itemTitle} renderHeader="还款">
      <Accordion className={styles.itemBox} accordion={true} activeKey={activeKey} onChange={onAccordionChange}>
        {AccordionTwoData.map(item => {
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

export default AccordionTwo
