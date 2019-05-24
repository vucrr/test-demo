import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as orderResultActions from 'actions/myTrade/order/result'
import { Container, Header, TabBar } from 'components'
import BreadCrumb from 'components/BreadCrumb'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { noop } from 'utils/tools'
// import BottomLogo from './BottomLogo'
import BottonBox from './ButtonBox'
import CooperateBox from './CooperateBox'
import ExchangeBox from './ExchangeBox'
import State from './State'
import styles from './header.less'

export interface Query {
  trade_no: string // 交易号
}

export interface OrderResultProps extends ErrorObject {
  url: {
    query: Query
  }
  orderResult: any
  onOrderResultActions: any
}

class OrderResult extends React.Component<OrderResultProps> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath, req }))
    if (isLogin) {
      const data = await store.dispatch(orderResultActions.fetchInfo({ trade_no: query.trade_no }, req))
      if (data.status) {
        return { error: data }
      }
    }
  }

  render() {
    const { error, url, orderResult } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    // result: 结果状态 1 交易成功, 2 交易失败 3、运营商订单待上传入网资料 4、运营商订单交易成功 5、订单审批中 6、换机成功 11、信用卡支付审核中
    const status = +orderResult.get('pay_result')
    const contractNo = orderResult.get('contract_no')
    const headerProps = {
      onLeftClick: noop,
      icon: '',
      rightContent:
        status === 3 ? (
          ''
        ) : (
          <span
            className={styles.header}
            onClick={async () => {
              await Router.push('/')
            }}
          >
            完成
          </span>
        ),
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}> 办理结果</Header>,
      renderTabBar: <TabBar hidden={true} />,
      bgColor: '#fff',
    }

    if (status === 3) {
      return (
        <Container {...containerProps}>
          <CooperateBox query={url.query} />
        </Container>
      )
    }
    if (status === 6) {
      return (
        <Container {...containerProps}>
          <ExchangeBox
            query={url.query}
            info={orderResult.get('replacement_info')}
            contractNo={contractNo}
            status={status}
          />
        </Container>
      )
    }
    return (
      <Container {...containerProps}>
        <BreadCrumb list={orderResult.get('step_bar')} />
        <State status={status} info={orderResult} />
        <BottonBox status={status} query={url.query} message={orderResult.get('doubt_msg')} contractNo={contractNo} />
        {/* {orderResult.get('is_risk_credit') && <BottomLogo />} */}
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  orderResult: state.getIn(['myTrade', 'order', 'result']),
})

export default connect(mapStateToProps)(OrderResult)
