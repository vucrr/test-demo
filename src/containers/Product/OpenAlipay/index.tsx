import { fetchRasPrivateKey } from 'actions/app'
import { Toast } from 'antd-mobile'
import { Container, Header } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { baseURL } from 'utils/config'
import { OpenAlipay, OpenAlipayMask } from './OpenAlipay'

const containerProps = {
  renderHeader: <Header>确认下单</Header>,
}

interface OpenAlipayWrapperProps {
  signature: any
  isIOS: boolean
  isWechat: boolean
  isChangyouApp: boolean
  headers2: any
  utm: any
  url: {
    query: {
      id_activity: string
      id_sku: string
      id_service?: string
      choose_installments_num: string
      user_id?: string
      utm_source?: string
      utm_medium?: string
      utm_campaign?: string
    }
  }
  onFetchRasPrivateKey: any
}

class OpenAlipayWrapper extends React.Component<OpenAlipayWrapperProps, { showMask: boolean }> {
  state = {
    showMask: this.props.isWechat,
  }

  componentDidMount() {
    const { onFetchRasPrivateKey, headers2, url } = this.props
    const queryUserId = url.query.user_id
    const userId = headers2.get('userIdV2')
    const userToken = headers2.get('userToken')
    if (!queryUserId) {
      if (this.checkUserId(userId)) {
        location.href += `&user_id=${encodeURIComponent(userId)}&user_token=${encodeURIComponent(userToken)}`
      }
    } else {
      onFetchRasPrivateKey().then(() => {
        setTimeout(() => {
          this.openAlipay()
        }, 1000)
      })
    }
  }

  checkUserId = (userId: string): boolean => {
    if (!userId) {
      Toast.info('非法进入页面，缺少登录参数！', 3)
      return false
    }
    return true
  }

  getTradeUrl = () => {
    if (this.props.utm.get('isOpenAlipay')) {
      return '/trade/index'
    }
    return '/mytrade/order/confirm'
  }

  openAlipay = () => {
    const { isWechat, signature } = this.props
    if (isWechat) {
      this.setState({
        showMask: true,
      })
    } else {
      const baseUrl = baseURL.substr(0, baseURL.length - 1)
      const tradeUrl = `${this.getTradeUrl()}${location.search}`
      const timespan = signature.getIn(['openAlipay', 'timespan'])
      const token = encodeURIComponent(signature.getIn(['openAlipay', 'token']))

      const alipayUrl = `${baseUrl}${tradeUrl}&source=chain&timespan=${timespan}&token=${token}`
      console.log(alipayUrl)
      location.href = `alipays://platformapi/startapp?appId=20000067&url=${encodeURIComponent(alipayUrl)}`
    }
  }

  closeAlipay = () => {
    this.setState({
      showMask: false,
    })
  }

  handleRedirectTrade = () => {
    location.href = `${this.getTradeUrl()}${location.search}`
  }

  render() {
    const { utm } = this.props
    return (
      <Container {...containerProps}>
        {this.state.showMask && <OpenAlipayMask closeAlipay={this.closeAlipay} isIOS={this.props.isIOS} />}
        <OpenAlipay
          openAlipay={this.openAlipay}
          onRedirectTrade={utm.get('isOpenAlipay') && this.handleRedirectTrade}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  signature: state.getIn(['app', 'signature']),
  isIOS: state.getIn(['serverApp', 'ua', 'isIOS']),
  isWechat: state.getIn(['serverApp', 'ua', 'isWechat']),
  headers2: state.getIn(['serverApp', 'headers2']),
  utm: state.getIn(['serverApp', 'utm']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onFetchRasPrivateKey: bindActionCreators(fetchRasPrivateKey, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenAlipayWrapper)
