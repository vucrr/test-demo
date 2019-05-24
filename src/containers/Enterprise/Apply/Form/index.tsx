import { NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as applyActions from 'actions/enterprise/apply'
import { Container, Header, TabBar, Wrap } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FormBox from './FormBox'

export interface FormQuery {}

interface FormProps extends ErrorObject {
  query: FormQuery
  form: any
  onApplyActions: any
}

const Form: NextSFC2<FormProps> = ({ error, form, onApplyActions }: FormProps) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>员工认证</Header>,
    renderTabBar: <TabBar hidden={true} />,
    bgColor: '#fff',
  }

  return (
    <Container {...containerProps}>
      <Wrap size="xl">
        <FormBox info={form} onApplyActions={onApplyActions} />
      </Wrap>
    </Container>
  )
}

Form.getInitialProps = async ({ store, isServer, res, asPath }: any) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (!isLogin) return
}

const mapStateToProps = (state: any) => ({
  form: state.getIn(['enterprise', 'apply', 'form']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onApplyActions: bindActionCreators(applyActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form)
