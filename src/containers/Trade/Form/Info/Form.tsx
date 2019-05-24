import { InputItem, Modal, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { Button, Link, Switch, Upload } from 'components'
import Router from 'next/router'
import { createForm } from 'rc-form'
import React from 'react'
import { validIDCard, validPhone } from 'utils/utilsValid'
import styles from './Form.less'

const Title = (props: Partial<React.ReactPortal>) => <div className={styles.title}>{props.children}</div>

interface FormProps {
  data: any
  form?: any
  onForm: any
}

enum Provider {
  Unicom = 1,
  CMCC,
}

class Form extends React.Component<FormProps> {
  componentDidMount() {
    this.props.form.validateFields()
  }

  componentWillUnmount() {
    const body = this.props.form.getFieldsValue()
    body.idcard_bare_img = this.getImageFileUrl(body.idcard_bare_img[0])
    body.idcard_emblem_img = this.getImageFileUrl(body.idcard_emblem_img[0])
    body.idcard_human_img = this.getImageFileUrl(body.idcard_human_img[0])
    this.props.onForm.saveInLocal(body)
  }

  getImageFileUrl = (image: any): string => {
    if (!image) return ''
    return image.file_url || image.url || ''
  }

  getImageFileName = (image: any): string => {
    if (image.url.startsWith('data:image/jpeg;base64,')) return image.file_name
    const urlObj = new URL(image.url)
    return urlObj.pathname.substr(1)
  }

  onSubmit = () => {
    this.props.form.validateFields((errors: any, values: any) => {
      if (errors) {
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        Toast.info(errMsg)
      } else {
        Modal.alert(
          '',
          '提交后不可修改，确认提交吗？',
          [
            {
              text: '取消',
            },
            {
              text: '确认提交',
              onPress: async () => {
                const body = {
                  ...values,
                  trade_no: this.props.data.get('trade_no'),
                  service_providers: this.props.data.get('service_providers'),
                }
                body.idcard_bare_img = this.getImageFileName(body.idcard_bare_img[0])
                body.idcard_emblem_img = this.getImageFileName(body.idcard_emblem_img[0])
                body.idcard_human_img = this.getImageFileName(body.idcard_human_img[0])
                const ok = await this.props.onForm.saveUserData(body)
                if (ok) {
                  this.props.onForm.clearLocalData()
                  Router.back()
                }
              },
            },
          ],
          'android',
        )
      }
    })
  }

  renderIdCard() {
    const {
      form: { getFieldProps, getFieldValue },
      data,
    } = this.props
    const id1Selected = getFieldValue('idcard_human_img') && getFieldValue('idcard_human_img').length < 1
    const id2Selected = getFieldValue('idcard_emblem_img') && getFieldValue('idcard_emblem_img').length < 1
    const cx1 = classnames(styles.upload, styles.id_card_1, !id1Selected && styles.selected)
    const cx2 = classnames(styles.upload, styles.id_card_2, !id2Selected && styles.selected)
    const defaultField = (value: string, message: string) => ({
      initialValue: value ? [{ url: value }] : [],
      rules: [{ required: true, message }],
    })
    return (
      <div className={styles.idCardWrapper}>
        <Title>上传身份证照片</Title>
        <ul className={styles.list}>
          <li>• 照片仅作为办卡材料，不会做其他用途</li>
          <li>• 请上传与享换机账户相同的身份证照片正反面</li>
          <li>• 拍照时请确保身份证边框完整、图像清晰、光线均匀</li>
        </ul>
        <div className={styles.uploadWrapper}>
          <Upload
            editable={data.get('editable')}
            className={cx1}
            selectable={id1Selected}
            {...getFieldProps('idcard_human_img', defaultField(data.get('idcard_human_img'), '请上传人像面照片'))}
          />
          <Upload
            editable={data.get('editable')}
            className={cx2}
            selectable={id2Selected}
            {...getFieldProps('idcard_emblem_img', defaultField(data.get('idcard_emblem_img'), '请上传国徽面照片'))}
          />
        </div>
      </div>
    )
  }

  renderInputs() {
    const {
      form: { getFieldProps },
      data,
    } = this.props
    return (
      <div className={styles.inputsWrapper}>
        <Title>补充填写身份证信息</Title>
        <InputItem
          {...getFieldProps('user_name', {
            initialValue: data.get('user_name'),
            rules: [{ required: true, message: '请输入姓名' }],
          })}
          editable={data.get('editable')}
          type="text"
          placeholder="请输入姓名"
          clear={true}
          className={styles.input}
        >
          姓名
        </InputItem>
        <InputItem
          {...getFieldProps('user_idcard', {
            initialValue: data.get('user_idcard'),
            rules: [{ required: true, message: '请输入正确的身份证号码' }, { validator: validIDCard }],
          })}
          editable={data.get('editable')}
          type="text"
          placeholder="请输入身份证号"
          maxLength={18}
          clear={true}
          className={styles.input}
        >
          身份证号
        </InputItem>
        <InputItem
          {...getFieldProps('user_phone', {
            initialValue: data.get('user_phone'),
            rules: [{ required: true, message: '请输入正确的手机号' }, { validator: validPhone }],
          })}
          editable={data.get('editable')}
          type="text"
          placeholder="请输入手机号"
          maxLength={11}
          clear={true}
          className={styles.input}
        >
          手机号
        </InputItem>
      </div>
    )
  }

  renderPicture() {
    const {
      form: { getFieldProps, getFieldValue },
      data,
    } = this.props
    const id3Selected = getFieldValue('idcard_bare_img') && getFieldValue('idcard_bare_img').length < 1
    const cx3 = classnames(styles.upload, styles.id_card_3, !id3Selected && styles.selected)
    const defaultField = {
      initialValue: data.get('idcard_bare_img') ? [{ url: data.get('idcard_bare_img') }] : [],
      rules: [{ required: true, message: '请上传免冠照片' }],
    }
    return (
      <div className={styles.pictureWrapper}>
        <Title>上传免冠照片</Title>
        <div className={styles.uploadWrapper}>
          <Upload
            editable={data.get('editable')}
            className={cx3}
            selectable={id3Selected}
            {...getFieldProps('idcard_bare_img', defaultField)}
          />
        </div>
      </div>
    )
  }

  renderTerms() {
    const provider = this.props.data.get('service_providers')
    switch (provider) {
      case Provider.Unicom:
        return (
          <Link to="/terms/unicom1" className={styles.term}>
            《中国联通客户入网服务协议》
          </Link>
        )
      case Provider.CMCC:
        return (
          <Link to="/terms/cmcc1" className={styles.term}>
            《上海移动2018版入网服务协议》
          </Link>
        )
      default:
        return null
    }
  }

  renderSubmit() {
    const {
      form: { getFieldProps },
      data,
    } = this.props
    const termConfig = {
      valuePropName: 'checked',
      initialValue: data.get('agreed'),
      rules: [
        {
          validator(_: any, value: boolean, cb: Function) {
            return !value ? cb('请确认协议') : cb()
          },
        },
      ],
    }
    return data.get('editable') ? (
      <>
        <div className={styles.termsWrapper}>
          <Switch {...getFieldProps('agreed', termConfig)}>已阅读并同意</Switch>
          {this.renderTerms()}
        </div>
        <Button className={styles.submit} type="primary" onClick={this.onSubmit}>
          提交
        </Button>
      </>
    ) : (
      <div className={styles.termsWrapper}>
        <Switch {...getFieldProps('agreed', termConfig)} editable={false} hideCheckBox={true}>
          已阅读并同意
        </Switch>
        {this.renderTerms()}
        <p>· 已经到底了哦 ·</p>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.form}>
        {this.renderIdCard()}
        {this.renderInputs()}
        <p className={styles.tip}>*用户办卡时接受提示短信的号码</p>
        {this.renderPicture()}
        {this.renderSubmit()}
      </div>
    )
  }
}

export default createForm()(Form)
