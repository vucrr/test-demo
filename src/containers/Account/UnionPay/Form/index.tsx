import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import * as unionPayActions from 'actions/account/unionPay'
import { checkLogin } from 'actions/app'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FirstForm from './FirstForm'
import SecondForm from './SecondForm'

interface UnionPayFormProps extends ErrorObject {
  url: {
    query: {
      step: '1' | '2'
      redirect?: string
    }
  }
  unionPayForm: any
  onUnionPayActions: any
  checkBankList: any
}

const UnionPayForm: NextSFC2<UnionPayFormProps> = ({
  error,
  url: { query },
  unionPayForm,
  checkBankList,
  onUnionPayActions,
}) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const headerProps: any = {
    rightContentType: 'tabBar',
  }
  if (query.step === '2') {
    headerProps.onLeftClick = async () => {
      await Router.replace(`/account/unionPay/form?step=1&redirect=${query.redirect}`)
    }
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>添加银行卡</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const formProps = {
    unionPayForm,
    checkBankList,
    onUnionPayActions,
    step: query.step,
    redirect: query.redirect,
  }

  return (
    <Container {...containerProps}>
      <FirstForm {...formProps} />
      <SecondForm {...formProps} />
    </Container>
  )
}

UnionPayForm.getInitialProps = async ({ store, query, isServer, res, asPath, req }: GetInitialPropsContext) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    if (query.step === '1') {
      const data = await store.dispatch(unionPayActions.fetchForm({ req }))
      if (data.status > 200) return { error: data }
    }
  }
}

const mapStateToProps = (state: any) => ({
  unionPayForm: state.getIn(['account', 'unionPay', 'form']),
  checkBankList: state.getIn(['account', 'unionPay', 'checkBankList']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onUnionPayActions: bindActionCreators(unionPayActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnionPayForm)
