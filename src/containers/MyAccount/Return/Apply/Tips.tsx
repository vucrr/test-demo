import { List } from 'antd-mobile'
import { TrackEventMyAccountReturn } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './Tips.less'

const Item = List.Item
const Brief = Item.Brief

const forward = (route: string, trackClick: any) => async () => {
  trackClickEvent(trackClick)
  await Router.push(route)
}

interface TipsProps {
  via: string
}
const trackEvent1 = {
  label: `${TrackEventMyAccountReturn.Apply.name7}`,
  category: TrackEventMyAccountReturn.Apply.category,
}
const trackEvent2 = {
  label: `${TrackEventMyAccountReturn.Apply.name8}`,
  category: TrackEventMyAccountReturn.Apply.category,
}

const Tips = (props: TipsProps) => (
  <List className={styles.container}>
    <Item arrow="horizontal" onClick={forward('/myaccount/return/standard', trackEvent1)}>
      还机标准
      <Brief>了解质检内容 还机更高效</Brief>
    </Item>
    <Item arrow="horizontal" onClick={forward('/myaccount/return/tips?via=' + props.via, trackEvent2)}>
      还机须知
      <Brief>重要事宜 还机必看</Brief>
    </Item>
  </List>
)

export default Tips
