import { Flex, InputItem, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { withLoading } from 'components'
import { createForm } from 'rc-form'
import * as React from 'react'
import { validPhone, validTrim } from 'utils/utilsValid'
import styles from './Detail.less'
export interface MobileProps {
  form: any
  onCreditSms: Function
  saveMobile: Function
  disable: boolean
  saveSmsCode: Function
  cookie: any
  mobile: any
}

export interface MobileState {
  checked: boolean
  date: any
  status: boolean
  tick: number
  MsgPhone: string
}

class Mobile extends React.Component<MobileProps, MobileState> {
  readonly state: MobileState = {
    checked: true,
    date: '',
    status: true,
    tick: 60,
    MsgPhone: '获取验证码',
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  timer = 0
  mobileTimer = () => {
    this.setState(
      ({ tick }) => ({ tick: tick - 1 }),
      () => {
        if (this.state.tick === 0) {
          clearInterval(this.timer)
          this.setState({ tick: 60, MsgPhone: '重新获取' })
        }
      },
    )
    return this.mobileTimer
  }
  onPhone = () => {
    this.props.form.validateFields(async (errors: any, values: any) => {
      // 没有改变数据多次点击 errors === null
      if ((errors === null && values.mobile) || !errors.mobile) {
        this.timer = window.setInterval(this.mobileTimer(), 1000)
        const data = await this.props.onCreditSms({ query: { mobile: values.mobile.replace(/\s/g, '') } })
        if (data && data.msg) {
          Toast.info(data.msg)
        } else if (data.mobile) {
          this.props.saveMobile(data.mobile)
        } else if (data.errorMsg) {
          Toast.info(data.errorMsg)
        }
      } else {
        const errMsg = errors.mobile.errors[0].message
        Toast.info(errMsg)
      }
    })
  }
  handlePhone = (phone: any) => {
    this.props.saveMobile(phone)
  }
  handleCheck = (SmsCode: any) => {
    this.props.saveSmsCode(SmsCode)
  }
  render() {
    const { form, disable, cookie, mobile } = this.props
    const getFieldProps = form.getFieldProps
    return (
      <div className={styles.credit_form}>
        <Flex className={styles.item} justify="between">
          <Flex className={styles.item_left}>
            <span>手机号</span>
            <InputItem
              {...getFieldProps('mobile', {
                initialValue: cookie.get('phone') || '',
                rules: [{ required: true, message: '请输入正确的银行预留手机号' }, { validator: validPhone }],
                onChange: this.handlePhone,
              })}
              maxLength={11}
              className={styles.input}
              disabled={disable}
              clear={true}
              type={'number'}
              placeholder={'请输入预留手机号'}
            />
          </Flex>
          {this.state.tick === 60 ? (
            <p onClick={this.onPhone} className={classnames(!mobile && styles.no_Click)}>
              {this.state.MsgPhone}
            </p>
          ) : (
            <p className={styles.no_Click}>{this.state.tick}s</p>
          )}
        </Flex>
        <Flex className={styles.item}>
          <span>验证码</span>
          <InputItem
            {...getFieldProps('sms_code', {
              initialValue: cookie.get('sms_code') || '',
              rules: [{ required: true, message: '请输入正确的验证码' }, { validator: validTrim }],
              onChange: this.handleCheck,
            })}
            maxLength={6}
            disabled={disable}
            className={styles.input}
            clear={true}
            type={'number'}
            placeholder={'请输入短信验证码'}
          />
        </Flex>
      </div>
    )
  }
}

export default withLoading(createForm()(Mobile))
