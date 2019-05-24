import { Accordion, Flex, List } from 'antd-mobile'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel

const AccordionOne = ({ activeKey, onAccordionChange, utm }: AccordionProps) => {
  if (utm.get('isCmblife')) {
    return <></>
  }
  return (
    <List renderHeader="续租">
      <Accordion accordion={true} activeKey={activeKey} onChange={onAccordionChange}>
        <Panel key="9" header="9.我的订单怎么进行续租？" id="question8">
          <Flex wrap="wrap" className={styles.item_box}>
            <p>未开启自动续租用户：在我的订单列表，找到续租入口，开启自动续租即可继续使用机器。</p>
            <p>
              已开启自动续租用户：租赁到期后会进入自动续租，不需要您进行操作，您可以以更低的租金享受机器，也可以随时还机或买断机器。
            </p>
          </Flex>
        </Panel>
        <Panel key="10" header="10.一笔订单可以续租多久？" id="question9">
          <Flex wrap="wrap" className={styles.item_box}>
            <p>自动续租最大时长一般为6-20个月。续租期满后，设备就归您所有，无需再付费。</p>
          </Flex>
        </Panel>
      </Accordion>
    </List>
  )
}

export default AccordionOne
