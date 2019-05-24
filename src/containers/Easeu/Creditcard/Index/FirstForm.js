import React from 'react'
import PropTypes from 'prop-types'
// import Immutable from 'immutable'
import { List, InputItem, Button } from 'antd-mobile'
import classnames from 'classnames'
import { createForm } from 'rc-form'
import { validIDCard, validBankCard } from 'utils/utilsValid'
import styles from './Form.less'

const Item = List.Item

class FirstForm extends React.Component {
  static propTypes = {
    formStatus: PropTypes.number.isRequired,
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  onSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.onSubmit(values)
      }
    })
  }

  render() {
    const {
      form: { getFieldProps, getFieldError, isFieldTouched },
      formStatus,
    } = this.props

    const userNameError = !isFieldTouched('userName') || !!getFieldError('userName')
    const userIdentityError = !isFieldTouched('userIdentity') || !!getFieldError('userIdentity')
    const tradeCardError = !isFieldTouched('tradeCard') || !!getFieldError('tradeCard')
    const isError = userNameError || userIdentityError || tradeCardError

    return (
      <div className={classnames(styles.form_wrap1, formStatus === 1 && styles.active)}>
        <List className={styles.form_box} renderHeader={() => '温馨提示：添加信用卡前，请确保该卡内有足够的额度'}>
          <InputItem
            {...getFieldProps('userName', {
              initialValue: '',
              rules: [{ required: true, message: '请输入持卡人姓名' }],
            })}
            type="text"
            placeholder="请输入持卡人姓名"
            clear
          >
            姓名
          </InputItem>
          <InputItem
            {...getFieldProps('userIdentity', {
              initialValue: '',
              rules: [{ required: true, message: '请输入持卡人身份证' }, { validator: validIDCard }],
            })}
            type="text"
            placeholder="请输入持卡人身份证"
            maxLength={18}
            clear
          >
            身份证
          </InputItem>
          <InputItem
            {...getFieldProps('tradeCard', {
              initialValue: '',
              rules: [{ required: true, message: '请输入信用卡卡号' }, { validator: validBankCard }],
            })}
            type="bankCard"
            placeholder="请输入信用卡卡号"
            clear
          >
            卡号
          </InputItem>
          <Item className={styles.form_item}>
            <Button className={styles.btn_submit} disabled={isError} type="primary" onClick={this.onSubmit}>
              下一步
            </Button>
          </Item>
        </List>
      </div>
    )
  }
}

export default createForm()(FirstForm)
