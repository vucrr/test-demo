import { Tabs } from 'antd-mobile'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import Router, { withRouter } from 'next/router'
import qs from 'querystring'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
// import { delayHandle } from 'utils/tools'
import styles from './Tab.less'

interface MyTabProps {
  initialPage: number
  router: { query: any }
}

interface MyTabState {
  curTab: number
}

const tabs = [{ title: '服务详情' }, { title: '下单记录' }, { title: '专属权益' }, { title: '还款计划' }]

const links = [
  '/myaccount/service/detail',
  '/myaccount/service/order-record',
  '/myaccount/service/privilege',
  '/myaccount/service/return-plan/list',
]

class MyTab extends React.Component<MyTabProps, MyTabState> {
  readonly state: Readonly<MyTabState> = {
    curTab: this.props.initialPage,
  }

  render() {
    const {
      initialPage,
      router: { query },
    } = this.props

    const tabProps: any = {
      tabs,
      initialPage,
      page: this.state.curTab,
      tabBarBackgroundColor: '#fff', // tabBar背景色
      tabBarInactiveTextColor: '#999',
      tabBarActiveTextColor: '#333', // tabBar激活Tab文字颜色
      tabBarUnderlineStyle: { border: '0.02rem solid #FE5649' }, // tabBar下划线样式
      onChange: (_: string, index: number) => {
        this.setState({ curTab: index }, async () => {
          // await delayHandle(0.25)
          trackClickEvent(TrackEventMyCenter.Table)
          await Router.push(`${links[index]}?${qs.stringify(query)}`)
        })
      },
    }

    return (
      <div className={styles.tab_box}>
        <Tabs {...tabProps} />
      </div>
    )
  }
}

export default withRouter<MyTabProps>(MyTab as any)
