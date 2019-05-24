import { Accordion, Flex, List } from 'antd-mobile'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel
const AccordionThreeData = [
  {
    key: 10,
    title: '10.续租租金和租机时的租金是一样的吗？',
    content: ['租赁到期自动续租，每月以更低的价格使用机器。'],
  },
  {
    key: 11,
    title: '11.续租需要再次冻结押金吗？',
    content: [
      '花呗用户：续租时不需要再次冻结预授权，继续用租机时冻结的预授权作为信用担保。',
      '信用卡用户：当您打开自动续租时，需要冻结与买断价相同金额的花呗额度。信用卡冻结额度将在您原租期满后7个工作日内自动释放。',
    ],
  },
]

const AccordionThree = ({ activeKey, onAccordionChange, utm }: AccordionProps) => {
  if (utm.get('isCmblife')) {
    return <></>
  }
  return (
    <List className={styles.itemTitle} renderHeader="续租">
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
