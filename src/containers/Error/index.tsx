import classnames from 'classnames'
import { Container, Header, Icon, TabBar } from 'components'
import { AssetImage } from 'constant/uikit'
import React from 'react'
import { connect } from 'react-redux'
import styles from './Error.less'

const statusDic: { [index: number]: string } = {
  404: '页面未找到',
  500: '出错啦',
}

interface ErrorProps {
  statusCode: number
  errorMsg?: string
}

interface InjectedProps {
  isQsy: boolean
}

class Error extends React.Component<ErrorProps & InjectedProps> {
  static getInitialProps({ res, err }: any) {
    const statusCode = (res && res.statusCode) || (err && err.statusCode) || null
    return { statusCode, errorMsg: (res && res.errorMsg) || (err && err.errorMsg) || '' }
  }

  static handleClick() {
    window.location.reload()
  }

  render() {
    const { statusCode, errorMsg, isQsy } = this.props

    // tslint:disable-next-line
    // if (statusCode === null) {
    //   return null
    // }

    const headerProps = {
      hidden: isQsy,
      icon: (
        <a href="tel:400-670-0188">
          <Icon className={styles.phone} type={require('svg/phone.svg')} />
        </a>
      ),
      rightContent: (
        <a className={styles.help_btn} href="/help">
          帮助
        </a>
      ),
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>{statusDic[statusCode] || `出错啦`}</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    return (
      <Container {...containerProps}>
        <div className={styles.box}>
          <img className={styles.icon} src={AssetImage.Common.ErrorBG} alt="404 not found" />
          {statusCode === 404 && <p>抱歉哦~您访问的页面已经逃离地球表面</p>}
          {statusCode !== 404 && <p className={styles.msg}>{errorMsg || '服务器报错了'}</p>}
          <div className={styles.btn_box} data-status={statusCode}>
            <a href="/" className={classnames(styles.btn, isQsy && styles.btn_blue)}>
              返回首页
            </a>
            <a className={classnames(styles.btn, isQsy && styles.btn_blue)} onClick={Error.handleClick}>
              重新加载
            </a>
          </div>
        </div>
      </Container>
    )
  }
}

const mapState = (state: any) => ({
  isQsy: state.getIn(['serverApp', 'utm', 'isQsy']),
})

export default connect(mapState)(Error)
