import { Toast } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import { OpenAlipay, OpenAlipayMask } from '../../Product/OpenAlipay/OpenAlipay'

export interface RedirectAlipayProps {
  isIOS: boolean
  isWechat: boolean
  url: {
    query: {
      redirect: string
    }
  }
}

export interface RedirectAlipayState {
  showMask: boolean
}

class RedirectAlipay extends React.Component<RedirectAlipayProps, RedirectAlipayState> {
  readonly state: Readonly<RedirectAlipayState> = {
    showMask: this.props.isWechat,
  }

  componentDidMount() {
    this.openAlipay()
  }

  openAlipay = () => {
    const {
      url: { query },
    } = this.props
    if (query.redirect) {
      location.href = `alipays://platformapi/startapp?appId=20000067&url=${encodeURIComponent(query.redirect)}`
    } else {
      Toast.info('页面缺少redirect参数！', 3)
    }
  }

  closeAlipay = () => {
    this.setState({
      showMask: false,
    })
  }

  render() {
    const headerProps = {
      rightContentType: 'tabBar',
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>租机流程</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    return (
      <Container {...containerProps}>
        {this.state.showMask && <OpenAlipayMask closeAlipay={this.closeAlipay} isIOS={this.props.isIOS} />}
        <OpenAlipay openAlipay={this.openAlipay} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  isIOS: state.getIn(['serverApp', 'ua', 'isIOS']),
  isWechat: state.getIn(['serverApp', 'ua', 'isWechat']),
})

export default connect(mapStateToProps)(RedirectAlipay)
