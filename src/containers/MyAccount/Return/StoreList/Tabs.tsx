import { Tabs } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import styles from './Tabs.less'

interface MyTabsProps {
  tabs: any
  onChange: Function
  index: number
  isQsy: boolean
}

class MyTabs extends React.Component<MyTabsProps> {
  readonly state = {
    show: false,
    tab: this.props.tabs[this.props.index],
    index: this.props.index,
  }

  onClickAddress = (tab: any) => {
    const index = this.props.tabs.findIndex((t: { value: number }) => t.value === tab.value)
    this.setState({ show: false, tab, index })
    this.props.onChange(tab)
  }

  toggleDialog = () => {
    this.setState({ show: !this.state.show })
  }

  onChangeTab = (tab: any) => {
    const index = this.props.tabs.findIndex((t: { value: number }) => t.value === tab.value)
    this.setState({ tab, index })
    this.props.onChange(tab)
  }

  renderTabs() {
    if (this.state.show) return
    const tabProps = this.props.isQsy
      ? {}
      : {
          tabBarActiveTextColor: '#ff5544', // tabBar 激活 Tab 文字颜色
          tabBarUnderlineStyle: { border: '1px solid #ff5544' }, // tabBar 下划线样式
        }
    return (
      <div className={styles.container}>
        <Tabs
          tabs={this.props.tabs}
          initialPage={this.props.index}
          page={this.state.index}
          onTabClick={this.onChangeTab}
          {...tabProps}
        />
        <div className={styles.toggleBtn} onClick={this.toggleDialog}>
          <Icon className={styles.icon} size="xxs" type={require('svg/arrow-left.svg')} />
        </div>
      </div>
    )
  }

  renderDialog() {
    if (!this.state.show) return
    return (
      <div className={styles.wrapper}>
        <div className={styles.title} onClick={this.toggleDialog}>
          <span>选择地区</span>
          <Icon className={styles.icon} size="xxs" type={require('svg/arrow-left.svg')} />
        </div>
        <div className={classnames(styles.tags, !this.props.isQsy && styles.xhj_tags)}>
          {this.props.tabs.map((item: { title: string }, index: number) => {
            return (
              <div
                className={classnames(
                  styles.tag,
                  this.state.tab.title === item.title && styles.active,
                  !this.props.isQsy && styles.xhj_tags,
                )}
                key={index}
                onClick={() => this.onClickAddress(item)}
              >
                {item.title}
              </div>
            )
          })}
        </div>
        <div className={styles.mask} onClick={this.toggleDialog} />
      </div>
    )
  }

  render() {
    return (
      <>
        {this.renderTabs()}
        {this.renderDialog()}
      </>
    )
  }
}

export default MyTabs
