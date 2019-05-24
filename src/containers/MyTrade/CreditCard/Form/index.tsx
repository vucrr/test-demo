import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { fetchCreditCup, fetchCreditSms, saveCreditCookie } from 'actions/myTrade/creditCard'
import { fetchCreditForm } from 'actions/myTrade/creditCard/index'
import { createStrategyPay } from 'actions/myTrade/order/pay'
import { Container, Header, TabBar } from 'components'
import { ErrorObject } from 'interfaces/error'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Detail from './Detail'
import Top from './Top'
import styles from './Top.less'

export interface Query {
  trade_no: string
  pay_no: string
  type: string
  pis_code: string
}
export interface CreditFormProps extends ErrorObject {
  information: any
  query: Query
  ua: any
  onCreditSms: Function
  onCreditCup: Function
  createStrategyPay: Function
  saveCreditCookie: Function
}

export interface CreditFormState {}

class CreditForm extends React.Component<CreditFormProps, CreditFormState> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ res, asPath, isServer }))
    if (isLogin) {
      if (query.trade_no) {
        await store.dispatch(fetchCreditForm({ req }))
      } else {
        return { error: { status: 500, errorMsg: '路由参数不合法' } }
      }
    }
  }
  render() {
    const { information, query, onCreditCup, onCreditSms, ua, createStrategyPay, saveCreditCookie } = this.props
    const containerProps = {
      renderHeader: <Header>冻结信用卡额度</Header>,
      renderTabBar: <TabBar hidden={true} />,
      className: styles.bg_color,
    }
    const detailProp = {
      onCreditCup,
      onCreditSms,
      information,
      cookie: information.get('cookie'),
      query,
      ua,
      createStrategyPay,
      saveCreditCookie,
    }
    return (
      <Container {...containerProps}>
        <Top />
        <Detail {...detailProp} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  information: state.getIn(['myTrade', 'creditCard', 'form']),
  ua: state.getIn(['serverApp', 'ua']),
})
const mapDispatchToProps = (dispatch: any) => ({
  onCreditSms: bindActionCreators(fetchCreditSms, dispatch),
  onCreditCup: bindActionCreators(fetchCreditCup, dispatch),
  createStrategyPay: bindActionCreators(createStrategyPay, dispatch),
  saveCreditCookie: bindActionCreators(saveCreditCookie, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreditForm)
