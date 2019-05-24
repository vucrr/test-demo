import { fetchNavIcons, initTabBar } from 'actions/app'
import { TabBar } from 'antd-mobile'
import classnames from 'classnames'
import { TrackEventTabBar } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { trackClickEvent } from 'utils/piwik'
import NewTabBar from './NewTabBar'
import styles from './TabBar.less'

const Item = TabBar.Item

const mapStateToProps = (state: any) => ({
  tabBar: state.getIn(['app', 'tabBar']),
  serverTabBar: state.getIn(['serverApp', 'tabBar']),
  navIcons: state.getIn(['app', 'navIcons', 'icons']),
  isFestival: state.getIn(['app', 'navIcons', 'is_festival']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onInitTabBar: bindActionCreators(initTabBar, dispatch),
  onFetchNavIcons: bindActionCreators(fetchNavIcons, dispatch),
})

interface InjectProps {
  tabBar: any
  serverTabBar: any
  isFestival: number
  onInitTabBar: any
  navIcons: any
  onFetchNavIcons: any
}

interface MyTabBarProps extends Partial<InjectProps> {
  hidden: boolean
  selectedTab?: string
}

export const dicTractEvent: { [key: string]: string } = {
  home: 'HomeIcon',
  product: 'ClassfyIcon',
  myCenter: 'MineIcon',
}

class MyTabBar extends React.Component<MyTabBarProps> {
  static defaultProps = {
    hidden: false,
    selectedTab: '',
  }

  async componentDidMount() {
    const { hidden, selectedTab, navIcons, onInitTabBar, onFetchNavIcons } = this.props
    navIcons.size === 0 && (await onFetchNavIcons())
    onInitTabBar({ selectedTab, show: !hidden })
  }

  handlePress = (type: any) => async () => {
    const { serverTabBar } = this.props
    await Router.push(serverTabBar.getIn([type, 'link']))
    window.scrollTo(0, 0)
    trackClickEvent({
      category: TrackEventTabBar.Category,
      label: `${dicTractEvent[type]}`,
    })
  }

  renderIcon = (icon: string) => {
    return (
      <div
        style={{
          width: '22px',
          height: '22px',
          background: `url(${icon}) center center /  21px 21px no-repeat`,
        }}
      />
    )
  }

  render() {
    const { tabBar, serverTabBar, hidden, isFestival, navIcons } = this.props
    const selectedTab = tabBar.get('selectedTab')
    const show = tabBar.get('show')
    if (isFestival === 1) {
      return <NewTabBar {...this.props} />
    }

    return (
      <div className={classnames(styles.tabbar_box, show && styles.show, !hidden && styles.fixed)}>
        <TabBar unselectedTintColor="#929292" tintColor="#FF5151" barTintColor="white">
          {navIcons
            .filter((item: any) => !serverTabBar.getIn([item.get('key'), 'hide']))
            .map((item: any) => (
              <Item
                icon={this.renderIcon(item.get('icon'))}
                selectedIcon={this.renderIcon(item.get('select_icon'))}
                title={item.get('text')}
                key={item.get('key')}
                selected={selectedTab === item.get('key')}
                onPress={this.handlePress(item.get('key'))}
              />
            ))}
        </TabBar>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTabBar) as React.ReactType
