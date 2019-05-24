import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { fetchExchange } from 'actions/myTrade/exchange'
import { Container, Header, TabBar } from 'components'
import { TrackEventExchange } from 'configs/trackEventLabels'
import Error from 'containers/Error'
import * as React from 'react'
import { connect } from 'react-redux'
import { trackClickEvent } from 'utils/piwik'
import ButtonBox from './ButtonBox'
import OrderList from './OrderList'
import TopShow from './TopShow'

export interface Query {
  contract_product_id: string
  old_trade_no?: string
  vas_id?: string
}
export interface ExchangeProps {
  info: any
  url: { query: Query }
  error: any
  trade_title: any
}

export interface ExchangeState {
  isSelect: boolean
  trderNo: string
}

class Exchange extends React.Component<ExchangeProps, ExchangeState> {
  readonly state = {
    trderNo: '',
    isSelect: true,
  }
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const res = await store.dispatch(fetchExchange({ query, req }))
      if (res.errorMsg) {
        return { error: res }
      }
    }
  }
  componentDidMount() {
    const { info } = this.props
    if (info && info.size === 1) {
      this.setState({
        trderNo: info.map((item: any) => item.get('trade_no')).toJS()[0],
        isSelect: false,
      })
    }
  }
  selectTrade = (status: string) => {
    trackClickEvent({ category: TrackEventExchange.Remind.category, label: TrackEventExchange.Remind.name5 + status })
    this.setState({
      trderNo: status,
    })
    // this.state.trderNo === status ? '' : status,
  }
  render() {
    const {
      info,
      trade_title,
      error,
      url: { query },
    } = this.props
    if (error && error.errorMsg) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>换机提示</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        <TopShow />
        {info && <OrderList selectTrade={this.selectTrade} {...this.state} info={info} trade_title={trade_title} />}
        <ButtonBox trderNo={this.state.trderNo} query={query} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  info: state.getIn(['myTrade', 'exchange', 'entrance', 'info']),
  trade_title: state.getIn(['myTrade', 'exchange', 'entrance', 'data', 'trade_title']),
})

export default connect(mapStateToProps)(Exchange)
