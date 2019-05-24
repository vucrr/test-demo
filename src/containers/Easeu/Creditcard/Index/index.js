import React from 'react'
import PropTypes from 'prop-types'
// import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Error from 'containers/Error'
import * as creditCardActions from 'actions/easeu/credit-card'
import { Container, Header } from 'components'
import FirstForm from './FirstForm'
import SecondForm from './SecondForm'
import Terms from './Terms'

class CreditcardIndex extends React.Component {
  static propTypes = {
    // trade: PropTypes.instanceOf(Immutable.Map).isRequired,
    query: PropTypes.object.isRequired,
    error: PropTypes.object,
    onCreditCardActions: PropTypes.object.isRequired,
  }

  static getInitialProps = async ({ query }) => {
    if (query.flow_code) {
      // await store.dispatch(creditCardActions.sendSms({ query }))
      return {
        query,
      }
    }
    return { error: { status: 404, errorMsg: '' } }
  }

  state = {
    formStatus: 1, // 表单状态 1: 第一步 2: 第二步；3: 显示条款
    form1: {
      tradeCard: '',
    },
  }

  render() {
    const { error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const { formStatus, form1 } = this.state
    const { onCreditCardActions, query } = this.props

    const headerProps = {
      1: {},
      2: {
        onLeftClick: () => {
          this.setState({ formStatus: 1 })
        },
      },
      3: {
        onLeftClick: () => {
          this.setState({ formStatus: 2 })
        },
      },
    }[formStatus]

    const containerProps = {
      renderHeader: <Header {...headerProps}>{formStatus === 3 ? '分期合同' : '填写信用卡信息'}</Header>,
    }

    const changeFormStatus = status => {
      this.setState({ formStatus: status })
    }

    const firstFormProps = {
      formStatus,
      onSubmit: values => {
        this.setState({ form1: values, formStatus: 2 })
      },
    }

    const secondFormProps = {
      query,
      form1,
      formStatus,
      changeFormStatus,
      onCreditCardActions,
    }

    const termsProps = {
      formStatus,
    }

    return (
      <Container {...containerProps}>
        <FirstForm {...firstFormProps} />
        <SecondForm {...secondFormProps} />
        <Terms {...termsProps} />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  trade: state.getIn(['easeu', 'trade', 'index']),
})

const mapDispatchToProps = dispatch => ({
  onCreditCardActions: bindActionCreators(creditCardActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreditcardIndex)
