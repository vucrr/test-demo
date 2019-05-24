import { NextSFC2 } from '@@types/next'
import { checkLogin, redirectLogin } from 'actions/app'
import { fetchPrivilege } from 'actions/myAccount/service/privilege'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import Tab from '../Tab'
import Privilege from './Privilege'

interface ServicePrivilegeProps extends ErrorObject {
  query: {
    page: number
    trade_no: string
  }
}

interface InjectedProps {
  list: any
}

const ServicePrivilege: NextSFC2<ServicePrivilegeProps & InjectedProps> = ({ error, query, list }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>专属权益</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <Tab initialPage={2} />
      <Privilege page={+query.page} list={list} />
    </Container>
  )
}

ServicePrivilege.getInitialProps = async ({ store, query, isServer, res, asPath, req }) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    const data = await store.dispatch(fetchPrivilege(query.contract_no, req))
    if (data.status) {
      if (data.status === 401) {
        await redirectLogin({ isServer, res, asPath })
      }
      return { error: data }
    }
  }
}

const mapState = (state: any) => ({
  list: state.getIn(['myAccount', 'service', 'privilege', 'list']),
})

export default connect(mapState)(ServicePrivilege)
