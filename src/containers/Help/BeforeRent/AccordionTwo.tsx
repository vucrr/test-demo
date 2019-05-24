import { Accordion, Flex, List } from 'antd-mobile'
import { BrandText, withSource } from 'components'
import { SourceProps } from 'components/withSource'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel

const AccordionOne = ({ activeKey, onAccordionChange, utm }: AccordionProps & SourceProps) => {
  const brand = utm.get('brand')
  return (
    <List className={styles.itemTitle} renderHeader="机器">
      <Accordion className={styles.itemBox} accordion={true} activeKey={activeKey} onChange={onAccordionChange}>
        <Panel key="5" header={'5.' + brand + '提供的机器是全新的吗？'} id="question5">
          <Flex wrap="wrap" className={styles.item_box}>
            <p>
              我们有全新机和二手机器，满足不同人群对机器的需求。机器均是官方正品，二手机有轻微使用痕迹，屏幕显示正常，无功能异常。
            </p>
          </Flex>
        </Panel>
        <Panel key="6" header="6.除了线上的机型，还有其他机型吗？" id="question6">
          <Flex wrap="wrap" className={styles.item_box}>
            <p>
              现有机型都是市场最热机型，若没有您想要的机型您可以向我们的客服反馈，我们会尽量满足你们的需求哦，您也可以持续关注<BrandText />，我们会持续更新机型，敬请期待。
            </p>
          </Flex>
        </Panel>
        <Panel key="7" header="7.二手机器的成色怎么样？" id="question7">
          <Flex wrap="wrap" className={styles.item_box}>
            <p>
              成色良好，我们会标注为几成新，机器已经拆封激活，外壳有轻微使用痕迹（即轻微磨损或划痕），屏幕正常显示，无功能异常。
            </p>
          </Flex>
        </Panel>
        <Panel key="8" header="8.二手机器有配件吗？" id="question8">
          <Flex wrap="wrap" className={styles.item_box}>
            <p>我们提供非原装充电器和数据线，其他配件均不提供。</p>
          </Flex>
        </Panel>
      </Accordion>
    </List>
  )
}

export default withSource<AccordionProps>(AccordionOne)
