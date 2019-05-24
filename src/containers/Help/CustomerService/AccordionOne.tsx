import { Accordion, Flex, List } from 'antd-mobile'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel

const AccordionOne = ({ activeKey, onAccordionChange, utm }: AccordionProps) => {
  const BrandText = utm.get('brand')
  const AccordionOneData = [
    {
      key: 1,
      title: '1.什么是意外维修服务？',
      content: [
        '若用户购买了意外维修服务，在收到机器的15天后，如果手机发现碎屏、进水、漏液、无法关机等人为不小心造成的问题时，可申请维修，若经质检工程师判断符合意外维修服务范围，可免费维修，维修费用累计不超过机器保额上限。如果不符合意外维修服务条件的，' +
          BrandText +
          '提供非人为的功能性问题维修。',
      ],
    },
    {
      key: 2,
      title: '2.手机坏了如何享受意外维修服务？',
      content: [
        '若用户购买了意外维修服务，您可在“我的”→“售后维修”→“维修申报”页面进行申报，损坏不同，维修方式也不同，但都需确认信息后，由专业的维修服务公司为您提供维修服务。',
      ],
    },
    {
      key: 3,
      title: '3.机器多久可以维修完成？',
      content: [
        '我们在收到手机后进行检查，会根据不同的问题进行维修，官方维修时长在15-20个工作日左右，具体以维修情况为准！维修期间我们支持您申请备用机。',
      ],
    },
    {
      key: 4,
      title: '4.维修寄出的运费是由谁支付的？',
      content: ['维修寄出的运费由寄出的一方承担，维修完成寄回的费用由我们来承担哦。'],
    },
    {
      key: 5,
      title: '5.怎么申请备用机？',
      content: ['您可以在维修申报页面申请备用机；也可以通过联系客服来申请备用机。'],
    },
    {
      key: 6,
      title: '6.备用机收费吗？',
      content: [
        '备用机仅收取机器押金，且在您寄回备用机后，我们将全额退回您的押金。',
        '以下特殊情况可能会收取您的费用：',
        '情况一：若机器在您的使用期间，有严重损坏，则需要赔偿相应的金额',
        '情况二：若恶意不归还备用机，则会要求您强制买断',
      ],
    },
  ]

  const isCmblife: any = {
    0: {
      key: 1,
      title: '1.什么是意外维修服务？',
      content: [
        '若用户租机时获赠了意外维修服务，在收到机器的15天后，如果手机发现碎屏、进水、漏液、无法关机等人为不小心造成的问题时，可申请维修，若经质检工程师判断符合意外维修服务范围，可免费维修，维修费用累计不超过机器保额上限。如果不符合意外维修服务条件的，' +
          BrandText +
          '提供非人为的功能性问题维修。',
      ],
    },
    1: {
      key: 2,
      title: '2.手机坏了如何享受意外维修服务？',
      content: [
        '若用户租机时获赠了意外维修服务，您可在“我的”→“售后维修”→“维修申报”页面进行申报，损坏不同，维修方式也不同，但都需确认信息后，由专业的维修服务公司为您提供维修服务。',
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
    <List className={styles.itemTitle} renderHeader="维修">
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
