import { InputItem, List, Toast } from 'antd-mobile'
import { Button, Loading, withSource } from 'components'
import { SourceProps } from 'components/withSource'
import { withRouter } from 'next/router'
import { createForm } from 'rc-form'
import React from 'react'
import { validIDCard } from 'utils/utilsValid'
import styles from './Form.less'

interface Props {
  form: any
  onCertify: any
  router: any
}

interface State {
  loading: boolean
  domStr: string
  script: any
}
class Form extends React.Component<Props & SourceProps, State> {
  state = {
    loading: false,
    domStr: '',
    script: '',
  }

  componentDidUpdate() {
    if (this.state.script[1]) {
      setTimeout(() => {
        const e = document.createElement('script')
        e.type = 'text/javascript'
        e.async = true
        e.innerHTML = this.state.script[1]
        const s = document.getElementsByTagName('script')[0]
        s.parentNode!.insertBefore(e, s)
      }, 0)
    }
  }

  onSubmit = () => {
    this.setState({
      loading: true,
    })
    this.props.form.validateFields(async (errors: any, values: any) => {
      if (!errors) {
        const { ua } = this.props
        let channel
        let returnUrl = location.host + '/mytrade/certification/certify'
        if (ua.get('isAlipay')) {
          channel = 'alipay'
        } else if (ua.get('isApp')) {
          channel = 'xhjapp'
          returnUrl = location.host + '/mytrade/certification/certify/auth/zhima'
        }
        const data = await this.props.onCertify.fetchCertifyForm({
          ...values,
          return_url: returnUrl,
          channel,
          redirect: this.props.router.query.redirect || encodeURIComponent(location.host),
        })
        if (data.error) {
          this.setState({ loading: false })
          Toast.info(data.error)
          return
        }
        let domStr = data.form
        const extractscript = /<script>(.+)<\/script>/gi.exec(domStr)
        if (extractscript) {
          domStr = domStr.replace(extractscript[0], '')
        }
        this.setState({
          domStr: domStr,
          loading: false,
          script: extractscript,
        })
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
              initialValue: '',
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
        <Loading loading={this.state.loading} />
        <div className={styles.newCon} dangerouslySetInnerHTML={{ __html: this.state.domStr }} />
      </div>
    )
  }
}

export default withRouter(createForm()(withSource<Props>(Form)))
