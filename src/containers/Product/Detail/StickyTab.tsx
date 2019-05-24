import { Tabs } from 'antd-mobile'
import classnames from 'classnames'
import withSource, { SourceProps } from 'components/withSource'
import React from 'react'
import { scrollWithAnimation } from 'utils/tools'
import styles from './StickyTab.less'

interface StickyTabProps {
  style: any
  show: boolean
  distanceFromTop: number
  onChangeStickyPosition: Function
}

class StickyTab extends React.Component<StickyTabProps & SourceProps, { page: number }> {
  readonly state = {
    page: 0,
  }

  refTab = React.createRef<HTMLDivElement>()
  topHeaderHeight = 0
  refTabHeight = 0
  carouselBoxHeight = 0

  $content0: HTMLDivElement | null = null
  $content1: HTMLDivElement | null = null
  $content2: HTMLDivElement | null = null

  contentTop: any = {
    0: 0,
    1: 0,
    2: 0,
  }

  componentDidMount() {
    // this.topHeaderHeight =
    //   (document.querySelector('#fixedHeader .am-navbar') &&
    //     document.querySelector('#fixedHeader .am-navbar')!.clientHeight) ||
    //   0
    this.refTabHeight = this.refTab.current!.clientHeight
    this.carouselBoxHeight = document.querySelector('#carouselBox')!.clientHeight
    this.$content0 = document.querySelector('#tabContent0')
    this.$content1 = document.querySelector('#tabContent1')
    this.$content2 = document.querySelector('#tabContent2')
    this.contentTop = {
      0: this.$content0!.offsetTop,
      1: this.$content1!.offsetTop,
      2: this.$content2!.offsetTop,
    }
    this.props.onChangeStickyPosition({
      topPosition: this.topHeaderHeight + this.refTabHeight,
      carouselBoxHeight: this.carouselBoxHeight,
    })
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextState.page !== this.state.page || nextProps.show !== this.props.show
  }

  componentWillReceiveProps(nextProps: any) {
    this.contentTop[2] = this.$content2!.offsetTop
    const curTop = this.carouselBoxHeight - nextProps.distanceFromTop + this.topHeaderHeight + this.refTabHeight
    if (curTop > this.contentTop[0] && curTop < this.contentTop[1]) {
      this.setState({ page: 0 })
    } else if (curTop > this.contentTop[1] && curTop < this.contentTop[2]) {
      this.setState({ page: 1 })
    } else if (curTop > this.contentTop[2]) {
      this.setState({ page: 2 })
    }
  }

  render() {
    const { style, show, ua } = this.props
    const isApp = ua.get('isApp')
    const { page } = this.state
    const tabs = [{ title: '服务方案' }, { title: '租机说明' }, { title: '图文详情' }]
    const tabProps = {
      tabs,
      page,
      usePaged: false,
      useOnPan: false,
      tabBarTextStyle: { fontSize: '13px' },
      tabBarBackgroundColor: '#fff',
      tabBarInactiveTextColor: '#333333',
      tabBarActiveTextColor: '#333333', // tabBar激活Tab文字颜色
      tabBarUnderlineStyle: { border: '1px solid #ff5544', marginBottom: '2.5%' }, // tabBar下划线样式
      onChange: (_: any, index: number) => {
        const offsetTop = index === 0 ? 0 : this.contentTop[index] - this.topHeaderHeight - this.refTabHeight + 2 // +2 适配机型
        scrollWithAnimation(offsetTop)
        this.setState({ page: index })
      },
    }

    return (
      <div
        ref={this.refTab}
        style={style}
        className={classnames(styles.sticky_tab, isApp && styles.app, show && styles.active)}
      >
        <Tabs {...tabProps} />
      </div>
    )
  }
}

export default withSource<StickyTabProps>(StickyTab)
