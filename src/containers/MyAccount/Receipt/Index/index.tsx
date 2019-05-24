import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { ReceiptInvoiceActions, fetchReceiptInvoice, fetchReceiptInvoiceCancel } from 'actions/myAccount/receipt/index'
import { Toast } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Apply from './Apply'
import styles from './Apply.less'
import Detail from './Detail'
import Success from './Success'

export interface ReceiptProps extends ErrorObject {
  invoice: any
  url: {
    query: {
      trade_no: string
    }
  }
  isAndroidApp: boolean
  isWechat: boolean
  onReceiptInvoiceCancel: Function
}
export interface ReceiptState {}

class Receipt extends React.Component<ReceiptProps, ReceiptState> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ res, asPath, isServer }))
    if (isLogin) {
      if (query.trade_no) {
        const data = await store.dispatch(fetchReceiptInvoice({ query: { contract_no: query.trade_no }, req }))
        if (data.open_num > 0) {
          await store.dispatch(ReceiptInvoiceActions({ query: { contract_no: query.trade_no }, req }))
        }
      } else {
        return { error: { status: 500, errorMsg: '路由参数不合法' } }
      }
    }
  }
  cancelClick = async () => {
    const data = await this.props.onReceiptInvoiceCancel({ query: { contract_no: this.props.url.query.trade_no } })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      window.location.reload()
    }
  }
  render() {
    const {
      url: { query },
      invoice,
    } = this.props
    if (invoice.get('code')) {
      return <Error statusCode={invoice.get('status')} errorMsg={invoice.get('errorMsg')} />
    }
    const headerProps = {
      rightContentType: 'tabBar',
      extendHead: (
        <script
          async={true}
          id="Alipay"
          src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js"
        />
      ),
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>我的发票</Header>,
      renderTabBar: <TabBar hidden={true} />,
      className: styles.bgColor,
    }
    let TYPE
    // 1、暂无发票  2、成功申请  3、申请中 已开具发票（下拉加载）4、取消 已开具发票（下拉加载） 5、无法开票
    if (invoice.get('permission') === 0) {
      // 5、无法开票
      TYPE = 5
    } else if (invoice.get('open_num') > 0) {
      switch (invoice.get('status')) {
        case '1':
          TYPE = 3
          break
        default:
          TYPE = 4
      }
    } else {
      switch (invoice.get('status')) {
        case '0':
          TYPE = 2
          break
        default:
          TYPE = 1
      }
    }
    return (
      <Container {...containerProps}>
        {(TYPE === 1 || TYPE === 5) && <Apply contract_no={query.trade_no} TYPE={TYPE} />}
        {TYPE === 2 && <Success contract_no={query.trade_no} invoice={invoice} cancelClick={this.cancelClick} />}
        {(TYPE === 3 || TYPE === 4) && (
          <Detail
            contract_no={query.trade_no}
            TYPE={TYPE}
            invoice={invoice}
            cancelClick={this.cancelClick}
            isAndroidApp={this.props.isAndroidApp}
            isWechat={this.props.isWechat}
          />
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  invoice: state.getIn(['myAccount', 'receipt', 'invoice', 'invoice']),
  isAndroidApp: state.getIn(['serverApp', 'ua', 'isAndroidApp']),
  isWechat: state.getIn(['serverApp', 'ua', 'isWechat']),
})
const mapDispatchToProps = (dispatch: any) => ({
  onReceiptInvoiceCancel: bindActionCreators(fetchReceiptInvoiceCancel, dispatch),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Receipt)
