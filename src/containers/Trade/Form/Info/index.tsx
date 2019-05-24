import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as formActions from 'actions/trade/form'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from './Form'

interface Props {
  error: any
  data: any
  onForm: any
}

const headerProps = {
  rightContentType: 'tabBar',
}

class TradeInfoForm extends React.Component<Props> {
  static async getInitialProps({ store, query, isServer, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const data = await store.dispatch(formActions.fetchUserData({ query, req }))
      if (data.status) {
        return { error: data }
      }
    }
  }

  containerProps = {
    renderHeader: <Header {...headerProps}>{this.props.data.get('editable') ? '资料填写' : '办卡入网资料'}</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  render() {
    const { error, data, onForm } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    return (
      <Container {...this.containerProps}>
        <Form data={data} onForm={onForm} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  data: state.getIn(['trade', 'form', 'info']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onForm: bindActionCreators(formActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradeInfoForm)
