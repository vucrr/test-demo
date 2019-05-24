import { InputItem, Toast } from 'antd-mobile'
import { Button, CaptchaButton } from 'components'
import { SMS_TYPES } from 'constant/common'
import { OperateType } from 'containers/MyAccount/Bind/BindPhone'
import { createForm } from 'rc-form'
import React from 'react'
import cookies from 'utils/cookies'
import { getDomain } from 'utils/tools'
import { validPhone } from 'utils/utilsValid'
import styles from './ChangePhoneForm.less'

interface InjectedProps {
  url: any
  form: any
  verifySMSAndValidateUser: Function
}

interface ChangePhoneFormState {
  showDialog: boolean
  countdown: number
  isCounting: boolean
  tip: string
}

class ChangePhoneForm extends React.Component<{} & InjectedProps, ChangePhoneFormState> {
  static ToastMsgMap: { [key: string]: string } = {
    [OperateType.NoSupportMerge]: '手机号已占用',
    [OperateType.SameAccount]: '该手机号已绑定',
    [OperateType.VeriCodeOutOfTime]: '验证码超时，请重新获取验证码',
    [OperateType.VeriCodeError]: '验证码错误，请重新输入',
  }
  submit = async () => {
    const {
      verifySMSAndValidateUser,
      form: { getFieldValue },
      url,
    } = this.props
    const phone = getFieldValue('phone')
    const code = getFieldValue('validationCode')
    const data = await verifySMSAndValidateUser(phone, code, SMS_TYPES.ChangeBind)
    const type = data.operate_type

    if (type) {
      if (type === OperateType.BindSuccess) {
        Toast.info('绑定成功')
        const domain = getDomain(location.hostname)
        cookies.set('user_id_v2', data.user_id, { expires: 30, domain })
        cookies.set('userToken', data.user_token, { expires: 30, domain })
        if (url.query.redirect) window.location.replace(url.query.redirect)
      } else {
        Toast.info(ChangePhoneForm.ToastMsgMap[type])
      }
    } else {
      // 验证码出错
      Toast.info(data.errorMsg)
    }
  }

  render() {
    const {
      form: { getFieldProps, getFieldError, isFieldTouched, getFieldValue },
    } = this.props

    const phoneError = getFieldError('phone') ? getFieldError('phone').join(',') : ''
    const validationCodeError = getFieldError('validationCode') ? getFieldError('validationCode').join(',') : ''
    const disabledSubmit =
      !isFieldTouched('phone') ||
      Boolean(phoneError) ||
      !isFieldTouched('validationCode') ||
      Boolean(validationCodeError)

    return (
      <>
        <div className={styles.formBox}>
          <div className={styles.firstItem}>
            <InputItem
              name="phone"
              {...getFieldProps('phone', {
                initialValue: '',
                rules: [{ required: true, message: '请输入手机号码' }, { validator: validPhone }],
              })}
              clear={true}
              className={styles.input}
              placeholder="请输入手机号"
            />
            <CaptchaButton phone={getFieldValue('phone')} type={SMS_TYPES.ChangeBind} buttonClassName={styles.verify} />
          </div>
          <div className={styles.secondItem}>
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
          </div>
          <div className={styles.btnBox}>
            <Button type="primary" disabled={disabledSubmit} className={styles.btnSubmit} onClick={this.submit}>
              立即绑定
            </Button>
          </div>
        </div>
      </>
    )
  }
}

export default createForm()(ChangePhoneForm)
