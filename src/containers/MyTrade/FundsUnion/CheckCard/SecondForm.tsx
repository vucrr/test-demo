import { CreateStrategyPayParams } from 'actions/myTrade/order/pay'
import { InputItem, List, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { Button, Router, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventFundsUnion } from 'configs/trackEventLabels'
import { createForm } from 'rc-form'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import { formatPhone } from 'utils/tools'
import styles from './Form.less'

interface SecondFormProps extends withLoadingProps {
  cardInfo: any
  onFundsUnionActions: any
  form: any
  step: string
  billNo: string
  query: CreateStrategyPayParams & { formStatus: string; sendSms?: boolean; redirect: string }
  ua: any
}

interface SecondFormState {
  tickTime: number
}

class SecondForm extends React.Component<SecondFormProps, SecondFormState> {
  readonly state = {
    tickTime: 0,
  }

  componentDidMount() {
    const { sendSms } = this.props.query
    if (sendSms) {
      if (this.state.tickTime === 0) {
        this.renderTick(60)
      }
    }
  }

  componentWillReceiveProps(nextProps: SecondFormProps) {
    if (nextProps.step === '2' && this.props.step === '1') {
      if (this.state.tickTime === 0) {
        this.renderTick(60)
      }
    }
  }

  renderTick = (tick: number) => {
    this.setState({ tickTime: tick - 1 }, () => {
      if (this.state.tickTime > 0) {
        setTimeout(() => this.renderTick(this.state.tickTime), 1000)
      }
    })
  }

  handleRenderTick = async () => {
    if (this.state.tickTime === 0) {
      const data = await this.props.onFundsUnionActions.fetchOTPRePeat(this.props.billNo)
      if (data) {
        this.renderTick(60)
      }
    }
  }

  validateCode = (_: any, value: string, callback: Function) => {
    if (value && value.length !== 6) {
      callback('短信验证码为6位')
    } else {
      callback()
    }
  }

  onSubmit = () => {
    trackClickEvent({ category: TrackEventFundsUnion.Confirm.Name, label: TrackEventFundsUnion.Confirm.Item1 })
    this.props.form.validateFields(async (errors: any, values: any) => {
      if (!errors) {
        this.props.setLoading(true)
        const data = await this.props.onFundsUnionActions.bindCard({
          OTPBillNo: this.props.billNo,
          verifyCode: values.verifyCode,
        })
        if (data) {
          const { redirect } = this.props.query
          await Router.push(redirect)
        }
        this.props.setLoading(false)
      } else {
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        Toast.info(errMsg)
      }
    })
  }

  render() {
    const {
      loading,
      cardInfo,
      step,
      ua,
      form: { getFieldProps },
    } = this.props
    const { tickTime } = this.state
    const isApp = ua.get('isApp')
    return (
      <div className={classnames(styles.form_wrap, step === '2' && styles.active, isApp && styles.isInApp)}>
        <div className={styles.title_box}>
          <p className={styles.title}>验证码已发送至您的手机</p>
          <p>{formatPhone(cardInfo.get('tel'))}</p>
        </div>
        <List className={styles.form_box}>
          <InputItem
            {...getFieldProps('verifyCode', {
              initialValue: cardInfo.get('verifyCode') || '',
              rules: [{ required: true, message: '请输入验证码' }, { validator: this.validateCode }],
            })}
            type="number"
            placeholder="请输入验证码"
            maxLength={6}
            clear={true}
            className={styles.input_sms}
            extra={
              <div
                className={classnames(styles.btn_sms, tickTime > 0 && styles.disabled)}
                onClick={this.handleRenderTick}
              >
                {tickTime > 0 ? `${tickTime}s` : '重新获取'}
              </div>
            }
          />
        </List>
        <div>
          <Button disabled={loading} type="primary" onClick={this.onSubmit}>
            确认
          </Button>
        </div>
      </div>
    )
  }
}

export default withLoading(createForm()(SecondForm))
