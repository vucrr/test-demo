import { initTabBar } from 'actions/app'
import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { TrackEventTabBar } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { trackClickEvent } from 'utils/piwik'
import { delayHandle } from 'utils/tools'
import styles from './NewTabBar.less'
import { dicTractEvent } from './TabBar'

const Item = Flex.Item

const mapStateToProps = (state: any) => ({
  tabBar: state.getIn(['app', 'tabBar']),
  serverTabBar: state.getIn(['serverApp', 'tabBar']),
  navIcons: state.getIn(['app', 'navIcons', 'icons']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onInitTabBar: bindActionCreators(initTabBar, dispatch),
})

interface InjectProps {
  tabBar: any
  serverTabBar: any
  navIcons: any
  onInitTabBar: any
}

interface MyTabBarProps extends Partial<InjectProps> {
  hidden: boolean
  selectedTab?: string
}

interface MyTabBarState {
  curSelected?: string
}

class MyTabBar extends React.Component<MyTabBarProps, MyTabBarState> {
  static defaultProps = {
    hidden: false,
    selectedTab: '',
  }

  readonly state: Readonly<MyTabBarState> = {
    curSelected: this.props.selectedTab,
  }

  handlePress = (type: any) => async () => {
    this.setState({ curSelected: type })
    await delayHandle(0.15)
    const { serverTabBar } = this.props
    await Router.push(serverTabBar.getIn([type, 'link']))
    window.scrollTo(0, 0)
    trackClickEvent({
      category: TrackEventTabBar.Category,
      label: `${dicTractEvent[type]}`,
    })
  }

  render() {
    const { tabBar, serverTabBar, hidden, navIcons } = this.props
    const { curSelected } = this.state
    const show = tabBar.get('show')

    return (
      <Flex className={classnames(styles.tabbar_box, show && styles.show, !hidden && styles.fixed)}>
        {navIcons
          .filter((item: any) => !serverTabBar.getIn([item.get('key'), 'hide']))
          .map((item: any, key: number) => (
            <Item
              key={key}
              className={classnames(styles.item, curSelected === item.get('key') && styles.active)}
              onClick={this.handlePress(item.get('key'))}
            >
              <img
                className={styles.icon}
                src={curSelected === item.get('key') ? item.get('select_icon') : item.get('icon')}
              />
              <p>{item.get('text')}</p>
            </Item>
          ))}
      </Flex>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTabBar) as React.ReactType
