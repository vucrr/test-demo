import { NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as cancelActions from 'actions/myAccount/service/cancel'
import { Container, Header, TabBar, Wrap } from 'components'
import Error from 'containers/Error'
import { ReasonInfo } from 'interfaces/account/service/cancel'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PriceBox from './PriceBox'
import ProductBox from './ProductBox'
import SelectBox from './SelectBox'

export interface ServiceCancelQuery {
  type: '1' | '2' | '7' // 1、待发货取消，2、审核中取消 7、取消换机
  contract_no: string
}

interface ServiceCancelProps {
  query: ServiceCancelQuery
  info: any
  onCancelActions: any
}

const getOptions = (options: ReasonInfo[]) => {
  return options.map(item => ({ label: item.reason_text, value: item.reason_id }))
}

const ServiceCancel: NextSFC2<ServiceCancelProps & ErrorObject> = ({ error, query, info, onCancelActions }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    bgColor: '#fff',
    renderHeader: <Header>取消服务</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const productBoxProps = {
    type: info.get('contract_type'),
    oldSku: info.get('old_sku_info'),
    sku: info.get('sku_info'),
  }

  return (
    <Container {...containerProps}>
      <Wrap size="md">
        <ProductBox {...productBoxProps} />
        <SelectBox
          query={query}
          options={getOptions(info.get('reason_info').toJS())}
          confirmText={info.getIn(['confirm_layer', 'text'])}
          onCancelActions={onCancelActions}
        />
        {+info.get('release_price') > 0 && (
          <PriceBox price={info.get('release_price')} text={info.get('release_text')} />
        )}
      </Wrap>
    </Container>
  )
}

ServiceCancel.getInitialProps = async ({ store, query, isServer, res, asPath, req }) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    const data = await store.dispatch(
      cancelActions.fetchInfo({ contract_no: query.contract_no, type: query.type }, req),
    )
    if (data.status) {
      return { error: data }
    }
  }
}

const mapStateToProps = (state: any) => ({
  info: state.getIn(['myAccount', 'service', 'cancel', 'info']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onCancelActions: bindActionCreators(cancelActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceCancel)
