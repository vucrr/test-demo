import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import Form from './Form'

const containerProps = {
  renderHeader: <Header>更换手机号</Header>,
  renderTabBar: <TabBar hidden={true} />,
}

interface ChangePhoneProps extends ErrorObject {
  url: { query: { phone: string; redirect: string } }
}

const ChangePhone: NextSFC2<ChangePhoneProps> = props => {
  if (props.error) {
    return <Error statusCode={props.error.status} errorMsg={props.error.errorMsg} />
  }
  return (
    <Container {...containerProps}>
      <Form query={props.url.query} />
    </Container>
  )
}

ChangePhone.getInitialProps = async ({ store, isServer, query, res, asPath }: GetInitialPropsContext) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    if (!query.phone) {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
  }
}

export default ChangePhone
