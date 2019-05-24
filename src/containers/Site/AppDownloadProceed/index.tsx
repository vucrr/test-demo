import { GetInitialPropsContext } from '@@types/next'
import { appdownloadProceedActions } from 'actions/site/appdownloadProceed'
import classnames from 'classnames'
import { Container, Header, TabBar } from 'components'
import { AssetImage } from 'constant/uikit'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './index.less'

interface ProceedInfo {
  title: string
  content: string
  judge: boolean
}

type Data = { [key: string]: ProceedInfo }

const Proceed = (res: any) => {
  const datas: Data = {
    ios: {
      title: '即将跳转到 AppStore…',
      content: 'AppStore',
      judge: false,
    },
    android: {
      title: '下载即将开始…',
      content: '应用商店',
      judge: false,
    },
    wechat: {
      title: '下载即将开始…',
      content: '',
      judge: true,
    },
  }
  const handleClick = () => {
    window.location.reload()
  }
  const data = datas[res.pagePath]
  return (
    <div className={styles.download_mask}>
      <img src={AssetImage.Site.AppDownloadProceed.AppIcon} />
      <h2 className={styles.download_start}>{data.title}</h2>
      {!data.judge && <p className={styles.download_tips}>无法下载？您可以尝试 :</p>}
      {!data.judge && (
        <ul className={classnames(styles.download_fault)}>
          <li>
            1.
            <a className={styles.btn_reload} onClick={handleClick}>
              刷新页面
            </a>
          </li>
          <li>2. 在系统自带浏览器中打开本页面</li>
          <li>
            3. 直接在{data.content}中搜索 <b>享换机</b>
          </li>
        </ul>
      )}
      {data.judge && (
        <ul className={classnames(styles.wechat_tips)}>
          <li>
            <i className={styles.icon_step}>1</i>
            <span className={styles.text}>
              点击右上角的<i className={classnames(styles.icon, styles.icon_1)} />按钮
            </span>
          </li>
          <li>
            <i className={styles.icon_step}>2</i>
            <span className={styles.text}>
              选择<i className={classnames(styles.icon, styles.icon_2)} />在浏览器打开
            </span>
          </li>
        </ul>
      )}
    </div>
  )
}

class AppDownloadProceed extends Component<{ ua: any; appdownloadproceed: any }> {
  static state = {
    path: '',
  }
  static async getInitialProps({ store, query, req }: GetInitialPropsContext) {
    await store.dispatch(appdownloadProceedActions({ query, req }))
  }
  componentDidMount() {
    const { ua, appdownloadproceed } = this.props
    const path = ua.get('isIOS') ? 'ios' : 'android'
    if (appdownloadproceed.getIn(['appDownloadUrl', path]) !== '') {
      location.href = appdownloadproceed.getIn(['appDownloadUrl', path])
    }
  }
  render() {
    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>APP下载</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    const { ua } = this.props
    const path = ua.get('isIOS') ? 'ios' : 'android'
    const pagePath = path === 'android' && ua.get('isWechat') ? 'wechat' : path
    return (
      <Container {...containerProps}>
        <Proceed pagePath={pagePath} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  appdownloadproceed: state.getIn(['site', 'appdownloadproceed']),
  ua: state.getIn(['serverApp', 'ua']),
})

export default connect(mapStateToProps)(AppDownloadProceed)
