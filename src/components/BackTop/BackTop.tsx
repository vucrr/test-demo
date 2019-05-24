import classnames from 'classnames'
import { Icon, Link } from 'components'
import { WithRouterProps, withRouter } from 'next/router'
import React from 'react'
import { compose } from 'redux'
import { scrollToAnchor } from 'utils/tools'
import withSource, { SourceProps } from '../withSource'
import styles from './BackTop.less'

interface BackTopProps extends Partial<WithRouterProps> {
  backTop: any

  onToggle(isShow: boolean): void

  onHiddenTabBar?: Function
  showTabBar?: boolean
}

const initialState = {
  show: false,
}

type BackTopState = Readonly<typeof initialState>

class BackTop extends React.Component<BackTopProps & SourceProps, BackTopState> {
  readonly state: BackTopState = initialState

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  hideTabBar = () => {
    const { showTabBar, onHiddenTabBar } = this.props
    const route = this.props.router!.route
    const routesNeedHideTabBar = ['/product/detail']
    if (routesNeedHideTabBar.includes(route) && showTabBar && onHiddenTabBar) {
      onHiddenTabBar()
    }
  }

  handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // const scrollTop = (document.documentElement || document.body.parentNode || document.body).scrollTop
    const show = this.state.show
    let { backTop } = this.props
    if (typeof backTop === 'boolean') {
      backTop = 220
    }
    if (scrollTop < backTop && show) {
      this.props.onToggle(false)
      this.setState({ show: false })
      this.hideTabBar()
    } else if (scrollTop > backTop && !show) {
      this.props.onToggle(true)
      this.setState({ show: true })
    }
  }

  handleBackTop = () => {
    scrollToAnchor('body')
  }

  render() {
    const { show } = this.state
    const { ua, utm } = this.props

    // ahs特殊处理
    const query = this.props.router!.query
    const isAhsForBaidu =
      query!.utm_source === 'm_ahs' &&
      query!.utm_medium === 'm_ahs_homepage_footer_nav' &&
      query!.utm_campaign === 'm_xhj'

    const initShow =
      !ua.get('isApp') &&
      !ua.get('isAlipay') &&
      !utm.get('isAnlaiye') &&
      !utm.get('isWacai') &&
      !utm.get('isCmblife') &&
      !utm.get('isSamsungzs')
    const utmMedium = (ua.get('isAhsApp') && 'ahs') || (ua.get('isNuomiApp') && 'nuomi') || 'm'

    if (!initShow || isAhsForBaidu) {
      return false
    }

    return (
      <div className={classnames(styles.backtop_box, show && styles.show)}>
        <Link
          className={styles.icon_box}
          to={`/site/appdownload?utm_source=xhj&utm_medium=${utmMedium}-roll&utm_campaign=download`}
        >
          APP
        </Link>
        <div className={styles.icon_box} onClick={this.handleBackTop}>
          <Icon className={styles.icon} type={require('svg/arrow-left.svg')} />
        </div>
      </div>
    )
  }
}

export default compose(
  withSource,
  withRouter,
)(BackTop) as React.ComponentClass<BackTopProps>
