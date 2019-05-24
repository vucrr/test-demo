import { Accordion, Flex, List } from 'antd-mobile'
import { withSource } from 'components'
import { SourceProps } from 'components/withSource'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel

const AccordionOne = ({ activeKey, onAccordionChange, utm }: AccordionProps & SourceProps) => {
  const BrandText = utm.get('brand')
  const AccordionOneData = [
    {
      key: 1,
      title: '1.什么是' + BrandText + '？',
      content: [
        '' +
          BrandText +
          '，国内领先的信用租机服务提供商，为用户提供“只为使用付费，不为残值买单”的电子产品消费新模式。用户仅需按月支付租金便可轻松获取手机的使用权，同时在租赁到期后' +
          BrandText +
          '为用户提供还机换新、续租、买断的灵活处理方式，为用户提供便捷的年年换新的用机服务。',
      ],
    },
    {
      key: 2,
      title: '2.怎么租机？',
      content: [
        '选择您心仪的机型，通过蚂蚁花呗或信用卡等方式冻结预授权。下单成功后，机器一般会在3-5天内邮寄给您。收到货后，每期进行扣款。',
      ],
    },
    {
      key: 3,
      title: '3.租机到期，机器怎么处理？',
      content: ['您有三种选择：归还机器、继续租用、买断机器。'],
    },
    {
      key: 4,
      title: '4.租比买有什么优势？',
      content: [
        ' • 租机可以解决机器更换时处理旧机的烦恼，可年年租最新款机器；',
        '• 租金仅需每期还款，大大减少一次性购买手机的资金压力；',
        '• 租机可以满足不同群体对手机的使用需求，环保共享，发挥最大价值。',
      ],
    },
  ]

  const isCmblife: any = {
    0: {
      key: 1,
      title: '1.什么是' + BrandText + '？',
      content: [
        '' +
          BrandText +
          '，国内领先的信用租机服务提供商，为用户提供“只为使用付费，不为残值买单”的电子产品消费新模式。用户仅需按月支付租金便可轻松获取手机的使用权，同时在租赁到期后' +
          BrandText +
          '为用户提供还机换新、买断等灵活处理方式，为用户提供便捷的年年换新的用机服务。',
      ],
    },
    1: {
      key: 2,
      title: '2.怎么租机？',
      content: [
        '选择您心仪的机型，通过招行信用卡冻结预授权。下单成功后，机器一般会在3-5天内邮寄给您。收到货后，每期进行扣款。',
      ],
    },
    2: {
      key: 3,
      title: '3.租机到期，机器怎么处理？',
      content: ['您可以选择归还机器，或买断机器'],
    },
    3: {
      title: '',
    },
  }
  if (utm.get('isCmblife')) {
    const key = Object.keys(isCmblife)
    key.forEach((item: any) => {
      AccordionOneData[item] = isCmblife[item]
    })
  }
  return (
    <List className={styles.itemTitle} renderHeader="租机规则">
      <Accordion className={styles.itemBox} accordion={true} activeKey={activeKey} onChange={onAccordionChange}>
        {AccordionOneData.map(item => {
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

export default withSource<AccordionProps>(AccordionOne)
