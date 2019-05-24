import classnames from 'classnames'
import { Icon, Link } from 'components'
import { AssetImage } from 'constant/uikit'
import React, { Component } from 'react'
import styles from './footer.less'

class Download extends Component<{ query: any }> {
  state = {
    download: false,
  }
  componentDidMount() {
    window.addEventListener('scroll', () => {
      this.setState({
        download: true,
      })
      // 清除全部scroll事件
      window.onscroll = null
    })
  }
  render() {
    const to =
      '/site/appdownloadproceed?utm_source=' +
      this.props.query.utm_source +
      '&utm_medium=' +
      this.props.query.utm_medium +
      '&utm_campaign=' +
      this.props.query.utm_campaign
    return (
      <div className={classnames(styles.download, this.state.download && styles.active)}>
        <Link to={to}>
          <span className={styles.text_info}>立即下载</span>
          <Icon type={require('svg/download.svg')} className={styles.icon_download} />
        </Link>
      </div>
    )
  }
}
const Footer = (res: any) => {
  return (
    <div className={styles.footer}>
      {!res.isWeibo && (
        <div>
          <h2 className={styles.title}>
            <span>战略合作伙伴</span>
          </h2>
          <img src={AssetImage.Site.AppDownload.Footer} />
        </div>
      )}

      <Download query={res.query} />
    </div>
  )
}

export default Footer
