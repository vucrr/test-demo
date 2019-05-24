import { InputItem, Toast } from 'antd-mobile'
import { Button, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { createForm } from 'rc-form'
import * as React from 'react'
import { validEmail } from 'utils/utilsValid'
import styles from '../Form/Detail.less'

interface DetailProps extends withLoadingProps {
  form?: any
  handleClick: Function
  email: string
}

interface DetailState {}

class Detail extends React.Component<DetailProps, DetailState> {
  onSubmit = () => {
    this.props.form.validateFields(async (errors: any, valus: any) => {
      if (!errors) {
        this.props.setLoading(true)
        await this.props.handleClick(valus)

        this.props.setLoading(false)
      } else {
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        Toast.info(errMsg)
      }
    })
  }
  get disabled() {
    const {
      form: { getFieldValue },
    } = this.props
    return !getFieldValue('email')
  }
  render() {
    const { form, email } = this.props
    const getFieldProps = form.getFieldProps
    return (
      <div className={styles.FormDetail}>
        <h2>请输入您常用的电子邮箱</h2>
        <InputItem
          {...getFieldProps('email', {
            initialValue: email || '',
            rules: [{ required: true, message: '请输入您的电子邮箱' }, { validator: validEmail }],
          })}
          className={styles.input}
          clear={true}
          type={'text'}
          placeholder={'用于查收发票'}
        />
        <Button disabled={this.disabled} type="primary" className={styles.btn} onClick={this.onSubmit}>
          提交
        </Button>
      </div>
    )
  }
}

export default withLoading(createForm()(Detail))
