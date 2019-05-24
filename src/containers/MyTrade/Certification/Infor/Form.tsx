import { InputItem, List, Toast } from 'antd-mobile'
import { Button } from 'components'
import { TrackEventFundsUnion } from 'configs/trackEventLabels'
import { createForm } from 'rc-form'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import { validIDCard } from 'utils/utilsValid'
import styles from './Form.less'

interface Props {
  form: any
  postData: Function
}
class Form extends React.Component<Props, any> {
  onSubmit = () => {
    trackClickEvent({ category: TrackEventFundsUnion.Submission.Name, label: TrackEventFundsUnion.Submission.Item1 })
    this.props.form.validateFields(async (errors: any, values: any) => {
      if (!errors) {
        this.props.postData(values)
      } else {
        this.setState({
          loading: false,
        })
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        Toast.info(errMsg)
      }
    })
  }

  render() {
    const {
      form: { getFieldProps },
    } = this.props
    return (
      <div>
        <p className={styles.title}>请确保姓名与身份证信息一致</p>
        <List>
          <InputItem
            {...getFieldProps('name', {
              rules: [{ required: true, message: '请输入您的姓名' }],
            })}
            placeholder="请输入您的姓名"
            clear={true}
          >
            姓名
          </InputItem>
          <InputItem
            {...getFieldProps('identi_card', {
              rules: [{ required: true, message: '请输入15或18位身份证号码' }, { validator: validIDCard }],
            })}
            placeholder="请输入15或18位身份证号码"
            maxLength={18}
            clear={true}
          >
            身份证号
          </InputItem>
        </List>
        <Button className={styles.btn} type="primary" onClick={this.onSubmit}>
          提交
        </Button>
      </div>
    )
  }
}

export default createForm()(Form)
