import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { BrandText, Icon, Link, withSource } from 'components'
import { SourceProps } from 'components/withSource'
import { TrackEventHome } from 'configs/trackEventLabels'
import { AssetImage } from 'constant/uikit'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './TopDownLoad.less'

const Item = Flex.Item

type TopDownLoadStates = Readonly<{ show: boolean }>

interface TopDownLoadProps {
  fixed?: boolean
  query: any
}

class TopDownLoad extends React.Component<TopDownLoadProps & SourceProps, TopDownLoadStates> {
  constructor(props: TopDownLoadProps & SourceProps) {
    super(props)
    const { utm, ua } = this.props
    this.state = {
      show:
        !ua.get('isNuomiApp') &&
        !ua.get('isAhsApp') &&
        !ua.get('isAlipay') &&
        !ua.get('isApp') &&
        !utm.get('isAnlaiye') &&
        !utm.get('isChangyou') &&
        !utm.get('isSichuanYiDong') &&
        !utm.get('isWacai') &&
        !utm.get('isCmblife') &&
        !utm.get('isHnyd'),
    }
  }

  handleClose = () => {
    this.setState({ show: false })
    trackClickEvent({ category: TrackEventHome.Category, label: TrackEventHome.TopDownload.Close })
  }

  render() {
    const { show } = this.state
    const {
      query: { utm_source, utm_medium, utm_campaign },
    } = this.props
    const isAhsForBaidu =
      utm_source === 'm_ahs' && utm_medium === 'm_ahs_homepage_footer_nav' && utm_campaign === 'm_xhj'

    if (!show || isAhsForBaidu) {
      return false
    }

    return (
      <Flex className={classnames(styles.download_box, this.props.fixed && styles.fixed)}>
        <Icon className={styles.btn_close} type={require('svg/close-circle.svg')} onClick={this.handleClose} />
        <Item className={styles.text_box}>
          <img className={styles.logo} src={AssetImage.Common.Download} alt="" />
          <div>
            <span className={styles.text1}>
              下载<BrandText />APP
            </span>
            <br />
            <span className={styles.text2}>0押金租机，年年用新款</span>
          </div>
        </Item>
        <Link
          // native={true}
          className={styles.btn}
          to="/site/appdownload?utm_source=xhj&utm_medium=header&utm_campaign=download"
          trackEvent={{ category: TrackEventHome.Category, label: TrackEventHome.TopDownload.Download }}
        >
          立即下载
        </Link>
      </Flex>
    )
  }
}

export default withSource<TopDownLoadProps>(TopDownLoad)
