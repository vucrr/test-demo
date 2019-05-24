import { GetInitialPropsContext } from '@@types/next'
import { termsAgreementActions } from 'actions/terms/agreement'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import CreditAndInfo from './CreditAndInfo'
import RentContract from './RentContract'
import Withhold from './Withhold'

interface Props {
  info: any
  url: {
    query: {
      crop_code: any
      user_code: any
    }
  }
}
class FundsUnionItem extends React.Component<Props & ErrorObject> {
  static async getInitialProps({ store, req, query }: GetInitialPropsContext) {
    if (query.trade_no || query.contract_product_id) {
      const data = await store.dispatch(
        termsAgreementActions({ query: { ...query, type: query.user_code ? '3' : '1' }, req }),
      )
      if (data.status) {
        return { error: data }
      }
    } else {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
  }
  // 合同上有四个章  用户有三个 公司有一个
  render() {
    const {
      error,
      info,
      url: {
        query: { crop_code, user_code },
      },
    } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>融资租赁合同</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        <RentContract info={info} crop_code={crop_code} user_code={user_code} />
        <CreditAndInfo info={info} user_code={user_code} />
        <Withhold info={info} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  info: state.getIn(['terms', 'agreement', 'agreement']),
})

export default connect(mapStateToProps)(FundsUnionItem)
