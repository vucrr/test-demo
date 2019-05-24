import { saveInvoiceEmail } from 'actions/myAccount/receipt/sendEmail'
import { Toast } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Router from 'next/router'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Detail from './Detail'

export interface SendEmailProps extends ErrorObject {
  invoice: any
  url: {
    query: {
      record_id: string
      email: string
    }
  }
  onsaveInvoiceEmail: Function
}
export interface SendEmailState {}

class SendEmail extends React.Component<SendEmailProps, SendEmailState> {
  handleClick = async (query: any) => {
    const data = await this.props.onsaveInvoiceEmail({ query: { ...query, record_id: this.props.url.query.record_id } })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      Toast.info('发送成功')
      setTimeout(async () => {
        Router.back()
      }, 2000)
    }
  }
  render() {
    const {
      error,
      url: {
        query: { email },
      },
    } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    // 1、暂无发票  2、成功申请  3、已开具发票（下拉加载）  4、无法开票
    const containerProps = {
      renderHeader: <Header>发送到邮箱</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        <Detail handleClick={this.handleClick} email={email} />
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onsaveInvoiceEmail: bindActionCreators(saveInvoiceEmail, dispatch),
})
export default connect(
  null,
  mapDispatchToProps,
)(SendEmail)
