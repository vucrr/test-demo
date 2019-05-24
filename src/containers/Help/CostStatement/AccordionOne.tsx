import { Accordion, Flex, List } from 'antd-mobile'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel

const AccordionOne = ({ activeKey, onAccordionChange, utm }: AccordionProps) => {
  const BrandText = utm.get('brand')
  const AccordionOneData = [
    {
      key: 1,
      title: '1.租机时需要支付哪些费用？',
      content: [
        '租机费用包括：',
        '• 租金（含设备折旧费，信用评估、质检、物流等服务费）；',
        '• 押金（根据信用评估情况可减免）；',
        '• 意外维修服务费（' + BrandText + '为每个租机用户定制意外维修服务，每个机器的费用不同）。',
      ],
    },
    {
      key: 2,
      title: '2.租机时怎么支付租金？',
      content: [
        '用户需按月支付租金，' + BrandText + '目前支持两种租金扣款方式。',
        '1.支付宝代扣：用户与' +
          BrandText +
          '签订支付宝代扣协议，' +
          BrandText +
          '每月自动从用户支付宝账号扣除相应租金。',
        '2.资金预授权转消费：对于信用卡用户' + BrandText + '每月自动从用户预授权中扣除相应租金。',
      ],
    },
    {
      key: 3,
      title: '3.租机时怎么支付押金？',
      content: [
        '押金无需用户支付，只需要冻结花呗或信用卡预授权进行信用担保，每期还款租金，押金无需还款。手机归还后，释放花呗或信用卡的额度。',
      ],
    },
    {
      key: 4,
      title: '4.租机时怎么支付意外维修服务费？',
      content: [
        '部分商品在租赁时，需要用户购买一份手机意外维修服务，享受租赁期间手机意外损伤免费维修服务，该费用在租赁第一期和租金一起一次性收取。',
      ],
    },
    {
      key: 5,
      title: '5.什么是预授权？',
      content: [
        '用户在' +
          BrandText +
          '下单需要进行信用担保，信用担保有助于用户通过信用评估，信用担保方式为资金预授权，通过冻结用户第三信用账户（信用卡/花呗）额度实现，资金预授权冻结的额度不产生实际消费，无需还款。' +
          BrandText +
          '支持信用卡预授权与花呗预授权两种资金预授权方式。',
      ],
    },
    {
      key: 6,
      title: '6.什么是租金预付？',
      content: [
        '用户在' +
          BrandText +
          '下单时，可能会被要求预先支付前数个月的租金，支付后后续该几个月的租金便不会被代扣，会有预先支付的租金来抵扣。如用户存在退货、退款等行为，预付租金将会退还到原账户中；',
      ],
    },
  ]

  const isCmblife: any = {
    0: {
      key: 1,
      title: '1.租机时需要支付哪些费用？',
      content: ['租机费用包括：', '• 租金（含设备折旧费，信用评估、质检、物流等服务费）；', '• 押金；'],
    },
    1: {
      key: 2,
      title: '2.租机时怎么支付租金？',
      content: ['' + BrandText + '每月自动从用户预授权中扣除相应租金'],
    },
    2: {
      key: 3,
      title: '3.租机时怎么支付押金？',
      content: [
        '押金无需用户支付，只需要冻结用户招商银行信用卡预授权进行信用担保，每期还款租金，押金无需还款。手机归还后，释放信用卡的额度。',
      ],
    },
    3: {
      title: '',
    },
    4: {
      key: 5,
      title: '4.什么是预授权？',
      content: [
        '用户在' +
          BrandText +
          '下单需要进行信用担保，信用担保有助于用户通过信用评估，信用担保方式为资金预授权，通过冻结用户招行信用账户额度实现，资金预授权冻结的额度不产生实际消费，无需还款。',
      ],
    },
  }

  if (utm.get('isCmblife')) {
    const key = Object.keys(isCmblife)
    key.forEach((item: any) => {
      AccordionOneData[item] = isCmblife[item]
    })
  }
  return (
    <List className={styles.itemTitle} renderHeader="租机">
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

export default AccordionOne
