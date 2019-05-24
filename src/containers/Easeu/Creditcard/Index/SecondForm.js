import React from 'react'
import PropTypes from 'prop-types'
// import Immutable from 'immutable'
import { List, InputItem, Button, Flex, DatePicker, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { createForm } from 'rc-form'
import { Icon, Modal, ErrorMsg } from 'components'
import { validPhone } from 'utils/utilsValid'
import { padLeft } from 'utils/tools'
import { ENV } from 'utils/config'
import SmsModal from './SmsModal'
import styles from './Form.less'

const Item = List.Item

class SecondForm extends React.Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    formStatus: PropTypes.number.isRequired,
    form1: PropTypes.object.isRequired,
    changeFormStatus: PropTypes.func.isRequired,
    onCreditCardActions: PropTypes.object.isRequired,
  }

  state = {
    showModal: false,
    showSmsModal: false,
    showErrorModal: false,
    tick: 0,
    mobile: '',
    submiting: false,
  }

  componentWillUnmount() {
    clearInterval(this.tickTime)
  }

  onSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.setState({ mobile: values.phone }, () => {
          this.handleSendSMS()
        })
      }
    })
  }

  handleSendSMS = async () => {
    if (this.state.tick === 0) {
      const data = await this.props.onCreditCardActions.sendSms({
        phone: this.state.mobile.replace(/\s/g, ''),
      })
      if (['prod', 'beta'].includes(ENV)) {
        ErrorMsg.show('短信验证码已发送', 3, 'success')
      } else {
        ErrorMsg.show(`验证码：${data.code}`, 3, 'success')
      }
      this.setState({ tick: 60, showSmsModal: true })
      this.tickTime = setInterval(() => {
        this.setState(
          ({ tick }) => ({ tick: tick - 1 }),
          () => {
            if (this.state.tick === 0) {
              clearInterval(this.tickTime)
            }
          },
        )
      }, 1000)
    }
  }

  toggleTipsModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }))
  }

  toggleErrorModal = () => {
    this.setState(({ showErrorModal }) => ({ showErrorModal: !showErrorModal }))
  }

  validateCardValidity = (rule, value, callback) => {
    if (value && value.length === 3) {
      callback()
    } else {
      callback('卡背面后是三位数')
    }
  }

  formatDate = date => {
    return `${padLeft(date.getMonth() + 1)}月${date.getYear() - 100}年`
  }

  render() {
    const {
      query,
      form: { getFieldProps, getFieldsValue, getFieldError, isFieldTouched },
      formStatus,
      form1,
      changeFormStatus,
      onCreditCardActions,
    } = this.props
    const { showModal, showSmsModal, showErrorModal, tick, submiting } = this.state

    const cardValidityError = !isFieldTouched('cardValidity') || !!getFieldError('cardValidity')
    const lastNumberError = !isFieldTouched('cvn') || !!getFieldError('cvn')
    const phoneError = !isFieldTouched('phone') || !!getFieldError('phone')
    const isError = cardValidityError || lastNumberError || phoneError

    const smsModalProps = {
      mobile: this.state.mobile,
      show: showSmsModal,
      tick,
      submiting,
      onSendSMS: this.handleSendSMS,
      onSubmit: async code => {
        const form2 = getFieldsValue()
        const params = {
          name: form1.userName,
          identi_card: form1.userIdentity.replace(/\s/g, ''),
          card_id: form1.tradeCard.replace(/\s/g, ''),
          valid_end_time: `${padLeft(form2.cardValidity.getMonth() + 1)}${form2.cardValidity.getFullYear() - 2000}`,
          cvn: form2.cvn,
          phone: form2.phone.replace(/\s/g, ''),
          flow_code: query.flow_code,
          api_time: new Date().getTime(),
          code,
        }
        this.setState({ submiting: true })
        const res = await onCreditCardActions.payCredit(params)
        if (res && res.is_success) {
          window.location.href = `/easeu/trade/success/${query.flow_code}`
        } else if (res.status === 1001) {
          Toast.info(res.msg)
          this.setState({ submiting: false })
        } else {
          // 清除短信倒计时
          clearInterval(this.tickTime)
          this.setState({
            showSmsModal: false,
            showErrorModal: true,
            tick: 0,
            submiting: false,
          })
        }
      },
    }

    return (
      <div className={classnames(styles.form_wrap, formStatus === 2 && styles.active)}>
        <div className={styles.form_box}>
          <List className={styles.card_item}>
            <InputItem
              value={`信用卡(尾号${form1.tradeCard.substr(form1.tradeCard.length - 4)})`}
              editable={false}
              extra={
                <span className={styles.btn_blue} onClick={() => changeFormStatus(1)}>
                  修改
                </span>
              }
            >
              卡号
            </InputItem>
          </List>
          <List>
            <div className={styles.date_item}>
              <DatePicker
                mode="month"
                title="请选择有效期"
                minDate={new Date()}
                extra={<span className={styles.placeholder}>如：01月18年</span>}
                format={val => this.formatDate(val)}
                {...getFieldProps('cardValidity', {
                  initialValue: '',
                  rules: [{ required: true, message: '请选择有效期' }],
                })}
              >
                <Item arrow="horizontal">有效期</Item>
              </DatePicker>
            </div>
            <InputItem
              {...getFieldProps('cvn', {
                initialValue: '',
                rules: [{ required: true, message: '请输入卡背面后三位数' }, { validator: this.validateCardValidity }],
              })}
              type="number"
              placeholder="请输入卡背面后三位数"
              maxLength={3}
              extra={
                <Icon
                  className={styles.icon}
                  type={require('svg/question-circle.svg')}
                  onClick={this.toggleTipsModal}
                />
              }
              clear
            >
              安全码
            </InputItem>
            <InputItem
              {...getFieldProps('phone', {
                initialValue: '',
                rules: [{ required: true, message: '请输入预留手机号' }, { validator: validPhone }],
              })}
              type="phone"
              placeholder="请输入预留手机号"
              clear
            >
              手机号
            </InputItem>
            <Item className={styles.form_item}>
              <Flex className={styles.agree_box}>
                <Flex className={styles.check_box}>
                  <Icon type={require('svg/right.svg')} />
                </Flex>
                <span>
                  我已同意
                  <span className={styles.blue} onClick={() => changeFormStatus(3)}>
                    《分期合同》
                  </span>
                </span>
              </Flex>
              <Button className={styles.btn_submit} disabled={isError} type="primary" onClick={this.onSubmit}>
                确认
              </Button>
            </Item>
          </List>
        </div>
        <Modal
          visible={showModal}
          title={
            <div className={styles.modal_title}>
              信用卡背面三位数
              <Icon className={styles.btn_close} type={require('svg/close.svg')} onClick={this.toggleTipsModal} />
            </div>
          }
          onClose={this.toggleTipsModal}
        >
          <div className={styles.tips_body}>
            <span>请查看下图所示位置</span>
            <img src="http://test7.easeuastatic.t.xianghuanji.com/images/trade/creditcard.png" />
          </div>
        </Modal>
        {showSmsModal && <SmsModal {...smsModalProps} />}
        <Modal
          className={styles.error_modal}
          visible={showErrorModal}
          title={<div className={styles.modal_title}>温馨提示</div>}
          onClose={this.toggleErrorModal}
          btnText="我知道了"
        >
          <div className={styles.error_body}>
            <span>真抱歉，您输入的密码、有效期或CVN2有误，请重新输入！如有疑问请联系乐百分客服4008-844-833</span>
          </div>
        </Modal>
      </div>
    )
  }
}

export default createForm()(SecondForm)
