import { NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import { fetchLogistics } from 'actions/myAccount/return/apply/express'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import Info from './Info'
import Order from './Order'

interface DetailProps extends ErrorObject {
  data: any
}
const Detail: NextSFC2<DetailProps> = ({ error, data }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>物流详情</Header>,
    renderTabBar: <TabBar hidden={true} />,
    bgColor: '#fff',
  }

  return (
    <Container {...containerProps}>
      <Order data={data} />
      <Info data={data} />
    </Container>
  )
}

Detail.getInitialProps = async ({ store, query, req, isServer, res, asPath }) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    await store.dispatch(fetchLogistics({ sub_trade_no: query.sub_trade_no }, req))
  }
}

const mapStateToProps = (state: any) => ({
  data: state.getIn(['myAccount', 'returnApply', 'express', 'logistics']),
})

export default connect(mapStateToProps)(Detail)
