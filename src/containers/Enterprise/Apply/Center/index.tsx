import { NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as applyActions from 'actions/enterprise/apply'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ListBox from './ListBox'
import Top from './Top'

export interface CenterQuery {}

interface CenterProps extends ErrorObject {
  query: CenterQuery
  result: any
}

const Center: NextSFC2<CenterProps> = ({ error, result }: CenterProps) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>企业权益</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <Top account={result.get('account')} name={result.get('enterprise_name')} />
      <ListBox list={result.get('privileges')} buttonUrl={result.get('order_redirect')} />
    </Container>
  )
}

Center.getInitialProps = async ({ store, query, req, isServer, res, asPath }: any) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (!isLogin) return
  const data = await store.dispatch(applyActions.fetchResultStatus({ query, req }))
  if (data.status) return { error: data }
  // 2-审核通过，1-初审中，0-未认证或未通过审核
  if (Number(data.authenticated) === 1) {
    if (isServer) {
      res.redirect('/enterprise/apply/result')
      res.end()
    } else {
      await Router.push('/enterprise/apply/result')
    }
  } else if (Number(data.authenticated) === 0) {
    if (isServer) {
      res.redirect('/enterprise/apply/form')
      res.end()
    } else {
      await Router.push('/enterprise/apply/form')
    }
  }
}

const mapStateToProps = (state: any) => ({
  result: state.getIn(['enterprise', 'apply', 'result']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onCenterActions: bindActionCreators(applyActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Center)
