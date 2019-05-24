import { hiddenTabBar, toggleTabBar } from 'actions/app'
import { NavBar } from 'antd-mobile'
import { NavBarProps } from 'antd-mobile/lib/nav-bar/PropsType'
import classnames from 'classnames'
import { Icon } from 'components'
import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sendTitle } from 'utils/app'
import '../../themes/index.less'
import BackTop from '../BackTop'
import styles from './Header.less'

export interface HeaderProps extends NavBarProps {
  children: any // string
  showTabBar?: boolean
  isApp?: boolean
  rightContentType?: string
  extendHead?: React.ReactNode
  renderTitle?: Function
  onToggleTabBar?: Function
  onHiddenTabBar?: Function
  hidden?: boolean
  backTop?: any
  isQsy?: boolean
  borderBottom?: boolean // true 头部有底部分割 false 没有底部分割
}

class Header extends React.Component<HeaderProps, { hidden: boolean }> {
  static defaultProps = {
    hidden: false,
    backTop: false,
    rightContentType: 'tabBar',
    borderBottom: true,
  }

  readonly state = {
    hidden: this.props.isApp || this.props.hidden || false,
  }

  handleToggle = (isShow: boolean) => {
    !this.props.isApp && this.setState({ hidden: !isShow })
  }

  render() {
    const {
      children,
      isApp,
      showTabBar,
      rightContentType,
      extendHead,
      renderTitle,
      onToggleTabBar,
      onHiddenTabBar,
      hidden,
      backTop,
      isQsy,
      borderBottom,
      ...headerProps
    } = this.props
    let hide = this.state.hidden
    if (!hidden) {
      hide = false
    }

    const dicRightContentType: { [index: string]: React.ReactNode } = {
      tabBar: (
        <span
          className={classnames(styles.btn_nav, showTabBar && styles.active)}
          onClick={() => onToggleTabBar && onToggleTabBar()}
        >
          <i />
          <i />
          <i />
        </span>
      ),
    }

    const handleBack = () => {
      Router.back()
    }

    const navBarProps: any = {
      leftContent: '',
      rightContent: ((!isQsy || !isApp) && headerProps.rightContent) || dicRightContentType[rightContentType || ''],
      icon: <Icon type={require('svg/arrow-left.svg')} size="sm" />,
      onLeftClick: handleBack,
      mode: 'light',
      ...headerProps,
    }

    const getTitle = () => {
      if (isApp) {
        sendTitle(children)
        return children
      }
      return this.props.isQsy ? '轻松用' : '享换机'
    }

    return (
      <>
        <Head>
          <meta
            name="viewport"
            key="viewport"
            content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
          />
          <title>{getTitle()}</title>
          {extendHead}
        </Head>
        {!this.props.isApp && (
          <div
            id="fixedHeader"
            className={classnames(styles['fixed-top'], !hide && styles.show, !borderBottom && styles.bdnone)}
          >
            {renderTitle && <NavBar {...navBarProps}>{renderTitle()}</NavBar>}
            {!renderTitle && (
              <NavBar {...navBarProps}>{children.length > 12 ? `${children.substr(0, 12)}...` : children}</NavBar>
            )}
          </div>
        )}
        {backTop && (
          <BackTop
            backTop={backTop}
            onToggle={this.handleToggle}
            showTabBar={showTabBar}
            onHiddenTabBar={onHiddenTabBar}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({
  showTabBar: state.getIn(['app', 'tabBar', 'show']),
  isApp: state.getIn(['serverApp', 'ua', 'isApp']),
  isQsy: state.getIn(['serverApp', 'utm', 'isQsy']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onToggleTabBar: bindActionCreators(toggleTabBar, dispatch),
  onHiddenTabBar: bindActionCreators(hiddenTabBar, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header) as React.ComponentClass<HeaderProps>
