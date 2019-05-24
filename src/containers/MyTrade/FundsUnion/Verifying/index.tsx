import { checkLogin } from 'actions/app'
import * as fundsUnionActions from 'actions/myTrade/fundsUnion'
import { CreateStrategyPayParams } from 'actions/myTrade/order/pay'
import { Container, Header } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import Lottie from 'react-lottie'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './index.less'

export interface Props {
  url: {
    query: CreateStrategyPayParams
  }
  onFundsUnionActions: any
}

export interface State extends ErrorObject {}

class Verifying extends React.Component<Props, State> {
  state = {
    error: {
      status: 0,
      errorMsg: '',
    },
  }
  static getInitialProps = async ({ store, isServer, res, asPath }: any) => {
    await store.dispatch(checkLogin({ isServer, res, asPath }))
  }

  async componentDidMount() {
    const { query } = this.props.url
    const data = await this.props.onFundsUnionActions.fetchFundingResult({
      ...query,
      return_url: location.href,
    })

    if (data && data.status > 200) {
      this.setState({
        error: data,
      })
    }
  }

  render() {
    const { error } = this.state

    if (error.status > 200) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: require('lottie/verifying.json'),
    }

    const headerProps = {
      hidden: true,
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>认证中</Header>,
    }

    return (
      <Container {...containerProps}>
        <div className={styles.loadingBox}>
          <Lottie options={defaultOptions} width={36} height={36} />
          <p className={styles.text}>认证中，请耐心等待</p>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (_: any) => ({})

const mapDispatchToProps = (dispatch: any) => ({
  onFundsUnionActions: bindActionCreators(fundsUnionActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Verifying)
