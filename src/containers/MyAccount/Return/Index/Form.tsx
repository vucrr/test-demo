import { InputItem, List, Modal } from 'antd-mobile'
import { Button, CaptchaButton } from 'components'
import { SMS_TYPES } from 'constant/common'
import Router from 'next/router'
import { createForm } from 'rc-form'
import React from 'react'
import { validPhone } from 'utils/utilsValid'
import styles from './Form.less'
import { ReturnVia } from './index'

interface FormProps {
  form?: any
  via: string
  returnPhone: any
  tradeNo: string
  storeId: string
}

const ModalHeader = () => (
  <div className={styles.header}>
    <img src={require('images/account/return/header.png')} alt="" />
    <p>申请成功</p>
  </div>
)

class Form extends React.Component<FormProps> {
  static defaultProps = {
    storeId: '',
  }

  submit = async () => {
    const {
      form: { getFieldValue },
      returnPhone,
      tradeNo,
      via,
      storeId,
    } = this.props
    const body = {
      trade_no: tradeNo,
      return_type: via === ReturnVia.Store ? 1 : 2,
      user_phone: getFieldValue('phone'),
      sms_code: getFieldValue('vericode'),
      sms_type: 'returnPhone',
      ahs_store_id: storeId || '',
      express_number: getFieldValue('express'),
    }
    await returnPhone.applyReturnPhone(body)
    Modal.alert(
      <ModalHeader />,
      '还机后没手机用了？先租个新机用起来吧!',
      [
        {
          text: '暂不',
          onPress: async () => {
            await Router.replace({
              pathname: Router.router!.pathname,
              query: {
                ...Router.router!.query,
                type: 'detail',
              },
            })
          },
        },
        {
          text: '选新机',
          onPress: async () => {
            await Router.push('/product/category')
          },
        },
      ],
      'android',
    )
  }

  renderExpressCodeInput() {
    const {
      form: { getFieldProps },
    } = this.props
    return (
      <InputItem
        {...getFieldProps('express', {
          initialValue: '',
          rules: [{ required: true, message: '请输入邮寄的物流单号' }],
        })}
        placeholder="请输入邮寄的物流单号"
      >
        物流单号
      </InputItem>
    )
  }

  render() {
    const {
      via,
      form: { getFieldProps, getFieldsError, isFieldTouched, getFieldValue },
    } = this.props

    const getDisabled = () => {
      const fields = via === ReturnVia.Express ? ['phone', 'vericode', 'express'] : ['phone', 'vericode']
      const touched = fields.every(isFieldTouched)
      const error = Object.values(getFieldsError(fields)).some(v => String(v) !== 'undefined')
      const biz = via === ReturnVia.Store ? Boolean(this.props.storeId) : true
      return !touched || error || !biz
    }

    return (
      <>
        <List className={styles.container}>
          <div className={styles.phoneInput}>
            <InputItem
              {...getFieldProps('phone', {
                initialValue: '',
                rules: [{ required: true, message: '请输入手机号' }, { validator: validPhone }],
              })}
              maxLength={11}
              placeholder="请输入手机号"
            >
              手机号
            </InputItem>
            <CaptchaButton
              phone={getFieldValue('phone')}
              type={SMS_TYPES.QsyReturnPhone}
              buttonClassName={styles.verify}
            />
          </div>
          <InputItem
            {...getFieldProps('vericode', {
              initialValue: '',
              rules: [{ required: true, message: '请输入验证码', len: 4 }],
            })}
            placeholder="请输入验证码"
            maxLength={4}
          >
            验证码
          </InputItem>
          {via === ReturnVia.Express ? this.renderExpressCodeInput() : <></>}
        </List>
        <div className={styles.submit}>
          <Button type="primary" fixed={true} onClick={this.submit} disabled={getDisabled()}>
            提交申请
          </Button>
        </div>
      </>
    )
  }
}

export default createForm()(Form)
