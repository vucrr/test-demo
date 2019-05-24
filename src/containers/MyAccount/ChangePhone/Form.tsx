import { verifySMS } from 'actions/captcha'
import { InputItem, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { Button, CaptchaButton } from 'components'
import { SMS_TYPES } from 'constant/common'
import Router from 'next/router'
import { createForm } from 'rc-form'
import React from 'react'
import { connect } from 'react-redux'
import { formatPhone } from 'utils/tools'
import styles from './Form.less'

interface FormProps {
  query: {
    phone: string
  }
}

interface InjectedProps {
  form: any
  verifySMS: any
}

class Form extends React.Component<FormProps & InjectedProps> {
  readonly state = {
    transform: false,
  }

  timer = 0

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer)
  }

  forward = () => {
    this.setState({ transform: true })
  }

  handleSubmit = async () => {
    const {
      form: { getFieldValue },
      query,
      verifySMS,
    } = this.props
    const phone = query.phone
    const code = getFieldValue('validationCode')
    const data = await verifySMS(phone, code, SMS_TYPES.ChangePhone)
    if (data.verify_res) {
      await Router.push({
        pathname: '/myaccount/bind/change-phone',
        query: {
          redirect: '/account/info',
        },
      })
    } else {
      Toast.info(data.errorMsg)
    }
  }

  get disabled() {
    const {
      form: { getFieldValue, getFieldError },
    } = this.props
    return !getFieldValue('validationCode') || getFieldError('validationCode')
  }

  render() {
    const {
      form: { getFieldProps },
      query: { phone },
    } = this.props
    const innerStyles = classnames(styles.inner, this.state.transform && styles.show)
    return (
      <div className={styles.container}>
        <div className={innerStyles}>
          <section className={styles.firstForm}>
            <p className={styles.title}>当前手机号</p>
            <p className={styles.phone}>{formatPhone(phone)}</p>
            <p className={styles.tip}>
              更换手机号不影响您的订单信息、身份认证、信用足迹等账户信息；更改后，请用新手机号登录。
            </p>
            <Button type="primary" onClick={this.forward}>
              更换手机号
            </Button>
          </section>
          <section className={styles.secondForm}>
            <p className={styles.title}>验证码已发送至您的手机</p>
            <p className={styles.title}>{formatPhone(phone)}</p>
            <div className={styles.inputWrapper}>
              <InputItem
                name="validationCode"
                {...getFieldProps('validationCode', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入短信验证码', len: 4 }],
                })}
                className={styles.input}
                clear={true}
                maxLength={4}
                placeholder="请输入验证码"
              />
              <CaptchaButton
                phone={phone}
                buttonClassName={styles.verify}
                dialogClassName={styles.dialog}
                type={SMS_TYPES.ChangePhone}
              />
            </div>
            <Button type="primary" disabled={this.disabled} onClick={this.handleSubmit}>
              更换手机号
            </Button>
          </section>
        </div>
      </div>
    )
  }
}

const mapDispatch = {
  verifySMS,
}

export default connect(
  null,
  mapDispatch,
)(createForm()(Form))
