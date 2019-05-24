import { GetInitialPropsContext } from '@@types/next'
import { termsAgreementActions } from 'actions/terms/agreement'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import Insurance from './Insurance'
import OrderContract from './OrderContract'

export interface Query {
  type: string // 交易号
}

export interface AssessResultProps extends ErrorObject {
  url: {
    query: Query
  }
  agreement: any
}

class AssessResult extends React.Component<AssessResultProps> {
  static async getInitialProps({ store, req, query }: GetInitialPropsContext) {
    if ((query.contract_product_id || query.trade_no) && query.type) {
      const data = await store.dispatch(termsAgreementActions({ query, req }))
      if (data.status) {
        return { error: data }
      }
    } else {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
  }

  render() {
    const {
      error,
      url: {
        query: { type },
      },
      agreement,
    } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>{type !== '2' ? '享换机用户协议' : '意外维修服务条款'}</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        {type !== '2' ? <OrderContract agreement={agreement} /> : <Insurance agreement={agreement} />}
      </Container>
    )
  }
}
const mapStateToProps = (state: any) => ({
  agreement: state.getIn(['terms', 'agreement', 'agreement']),
})

export default connect(mapStateToProps)(AssessResult)
