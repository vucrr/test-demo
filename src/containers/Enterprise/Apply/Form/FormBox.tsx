import { InputItem, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { BtnSendSms, Button } from 'components'
import { createForm } from 'rc-form'
import React, { useState } from 'react'
import { validEmail, validIDCard } from 'utils/utilsValid'
import styles from './FormBox.less'
import Upload from './Upload'

export interface FormBoxProps {
  form: {
    getFieldProps: any
    validateFields: any
    getFieldValue: any
    getFieldError: any
  }
  info: any
  onApplyActions: any
}

const FormBox: React.FunctionComponent<FormBoxProps> = ({
  form: { getFieldProps, validateFields },
  info,
  onApplyActions,
}) => {
  interface FirstFormProps {}

  const FirstForm: React.FunctionComponent<FirstFormProps> = ({}) => {
    const handleValidAndSend = async (resolve: (isValid: boolean) => void) => {
      validateFields(['email'], (errors: any, values: any) => {
        if (!errors) {
          onApplyActions.verifyEmail({ email: values.email }).then((isValid: boolean) => {
            resolve(isValid)
          })
        } else {
          const errMsg = errors[Object.keys(errors)[0]].errors[0].message
          Toast.info(errMsg)
          resolve(false)
        }
      })
    }

    return (
      <>
        <h5>请填写以下信息</h5>
        <div className={styles.form_item}>
          <InputItem
            {...getFieldProps('email', {
              initialValue: '',
              rules: [{ required: true, message: '请输入您的企业邮箱' }, { validator: validEmail }],
            })}
            type="text"
            placeholder="请输入您的企业邮箱"
            clear={true}
          >
            企业邮箱
          </InputItem>
          <InputItem
            {...getFieldProps('verify_code', {
              initialValue: '',
              rules: [{ required: true, message: '请输入邮箱验证码' }],
            })}
            type="text"
            placeholder="请输入邮箱验证码"
            clear={true}
            extra={<BtnSendSms onValidAndSend={handleValidAndSend} />}
          >
            验证码
          </InputItem>
        </div>
      </>
    )
  }

  interface SecondFormProps {
    showIdCard: boolean
    showEmployeeNo: boolean
  }

  const SecondForm: React.FunctionComponent<SecondFormProps> = ({ showIdCard, showEmployeeNo }) => {
    return (
      <div className={styles.form_item}>
        {showIdCard && (
          <InputItem
            {...getFieldProps('idcard', {
              initialValue: '',
              rules: [{ required: true, message: '请输入您的身份证号' }, { validator: validIDCard }],
            })}
            type="text"
            placeholder="请输入您的身份证号"
            maxLength={18}
            clear={true}
          >
            身份证号
          </InputItem>
        )}
        {showEmployeeNo && (
          <InputItem
            {...getFieldProps('employee_no', {
              initialValue: '',
              rules: [{ required: true, message: '请输入您的工号' }],
            })}
            type="text"
            placeholder="请输入您的工号"
            maxLength={18}
            clear={true}
          >
            工号
          </InputItem>
        )}
      </div>
    )
  }

  interface UploadFormProps {
    show: boolean
  }

  const UploadForm: React.FunctionComponent<UploadFormProps> = ({ show }) => {
    if (!show) {
      return null
    }

    return (
      <div className={styles.upload_form}>
        <h5>请上传您的工牌照片</h5>
        <Upload
          // className={styles.upload}
          // selectable={getFieldValue('employee_card') && getFieldValue('employee_card').length < 1}
          {...getFieldProps('employee_card', {
            initialValue: '',
            rules: [{ required: true, message: '请上传您的工牌照片' }],
          })}
        />
      </div>
    )
  }

  interface SubmitFormProps {}

  const SubmitForm: React.FunctionComponent<SubmitFormProps> = ({}) => {
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = () => {
      if (submitting) return
      validateFields((errors: any, values: any) => {
        if (!errors) {
          setSubmitting(true)
          onApplyActions.submitBind(values).then(() => {
            setSubmitting(false)
          })
        } else {
          const errMsg = errors[Object.keys(errors)[0]].errors[0].message
          Toast.info(errMsg)
        }
      })
    }

    return (
      <div className={classnames(styles.button_box, { [styles.disabled]: submitting })}>
        <Button type="primary" onClick={handleSubmit}>
          去认证
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.form_box}>
      {FirstForm({})}
      {SecondForm({
        showIdCard: !!info.getIn(['form_field', 'idcard']),
        showEmployeeNo: !!info.getIn(['form_field', 'employee_no']),
      })}
      {UploadForm({
        show: !!info.getIn(['form_field', 'employee_card']),
      })}
      {SubmitForm({})}
    </div>
  )
}

export default createForm()(FormBox)
