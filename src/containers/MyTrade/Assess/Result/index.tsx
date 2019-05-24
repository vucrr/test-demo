import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import { fetchInfo } from 'actions/myTrade/assess/result'
import { CreateStrategyPayParams, createStrategyPay } from 'actions/myTrade/order/pay'
import { BreadCrumb, Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ButtonBox from './ButtonBox'
import State from './State'
import styles from './State.less'

import StepList from './StepList'

export interface ResultQuery extends CreateStrategyPayParams {
  trade_no: any
}

interface ResultProps extends ErrorObject {
  query: ResultQuery
  Result: any
  onCreateStrategyPay: Function
}

const Result: NextSFC2<ResultProps> = ({ error, Result, query, onCreateStrategyPay }: ResultProps) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }
  const success = !!(Result.get('appraise_type') === 1)
  const containerProps = {
    renderHeader: <Header>评估结果</Header>,
    renderTabBar: <TabBar hidden={true} />,
    className: styles.bgColor,
  }
  const stateProps = {
    icon: Result.getIn(['authorize_info', 'icon']),
    stepDoc: Result.get('step_doc'),
    appraiseTitle: Result.get('appraise_title'),
  }
  const buttonProps = {
    success: success,
    agreementInfo: Result.get('agreement_info'),
    remark: Result.get('appraise_remark'),
    query: query,
    onCreateStrategyPay: onCreateStrategyPay,
  }
  const stepListProps = {
    chargeInfo: Result.get('charge_info'),
    stepList: Result.get('step_list'),
  }
  return (
    <Container {...containerProps}>
      <BreadCrumb list={Result.get('step_bar')} />
      <State {...stateProps} />
      {success && <StepList {...stepListProps} />}
      <ButtonBox {...buttonProps} />
    </Container>
  )
}

Result.getInitialProps = async ({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin && query.trade_no) {
    const data = await store.dispatch(fetchInfo(query, req))
    if (data.status) {
      return { error: data }
    }
  } else {
    return { error: { status: 500, errorMsg: '路由参数不合法' } }
  }
}

const mapStateToProps = (state: any) => ({
  Result: state.getIn(['myTrade', 'assess', 'result']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onCreateStrategyPay: bindActionCreators(createStrategyPay, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Result)
