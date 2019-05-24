import { GetInitialPropsContext } from '@@types/next'
import * as autoRentActions from 'actions/account/auto-rent'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ButtonBox from './ButtonBox'
import ItemBox from './ItemBox'
import Top from './Top'

interface AutoRentProps extends ErrorObject {
  autoRent: any
  onAutoRentActions: any
  url: {
    query: {
      trade_no: string
      userSign?: '1'
    }
  }
}

class AutoRent extends React.Component<AutoRentProps> {
  static async getInitialProps({ store, query, req }: GetInitialPropsContext) {
    if (query.trade_no) {
      const data = await store.dispatch(autoRentActions.fetchInfo({ trade_no: query.trade_no, req }))
      if (data.status) {
        return { error: data }
      }
    } else {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
  }

  async componentDidMount() {
    const {
      url: { query },
      autoRent,
      onAutoRentActions,
    } = this.props
    if (query.userSign === '1' && autoRent.getIn(['info', 'is_withhold'])) {
      // 当页面是由签代扣完成后的异步回调回来时，页面会带有参数userSign=1， 此时应自动唤醒冻结支付弹框
      if (autoRent.getIn(['info', 'is_frozen'])) {
        // 信用卡冻结支付&&开启自动续租
        onAutoRentActions.frozenAutoRentAndOpen({ trade_no: query.trade_no })
      } else {
        // 花呗直接开启自动续租
        onAutoRentActions.openAutoRent({ trade_no: query.trade_no })
      }
    }
  }

  render() {
    const { error, url, autoRent, onAutoRentActions } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = url.query.userSign ? { onLeftClick: () => (location.href = '/account/orderlist/0') } : {}

    const containerProps = {
      renderHeader: <Header {...headerProps}>开启自动续租服务</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    const info = autoRent.get('info')
    const btnDisabled = autoRent.get('btnDisabled')

    const itemBoxProps = {
      frozenPrice: info.get('frozen_price'),
      frozenType: info.get('frozen_type'),
      onAutoRentActions,
    }

    return (
      <Container {...containerProps}>
        <Top
          isOpen={info.get('is_auto_rent')}
          rentPrice={info.get('rent_price')}
          installment={info.get('max_rent_installment')}
        />
        {info.get('is_frozen') && <ItemBox {...itemBoxProps} />}
        <ButtonBox btnDisabled={btnDisabled} query={url.query} info={info} onAutoRentActions={onAutoRentActions} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  autoRent: state.getIn(['account', 'autoRent']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onAutoRentActions: bindActionCreators(autoRentActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutoRent)
