import { CreateStrategyPayParams } from 'actions/myTrade/order/pay'
import { InputItem, List, Toast } from 'antd-mobile'
import { Button, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventFundsUnion } from 'configs/trackEventLabels'
import Router from 'next/router'
import qs from 'querystring'
import { createForm } from 'rc-form'
import React from 'react'
import { ENV } from 'utils/config'
import { trackClickEvent } from 'utils/piwik'
import { validPhone, validUnionBankCard } from 'utils/utilsValid'
import styles from './Form.less'

const isTest = ['dev', 'test'].includes(ENV)

interface FirstFormProps extends withLoadingProps {
  cardInfo: any
  checkBankList: any
  onFundsUnionActions: any
  form: any
  query: CreateStrategyPayParams & { formStatus: string }
}

class FirstForm extends React.Component<FirstFormProps, {}> {
  componentWillUnmount() {
    const form = this.props.form.getFieldsValue()
    this.props.onFundsUnionActions.saveFormFields({ form: form || {} })
  }

  componentWillReceiveProps(nextProps: FirstFormProps) {
    // 提交成功后清除相关数据
    if (nextProps.cardInfo.get('hasSubmit') && !this.props.cardInfo.get('hasSubmit')) {
      this.props.form.setFieldsValue({
        cardNo: '',
        tel: '',
      })
    }
  }

  renderHeader: any = () => (
    <div className={styles.header}>
      <h4>请输入银行卡信息，增加信用担保</h4>
      <span>已为您智能加密，保障您的用卡安全</span>
    </div>
  )

  onSubmit = () => {
    trackClickEvent({
      category: TrackEventFundsUnion.CheckCardContinue.Name,
      label: TrackEventFundsUnion.CheckCardContinue.Item,
    })
    this.props.form.validateFields(async (errors: any, values: any) => {
      const { cardInfo, onFundsUnionActions, query, setLoading } = this.props
      if (!errors) {
        setLoading(true)
        const data = await this.props.onFundsUnionActions.fetchOTP({
          ...values,
          userName: cardInfo.get('realName'),
          idCard: cardInfo.get('idNo'),
          payNo: query.pay_no,
        })
        if (data) {
          await onFundsUnionActions.getBillNo(data)
          const form = this.props.form.getFieldsValue()
          await onFundsUnionActions.saveFormFields({ form })
          const { formStatus, ...reset } = query
          await Router.push(`/mytrade/funds-union/check-card?formStatus=2&${qs.stringify(reset)}`)
        }
        setLoading(false)
      } else {
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        Toast.info(errMsg)
      }
    })
  }

  render() {
    const {
      cardInfo,
      loading,
      form: { getFieldProps },
    } = this.props

    return (
      <>
        <List className={styles.form_box} renderHeader={this.renderHeader}>
          <InputItem value={cardInfo.get('realName')} editable={false} type="text">
            持卡人
          </InputItem>
          <InputItem value={cardInfo.get('idNo')} editable={false} type="text">
            身份证号
          </InputItem>
          <InputItem
            {...getFieldProps('cardNo', {
              initialValue: '',
              rules: isTest
                ? [{ required: true, message: '请输入银行卡卡号' }]
                : [{ required: true, message: '请输入银行卡卡号' }, { validator: validUnionBankCard }],
            })}
            type="number"
            placeholder="请输入银行卡卡号"
            clear={true}
          >
            银行卡号
          </InputItem>
          <InputItem
            {...getFieldProps('tel', {
              initialValue: '',
              rules: [{ required: true, message: '请输入预留手机号' }, { validator: validPhone }],
            })}
            type="number"
            placeholder="请输入预留手机号"
            maxLength={11}
            clear={true}
          >
            手机号
          </InputItem>
        </List>
        <div className={styles.btn_submit_box}>
          <Button disabled={loading} type="primary" onClick={this.onSubmit}>
            下一步
          </Button>
        </div>
      </>
    )
  }
}

export default withLoading(createForm()(FirstForm))
