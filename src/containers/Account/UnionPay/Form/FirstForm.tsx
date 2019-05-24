import { Flex, InputItem, List, Modal, Toast } from 'antd-mobile'
import { Button, Icon } from 'components'
import debounce from 'lodash.debounce'
import { createForm } from 'rc-form'
import React from 'react'
import { ENV } from 'utils/config'
import { validIDCard, validPhone, validUnionBankCard } from 'utils/utilsValid'
import styles from './Form.less'

const isTest = ['dev', 'test'].includes(ENV)

interface FirstFormProps {
  unionPayForm: any
  checkBankList: any
  onUnionPayActions: any
  form: any
  step: string
  redirect?: string
}

class FirstForm extends React.Component<FirstFormProps, {}> {
  constructor(props: FirstFormProps) {
    super(props)
    this.handleCheckBin = debounce(this.handleCheckBin, 800)
  }

  componentWillUnmount() {
    const form = this.props.form.getFieldsValue()
    this.props.onUnionPayActions.saveFormFileds({ form })
  }

  componentWillReceiveProps(nextProps: FirstFormProps) {
    // 提交成功后清除相关数据
    if (nextProps.unionPayForm.get('hasSubmit') && !this.props.unionPayForm.get('hasSubmit')) {
      this.props.form.setFieldsValue({
        bankCardNo: '',
        tel: '',
      })
    }
  }

  Header: any = () => {
    const handleClick = async () => {
      await this.props.onUnionPayActions.fetchCheckBanklist()
      const { checkBankList } = this.props
      const Content = (
        <div className={styles.icon_list}>
          {checkBankList.map((item: any) => (
            <Flex key={item.get('id')} className={styles.item}>
              <img src={item.get('bank_icon')} /> {item.get('bank_name')}
            </Flex>
          ))}
        </div>
      )
      Modal.alert('银行名单', Content, [{ text: '知道了' }], 'android')
    }

    return (
      <div className={styles.header}>
        <h4>请绑定持卡人本人的银行卡</h4>
        <span>已为您智能加密，保障您的用卡安全</span>
        <span className={styles.link} onClick={handleClick}>
          查看支持添加的银行名单 >
        </span>
      </div>
    )
  }

  handleCheckBin = (cardBin: string) => {
    if (cardBin.length >= 6) {
      this.props.onUnionPayActions.binCheck({ cardBin })
    }
  }

  onSubmit = () => {
    const { redirect } = this.props
    this.props.form.validateFields((errors: any, values: any) => {
      if (!errors) {
        const isEdit = this.props.unionPayForm.get('isEdit')
        const hasIdNo = isEdit ? 0 : 1
        this.props.onUnionPayActions.goToNext({ info: { ...values, hasIdNo, isEdit }, redirect })
      } else {
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        Toast.info(errMsg)
      }
    })
  }

  render() {
    const {
      unionPayForm,
      form: { getFieldProps },
    } = this.props

    const Extra = (
      <Flex
        onClick={() => {
          Modal.alert(
            '温馨提示',
            unionPayForm.get('isEdit')
              ? '请保证持卡人和享换机账号是同一个人'
              : '为了您的安全，只能绑定与享换机账号实名认证相符的持卡人的银行卡哦',
            [{ text: '我知道了' }],
            'android',
          )
        }}
      >
        <Icon className={styles.tips_icon} type={require('svg/question-circle.svg')} />
      </Flex>
    )

    return (
      <>
        <List className={styles.form_box} renderHeader={this.Header}>
          <InputItem
            {...getFieldProps('realName', {
              initialValue: unionPayForm.get('realName') || '',
              rules: [{ required: true, message: '请输入持卡人姓名' }],
            })}
            editable={unionPayForm.get('isEdit')}
            type="text"
            placeholder="请输入持卡人姓名"
            clear={true}
            extra={Extra}
          >
            持卡人
          </InputItem>
          <InputItem
            {...getFieldProps('idNo', {
              initialValue: unionPayForm.get('idNo') || '',
              rules: !unionPayForm.get('idNo')
                ? [{ required: true, message: '请输入身份证号' }, { validator: validIDCard }]
                : [],
            })}
            editable={unionPayForm.get('isEdit')}
            type="text"
            placeholder="请输入身份证号"
            maxLength={18}
            clear={true}
          >
            身份证号
          </InputItem>
          <InputItem
            {...getFieldProps('bankCardNo', {
              initialValue: unionPayForm.get('bankCardNo') || '',
              rules: isTest
                ? [{ required: true, message: '请输入银行卡卡号' }]
                : [{ required: true, message: '请输入银行卡卡号' }, { validator: validUnionBankCard }],
              onChange: this.handleCheckBin,
            })}
            type="number"
            placeholder="请输入银行卡卡号"
            clear={true}
          >
            银行卡号
          </InputItem>
          <InputItem
            {...getFieldProps('tel', {
              initialValue: unionPayForm.get('tel') || '',
              rules: [{ required: true, message: '请输入预留手机号' }, { validator: validPhone }],
            })}
            type="text"
            placeholder="请输入预留手机号"
            maxLength={11}
            clear={true}
            className={styles.input}
          >
            手机号
          </InputItem>
        </List>
        <div className={styles.btn_submit_box}>
          <Button className={styles.btn_submit} type="primary" onClick={this.onSubmit}>
            下一步
          </Button>
        </div>
      </>
    )
  }
}

export default createForm()(FirstForm)
