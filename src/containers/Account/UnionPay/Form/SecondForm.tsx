import { Flex, InputItem, List, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { Button, Link, Switch } from 'components'
import { createForm } from 'rc-form'
import React from 'react'
import { formatPhone } from 'utils/tools'
import styles from './Form.less'

const Item = List.Item

interface FirstFormProps {
  unionPayForm: any
  onUnionPayActions: any
  form: any
  step: string
  redirect?: string
}

interface FirstFormState {
  tickTime: number
}

class SecondForm extends React.Component<FirstFormProps, FirstFormState> {
  readonly state = {
    tickTime: 0,
  }

  componentWillUnmount() {
    const form = this.props.form.getFieldsValue()
    this.props.onUnionPayActions.saveSmsFileds({ verifyCode: form.verifyCode })
  }

  componentWillReceiveProps(nextProps: FirstFormProps) {
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

  handleRenderTick = () => {
    if (this.state.tickTime === 0) {
      this.renderTick(60)
      this.props.onUnionPayActions.sendSms({ tradeNo: this.props.unionPayForm.get('tradeNo') })
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
    const { redirect } = this.props
    this.props.form.validateFields((errors: any, values: any) => {
      if (!errors) {
        this.props.onUnionPayActions.onSubmit({
          tradeNo: this.props.unionPayForm.get('tradeNo'),
          verifyCode: values.verifyCode,
          redirect,
        })
      } else {
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        Toast.info(errMsg)
      }
    })
  }

  render() {
    const {
      unionPayForm,
      step,
      form: { getFieldProps },
    } = this.props
    const { tickTime } = this.state

    const termConfig = {
      valuePropName: 'checked',
      initialValue: true,
      rules: [
        {
          validator(_: any, value: boolean, cb: Function) {
            return !value ? cb('请阅读并同意条款') : cb()
          },
        },
      ],
    }

    return (
      <div className={classnames(styles.form_wrap, step === '2' && styles.active)}>
        <div className={styles.title_box}>
          <p className={styles.title}>验证码已发送至您的手机</p>
          <p>{formatPhone(unionPayForm.get('tel'))}</p>
        </div>
        <List className={styles.form_box}>
          <InputItem
            {...getFieldProps('verifyCode', {
              initialValue: unionPayForm.get('verifyCode') || '',
              rules: [{ required: true, message: '请输入短信验证码' }, { validator: this.validateCode }],
            })}
            type="number"
            placeholder="请输入短信验证码"
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
          <Item className={styles.termsWrapper}>
            <Flex>
              <Switch {...getFieldProps('agree', termConfig)}>
                <span>我已阅读并同意</span>
              </Switch>
              <Link
                to={`/terms/union-card?bank=${unionPayForm.get('bankName')}&name=${unionPayForm.get('realName')}`}
                className={styles.term}
              >
                《委托扣款三方协议》
              </Link>
            </Flex>
          </Item>
          <div>
            <Button className={styles.btn_submit} type="primary" onClick={this.onSubmit}>
              立即绑定
            </Button>
          </div>
        </List>
      </div>
    )
  }
}

export default createForm()(SecondForm)
