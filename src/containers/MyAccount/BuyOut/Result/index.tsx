import { GetInitialPropsContext } from '@@types/next'
import * as buyOutActions from 'actions/account/buy-out'
import { Container, Header, ProductBox, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Top from './Top'

interface BuyOutResultProps extends ErrorObject {
  result: any
  onBuyOutActions: any
  url: {
    query: {
      order_no: string
    }
  }
}

class BuyOutResult extends React.Component<BuyOutResultProps> {
  timeTick = 0

  static async getInitialProps({ store, query, req }: GetInitialPropsContext) {
    if (query.order_no) {
      const data = await store.dispatch(buyOutActions.fetchResultInfo({ trade_no: query.order_no, req }))
      if (data.status) {
        return { error: data }
      }
    } else {
      return { error: { status: 400, errorMsg: '路由参数不合法' } }
    }
  }

  async componentDidMount() {
    const {
      url: { query },
      result,
      onBuyOutActions,
    } = this.props
    // 未完成状态时，请求一次接口
    if (result.get('is_finish') === 0) {
      setTimeout(() => {
        onBuyOutActions.fetchResultInfo({ trade_no: query.order_no })
      }, 1000)
    }
  }

  componentWillReceiveProps(nextProps: BuyOutResultProps) {
    // 未完成状态时，轮询接口5次
    if (this.props.result.get('is_finish') === 0 && nextProps.result.get('is_finish') === 0 && this.timeTick < 4) {
      const {
        url: { query },
        onBuyOutActions,
      } = this.props
      this.timeTick += 1
      setTimeout(() => {
        onBuyOutActions.fetchResultInfo({ trade_no: query.order_no })
      }, 1000)
    }
  }

  render() {
    const { url, error, result } = this.props

    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const containerProps = {
      renderHeader: <Header>支付结果</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    const productBoxProps = {
      margin: true,
      thumb: result.getIn(['tradeInfo', 'skuImg']),
      alias: result.getIn(['tradeInfo', 'skuName']),
      rent: result.getIn(['tradeInfo', 'installment']),
    }

    return (
      <Container {...containerProps}>
        <Top status={result.get('is_finish')} tradeNo={url.query.order_no} />
        <ProductBox {...productBoxProps} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  result: state.getIn(['account', 'buyOut', 'result']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onBuyOutActions: bindActionCreators(buyOutActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyOutResult)
