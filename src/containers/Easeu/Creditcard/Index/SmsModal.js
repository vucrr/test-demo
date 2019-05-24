import React from 'react'
import PropTypes from 'prop-types'
import { Button, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import { Modal } from 'components'
import styles from './SmsModal.less'

class SmsModal extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    tick: PropTypes.number.isRequired,
    mobile: PropTypes.string.isRequired,
    submiting: PropTypes.bool.isRequired,
    onSendSMS: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  onSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.onSubmit(values.code)
      }
    })
  }

  validateCode = (rule, value, callback) => {
    if (value && value.length !== 4) {
      callback('短信验证码为4位')
    } else {
      callback()
    }
  }

  render() {
    // const { tick } = this.state
    const {
      form: { getFieldProps, getFieldError, isFieldTouched },
      show,
      tick,
      submiting,
      onSendSMS,
    } = this.props

    const codeError = !isFieldTouched('code') || !!getFieldError('code')
    const isError = codeError

    return (
      <Modal className="sms-modal" visible={show} maskClosable={false} onClose={this.toggleTipsModal}>
        <div className={styles.modal_body}>
          <div className={styles.title}>
            <span>银行预留手机号</span>
            <span className={styles.phone}>{this.props.mobile}</span>
          </div>
          <div className={styles.item}>
            <InputItem
              {...getFieldProps('code', {
                initialValue: '',
                rules: [{ required: true, message: '请输入短信验证码' }, { validator: this.validateCode }],
              })}
              type="number"
              maxLength={4}
              placeholder="请输入短信验证码"
            />
            <span onClick={onSendSMS}>{tick > 0 ? `${tick}s` : '重发'}</span>
          </div>
          <div className={styles.tips}>输入短信验证码后，点击冻结，即完成订单</div>
          <Button disabled={isError || submiting} className={styles.btn_submit} type="primary" onClick={this.onSubmit}>
            马上冻结
          </Button>
        </div>
      </Modal>
    )
  }
}

export default createForm()(SmsModal)
