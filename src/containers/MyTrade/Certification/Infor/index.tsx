import { checkLogin } from 'actions/app'
import * as certify from 'actions/myTrade/certification'
import { Container, Header, Loading, TabBar } from 'components'
import { SourceProps } from 'components/withSource'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from './Form'
import styles from './Form.less'

interface Props extends ErrorObject {
  onCertify: any
  url: {
    query: {
      name?: string
      idCard?: string
      redirect?: string
    }
  }
}

interface State {
  hidden: boolean
  loading: boolean
  domStr: string
  script: any
}

class Certification extends React.Component<Props & SourceProps, State> {
  static async getInitialProps({ query, store, res, isServer, asPath, req }: any) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin && (!query.name || !query.idCard)) {
      const data = await store.dispatch(certify.getCertifyType({ query, res, isServer, req }))
      if (data && data.errorMsg) {
        return { error: data }
      }
    }
  }

  readonly state = {
    hidden: true,
    loading: false,
    domStr: '',
    script: '',
  }

  componentWillMount() {
    const { name, idCard } = this.props.url.query
    if (!name || !idCard) {
      this.setState({
        hidden: false,
      })
    }
  }

  async componentDidMount() {
    const { name, idCard } = this.props.url.query
    if (name && idCard) {
      await this.postData({ name, identi_card: idCard })
    }
  }

  componentDidUpdate() {
    if (this.state.script[1]) {
      setTimeout(() => {
        const e = document.createElement('script')
        e.type = 'text/javascript'
        e.async = true
        e.innerHTML = this.state.script[1]
        const s = document.getElementsByTagName('script')[0]
        s.parentNode!.insertBefore(e, s)
      }, 0)
    }
  }

  postData = async (values: any) => {
    this.setState({
      loading: true,
    })
    const { ua } = this.props
    let channel
    let returnUrl = location.host + '/mytrade/certification/certify'
    if (ua.get('isAlipay')) {
      channel = 'alipay'
    } else if (ua.get('isApp')) {
      channel = 'xhjapp'
      returnUrl = location.host + '/mytrade/certification/certify/auth/zhima'
    }
    const data = await this.props.onCertify.fetchCertifyForm({
      ...values,
      return_url: returnUrl,
      channel,
      redirect: this.props.url.query.redirect || '/', // 没有就回到首页
    })
    this.setState({ loading: false })
    if (data) {
      let domStr = data.form
      const extraScript = /<script>(.+)<\/script>/gi.exec(domStr)
      if (extraScript) {
        domStr = domStr.replace(extraScript[0], '')
      }
      this.setState({
        domStr: domStr,
        loading: false,
        script: extraScript,
      })
    }
  }

  render() {
    const { error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>实名信息</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    return (
      <Container {...containerProps} className={this.state.hidden && styles.hidden}>
        <Form postData={this.postData} />
        <Loading loading={this.state.loading} />
        <div dangerouslySetInnerHTML={{ __html: this.state.domStr }} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  ua: state.getIn(['serverApp', 'ua']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onCertify: bindActionCreators(certify, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Certification)
