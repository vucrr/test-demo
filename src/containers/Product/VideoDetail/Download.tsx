import { Icon, Loading, withSource } from 'components'
import { SourceProps } from 'components/withSource'
import React from 'react'
import styles from './Download.less'

type TopDownLoadStates = Readonly<{ show: boolean; loading: boolean }>

interface TopDownLoadProps {
  fixed?: boolean
}

class DownLoad extends React.Component<TopDownLoadProps & SourceProps, TopDownLoadStates> {
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
        !utm.get('isWacai'),
      loading: false,
    }
  }

  handleClick = () => {
    const { ua } = this.props
    this.setState({
      loading: true,
    })
    if (ua.get('isWechat')) {
      if (ua.get('isIOS')) {
        window.location.href = 'https://itunes.apple.com/cn/app/xiang-huan-ji-nian-nian-huan/id1180882205?mt=8'
      } else {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.aihuishou.airent'
      }
    } else {
      window.location.href = 'airent://www.xianghuanji.com/homePage'
    }

    setTimeout(() => {
      window.location.href = 'https://m.xianghuanji.com/site/appdownload'
      this.setState({
        loading: false,
      })
    }, 2000)
  }

  render() {
    const { show } = this.state

    if (!show) {
      return false
    }

    return (
      <div className={styles.download_box}>
        <a className={styles.btn} onClick={this.handleClick}>
          <Icon className={styles.icon} type={require('svg/logo-xhj.svg')} />打开APP查看更多精彩视频
        </a>
        <Loading loading={this.state.loading} />
      </div>
    )
  }
}
export default withSource<TopDownLoadProps>(DownLoad)
