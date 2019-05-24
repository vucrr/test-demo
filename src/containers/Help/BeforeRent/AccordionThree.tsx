import { Accordion, Flex, List } from 'antd-mobile'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel

const AccordionOne = ({ activeKey, onAccordionChange, utm }: AccordionProps) => {
  if (utm.get('isCmblife')) {
    return <></>
  }
  return (
    <List className={styles.itemTitle} renderHeader="机器">
      <Accordion className={styles.itemBox} accordion={true} activeKey={activeKey} onChange={onAccordionChange}>
        <Panel key="9" header="9.下单时花呗或者信用卡的冻结额度不够怎么办？？" id="question9">
          <Flex wrap="wrap" className={styles.item_box}>
            <p>
              花呗额度不够，可以通过信用评估减免押金；信用卡额度不够，请联系您的发卡行提升额度。冻结额度在到期后即可退还。
            </p>
          </Flex>
        </Panel>
      </Accordion>
    </List>
  )
}

export default AccordionOne
