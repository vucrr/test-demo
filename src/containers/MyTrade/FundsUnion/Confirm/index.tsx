import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as fundsUnionActions from 'actions/myTrade/fundsUnion'
import { CreateStrategyPayParams, createStrategyPay } from 'actions/myTrade/order/pay'
import { BreadCrumb, Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Step from '../../Assess/Result/Step'
import ButtonBox from './ButtonBox'
import State from './State'
import styles from './State.less'

export interface ConfirmQuery extends CreateStrategyPayParams {
  trade_no: string
}

interface ConfirmProps extends ErrorObject {
  query: ConfirmQuery
  result: any
  onCreateStrategyPay: Function
}

const Confirm: NextSFC2<ConfirmProps> = ({ error, result, onCreateStrategyPay, query }: ConfirmProps) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>授权确认</Header>,
    renderTabBar: <TabBar hidden={true} />,
    className: styles.bgColor,
  }

  const stateProps = {
    authorizeInfo: result.get('authorize_info'),
    stepDoc: result.get('step_doc'),
  }
  const buttonProps = {
    agreementInfo: result.get('agreement_info'),
    remark: result.get('appraise_remark'),
    onCreateStrategyPay: onCreateStrategyPay,
    query,
  }
  const stepListProps = {
    stepList: result.get('step_list'),
  }
  return (
    <Container {...containerProps}>
      <BreadCrumb list={result.get('step_bar')} />
      <State {...stateProps} />
      <Step {...stepListProps} />
      <ButtonBox {...buttonProps} />
    </Container>
  )
}

Confirm.getInitialProps = async ({ store, query, isServer, res, asPath, req }: GetInitialPropsContext) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin && query.trade_no) {
    const data = await store.dispatch(fundsUnionActions.fetchAuthorizeResult(query.trade_no, req))
    if (data && data.errorMsg) {
      return { error: data }
    }
  } else {
    return { error: { status: 500, errorMsg: '路由参数不合法' } }
  }
}

const mapStateToProps = (state: any) => ({
  result: state.getIn(['myTrade', 'fundsUnion', 'confirm']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onCreateStrategyPay: bindActionCreators(createStrategyPay, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirm)
