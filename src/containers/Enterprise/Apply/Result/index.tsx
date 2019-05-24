import { NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as applyActions from 'actions/enterprise/apply'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Bottom from './Bottom'
import ListBox from './ListBox'
import Top from './Top'

export interface ResultQuery {}

interface ResultProps extends ErrorObject {
  query: ResultQuery
  result: any
}

const Result: NextSFC2<ResultProps> = ({ error, result }: ResultProps) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>认证结果</Header>,
    renderTabBar: <TabBar hidden={true} />,
    bgColor: '#fff',
  }

  return (
    <Container {...containerProps}>
      <Top name={result.get('enterprise_name')} />
      <ListBox list={result.get('privileges')} />
      <Bottom buttonUrl={result.get('order_redirect')} />
    </Container>
  )
}

Result.getInitialProps = async ({ store, query, req, isServer, res, asPath }: any) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (!isLogin) return
  const data = await store.dispatch(applyActions.fetchResultStatus({ query, req }))
  if (data.status) return { error: data }
}

const mapStateToProps = (state: any) => ({
  result: state.getIn(['enterprise', 'apply', 'result']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onResultActions: bindActionCreators(applyActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Result)
