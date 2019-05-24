import { saveInvoiceApply } from 'actions/myAccount/receipt/form'
import { Toast } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Router from 'next/router'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Detail from './Detail'
import styles from './index.less'

export interface FormProps extends ErrorObject {
  invoice: any
  url: {
    query: {
      contract_no: string
      open_type?: string
    }
  }
  onSaveInvoiceApply: Function
}
export interface FormState {}

class Form extends React.Component<FormProps, FormState> {
  handleClick = async (query: any) => {
    const data = await this.props.onSaveInvoiceApply({ query: { ...query, ...this.props.url.query } })
    if (data.errorMsg) {
      Toast.info(data.errorMsg)
    } else {
      Router.back()
    }
  }
  render() {
    const { error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const containerProps = {
      renderHeader: <Header>开具电子发票</Header>,
      renderTabBar: <TabBar hidden={true} />,
      className: styles.bg_color,
    }
    return (
      <Container {...containerProps}>
        <Detail handleClick={this.handleClick} openType={this.props.url.query.open_type} />
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onSaveInvoiceApply: bindActionCreators(saveInvoiceApply, dispatch),
})
export default connect(
  null,
  mapDispatchToProps,
)(Form)
