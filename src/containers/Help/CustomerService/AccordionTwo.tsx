import { Accordion, Flex, List } from 'antd-mobile'
import { BrandText } from 'components'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel

const AccordionOne = ({ activeKey, onAccordionChange }: AccordionProps) => {
  return (
    <List className={styles.itemTitle} renderHeader="退款&退货">
      <Accordion className={styles.itemBox} accordion={true} activeKey={activeKey} onChange={onAccordionChange}>
        <Panel key="7" header="7.什么样的机器才可以申请退货？" id="question5">
          <Flex wrap="wrap" className={styles.item_box}>
            <p>
              全新机未拆封未激活，或签收后七日内设备有非人为因素造成的质量问题，可以申请退货。二手机器7天内经质检工程师检测符合退货标准的可以申请退货。如私自拆机、碎屏、root、漏液、机身分离、进水等人为损坏的情况，无法退货。
            </p>
          </Flex>
        </Panel>
        <Panel key="8" header="8.什么样的机器才可以申请换货？" id="question6">
          <Flex wrap="wrap" className={styles.item_box}>
            <p>
              签收后15日内，二手设备有非人为因素造成的质量问题，安卓全新设备未拆封未激活或有非人为因素造成的质量问题支持换货，苹果全新设备有非人为因素造成的质量问题，寄回<BrandText />维修。机器寄回后，若经质检工程师检测符合换货标准，我们会在3-5个工作日安排换货。若不符合换货标准，我们将原地址寄回。
            </p>
          </Flex>
        </Panel>
        <Panel key="9" header="9.退货的机器什么时候进行退款？" id="question7">
          <Flex wrap="wrap" className={styles.item_box}>
            <p>
              我们会在退货机器签收后的2个工作日内完成质检，如果您符合退货条件，我们会在1个工作日内操作退款。请您先将机器的所有密码都解除，如果不符合退货条件的，我们会客服联系您。
            </p>
          </Flex>
        </Panel>
        <Panel key="10" header="10.退货的运费是由谁承担的？" id="question8">
          <Flex wrap="wrap" className={styles.item_box}>
            <p>退货的运费是由您自行承担的哦。</p>
          </Flex>
        </Panel>
        <Panel
          className={styles.panel_extra}
          key="11"
          header="11.在合约期内机器不想用了可以退货换其他型号的机器吗？"
          id="question9"
        >
          <Flex wrap="wrap" className={styles.item_box}>
            <p>非常抱歉，合约期内暂时不支持改换其他型号的机器。</p>
          </Flex>
        </Panel>
      </Accordion>
    </List>
  )
}

export default AccordionOne
