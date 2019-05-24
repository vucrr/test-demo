import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as orderPayActions from 'actions/myTrade/order/pay'
import { BreadCrumb, Container, Header, TabBar, Wrap } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PayTypeBox from './PayTypeBox'
import SubmitBottom, { SubmitBottomProps } from './SubmitBottom'
import Top from './Top'

export interface Query {
  trade_no: string // 交易号
  pis_code?: string // 担保方式 code

  check_flow?: string
  pay_no?: string
  type?: string
  zhima_unique_no?: string
}

export interface OrderPayProps extends ErrorObject {
  url: {
    query: Query
  }
  orderPay: any
  onOrderPayActions: any
}

interface OrderPayState {}

class OrderPay extends React.Component<OrderPayProps, OrderPayState> {
  static async getInitialProps({ store, query, isServer, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath, req }))
    if (isLogin) {
      const data = await store.dispatch(
        orderPayActions.fetchInfo({ trade_no: query.trade_no, pis_code: query.pis_code, req }),
      )
      if (data.status) {
        return { error: data }
      }
    }
  }

  render() {
    const { error, url, orderPay, onOrderPayActions } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>担保方式</Header>,
      renderTabBar: <TabBar hidden={true} />,
      bgColor: '#fff',
    }

    const payTypeBoxProps = {
      query: url.query,
      list: orderPay.get('assurance_info'),
      num: orderPay.get('assurance_num'),
      onOrderPayActions,
    }

    return (
      <Container {...containerProps}>
        <BreadCrumb list={orderPay.get('step_bar')} />
        <Wrap>
          <Top info={orderPay.get('lease_price_info')} />
          <PayTypeBox {...payTypeBoxProps}>{(props: SubmitBottomProps) => <SubmitBottom {...props} />}</PayTypeBox>
        </Wrap>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  orderPay: state.getIn(['myTrade', 'order', 'pay']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onOrderPayActions: bindActionCreators(orderPayActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderPay)
