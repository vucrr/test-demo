import { DatePicker, Flex, InputItem, List, Modal, Toast } from 'antd-mobile'
import { Button, Icon, Switch, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventLBF } from 'configs/trackEventLabels'
import { AssetImage } from 'constant/uikit'
import Router from 'next/router'
import { createForm } from 'rc-form'
import * as React from 'react'
import { trackClickEvent } from 'utils/piwik'
import { padLeft } from 'utils/tools'
import { validBankCard, validIDCard, validPhone, validTrim } from 'utils/utilsValid'
import styles from './Detail.less'
import Mobile from './Mobile'
import { Query } from './index'

export interface DetailProps extends withLoadingProps {
  form: any
  information: any
  query: Query
  cookie: any
  onCreditSms: Function
  onCreditCup: Function
  createStrategyPay: Function
  saveCreditCookie: Function
  ua: any
}

export interface DetailState {
  mobile: string
  ticks: number
  disable: boolean
  smsCode: string
  goTerms: boolean
}

class Detail extends React.Component<DetailProps, DetailState> {
  readonly state: DetailState = {
    mobile: this.props.cookie.get('phone') || '', // 手机
    ticks: 10,
    disable: false, // 是否可更改
    smsCode: this.props.cookie.get('sms_code') || '', // 验证码
    goTerms: false,
  }
  async componentWillUnmount() {
    this.setState({
      disable: false,
      ticks: 10,
    })
    clearInterval(this.timer2)
    this.props.setLoading(false)
    if (!this.state.goTerms) {
      await this.props.saveCreditCookie({})
    }
  }
  timer2 = 0
  TimerSave = (query: any) => {
    this.setState(
      ({ ticks }) => ({ ticks: ticks - 1 }),
      async () => {
        if (this.state.ticks === 0) {
          clearInterval(this.timer2)
          this.props.setLoading(true)
          await this.props.createStrategyPay({
            trade_no: query.trade_no,
            pay_no: query.pay_no,
            type: query.type,
            pis_code: query.pis_code,
          })
        }
      },
    )
    return this.TimerSave
  }

  onSubmit = () => {
    trackClickEvent({ category: TrackEventLBF.SMSVerification.category, label: TrackEventLBF.SMSVerification.name })
    if (this.state.disable) return
    this.props.form.validateFields(async (errors: any, values: any) => {
      if (!errors) {
        let phone = false
        validPhone(null, this.state.mobile, (val: any) => {
          phone = val ? true : false
        })
        if (phone || this.state.mobile === '') {
          Toast.info('手机号码格式不正确')
        } else if (!this.state.smsCode) {
          Toast.info('请输入正确的验证码')
        } else {
          const query = {
            sms_code: this.state.smsCode.replace(/\s/g, ''), // 验证码
            name: values.aname.replace(/\s/g, ''), // 身份证号
            card_id: values.bcard_id.replace(/\s/g, ''), // 卡号
            acc_no: values.cacc_no.replace(/\s/g, ''),
            phone: this.state.mobile,
            cvn: values.ecvn.replace(/\s/g, ''), // 安全码
            valid_end_time: `${padLeft(values.dvalid_end_time.getMonth() + 1)}${values.dvalid_end_time.getYear() -
              100}`, // 有效时间
            trade_no: this.props.query.trade_no,
            pay_no: this.props.query.pay_no,
            type: this.props.query.type,
            pis_code: this.props.query.pis_code,
          }
          this.setState({
            disable: true,
          })
          this.timer2 = window.setInterval(this.TimerSave, 1000)
          const data = await this.props.onCreditCup({ query })
          if (data.errorMsg) {
            Toast.info(data.errorMsg)
            clearInterval(this.timer2)
            this.setState({
              disable: false,
              ticks: 10,
            })
          } else if (data.res_code === '2000') {
            Toast.info(data.msg)
            clearInterval(this.timer2)
            this.setState({
              disable: false,
              ticks: 10,
            })
          } else if (data.res_code === '9998') {
            Toast.info(data.msg)
            window.setTimeout(async () => {
              if (this.props.ua.get('isIOSApp') || this.props.ua.get('isAndroidApp')) {
                location.href = 'redirectAPP/home'
              } else {
                await Router.push('/')
              }
            }, 2000)
          }
        }
      } else {
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        Toast.info(errMsg)
      }
    })
  }

  msgName = () => {
    trackClickEvent({ category: TrackEventLBF.CardInformation.category, label: TrackEventLBF.CardInformation.name1 })
    const renzheng = this.props.information.get('realName')
      ? '为了您的安全，只能绑定与享换机账号实名认证相符的持卡人的信用卡哦。'
      : '您填写的持卡人和身份证号将会同时作为实名认证信息哦，请保证持卡人和享换机账号是同一个人。'
    Modal.alert('', renzheng, [{ text: '我知道了' }], 'android')
  }
  msgEffect = () => {
    trackClickEvent({ category: TrackEventLBF.CardInformation.category, label: TrackEventLBF.CardInformation.name2 })
    Modal.alert(
      <img className={styles.msgImg} src={AssetImage.MyTrade.Creditcard.Anquanma} />,
      <p className={styles.msgText}>
        后三位数字<span>“567”</span>即是安全码
      </p>,
      [{ text: '我知道了' }],
      'android',
    )
  }
  formatDate = (date: any) => {
    return `${date.getYear() - 100}/${padLeft(date.getMonth() + 1)}`
  }
  saveMobile = (mobile: string) => {
    this.setState({
      mobile: mobile.replace(/\s/g, ''),
    })
  }
  saveSmsCode = (smsCode: string) => {
    this.setState({
      smsCode: smsCode.replace(/\s/g, ''),
    })
  }
  toLink = async () => {
    trackClickEvent({ category: TrackEventLBF.CardInformation.category, label: '乐百分条款' })
    this.props.form.validateFields(async (_: any, values: any) => {
      const query = {
        sms_code: this.state.smsCode, // 验证码
        name: values.aname ? values.aname.replace(/\s/g, '') : '', // 身份证号
        card_id: values.bcard_id ? values.bcard_id.replace(/\s/g, '') : '', // 卡号
        acc_no: values.cacc_no ? values.cacc_no.replace(/\s/g, '') : '',
        phone: this.state.mobile,
        cvn: values.ecvn ? values.ecvn.replace(/\s/g, '') : '', // 安全码
        valid_end_time: values.dvalid_end_time ? new Date(values.dvalid_end_time).getTime() : '', // 有效期
      }
      this.setState({
        goTerms: true,
      })
      await this.props.saveCreditCookie(query)
      await Router.push('/myaccount/terms/creditcard?trade_no=' + this.props.query.trade_no)
    })
  }
  render() {
    const { form, information, onCreditSms, cookie } = this.props
    const { disable, mobile } = this.state
    const getFieldProps = form.getFieldProps
    const mobileProp: any = {
      onCreditSms,
      saveMobile: this.saveMobile,
      disable,
      saveSmsCode: this.saveSmsCode,
      cookie,
      mobile,
    }
    const termConfig = {
      valuePropName: 'checked',
      initialValue: true,
      rules: [
        {
          validator(_: any, value: boolean, cb: Function) {
            trackClickEvent({
              category: TrackEventLBF.CardInformation.category,
              label: !value ? TrackEventLBF.CardInformation.name3 : TrackEventLBF.CardInformation.name4,
            })
            return !value ? cb('请阅读并同意条款') : cb()
          },
        },
      ],
    }
    return (
      <>
        <div className={styles.credit_form}>
          <Flex className={styles.item} justify="between">
            <Flex className={styles.item_left}>
              <span>持卡人</span>
              <InputItem
                {...getFieldProps('aname', {
                  initialValue: information.get('realName') || cookie.get('name') || '',
                  rules: [{ required: true, message: '请填入正确的持卡人姓名' }, { validator: validTrim }],
                })}
                className={styles.input}
                type={'text'}
                disabled={information.get('realName') || disable}
                placeholder={'请填写持卡人姓名'}
              />
            </Flex>
            <Icon
              type={require('svg/question-circle.svg')}
              onClick={this.msgName}
              className={styles.icon}
              color="#00A699"
            />
          </Flex>
          <Flex className={styles.item}>
            <span>身份证号</span>
            <InputItem
              {...getFieldProps('bcard_id', {
                initialValue: information.get('idNo') || cookie.get('card_id') || '',
                rules: [
                  { required: true, message: '请填入正确的身份证号' },
                  { validator: information.get('idNo') ? '' : validIDCard },
                ],
              })}
              maxLength={18}
              disabled={information.get('idNo') || disable}
              className={styles.input}
              clear={true}
              type={'text'}
              placeholder={'请填写持卡人身份证号'}
            />
          </Flex>
          <Flex className={styles.item}>
            <span>信用卡卡号</span>
            <InputItem
              {...getFieldProps('cacc_no', {
                initialValue: cookie.get('acc_no') || '',
                rules: [{ required: true, message: '请输入正确的信用卡卡号' }, { validator: validBankCard }],
              })}
              maxLength={19}
              disabled={disable}
              className={styles.input}
              clear={true}
              type="bankCard"
              placeholder={'请输入信用卡卡号'}
            />
          </Flex>
          <List className={styles.item}>
            <DatePicker
              {...getFieldProps('dvalid_end_time', {
                initialValue: cookie.get('valid_end_time') ? new Date(cookie.get('valid_end_time')) : '',
                rules: [{ required: true, message: '请选择有效期' }],
              })}
              disabled={disable}
              mode="month"
              extra={<span className={styles.placeholder}>请选择有效期，如：01/19</span>}
              minDate={new Date(Date.now() + 3.1536e10)}
              format={val => this.formatDate(val)}
            >
              <List.Item arrow="horizontal">有效期</List.Item>
            </DatePicker>
          </List>
          <Flex className={styles.item} justify="between">
            <Flex className={styles.item_left}>
              <span>安全码</span>
              <InputItem
                {...getFieldProps('ecvn', {
                  initialValue: cookie.get('cvn') || '',
                  rules: [{ required: true, message: '请输入正确的安全码' }, { validator: validTrim }],
                })}
                disabled={disable}
                maxLength={3}
                clear={true}
                className={styles.input}
                type={'number'}
                placeholder={'请输入卡背面后3位数字'}
              />
            </Flex>
            <Icon
              type={require('svg/question-circle.svg')}
              className={styles.icon}
              color="#00A699"
              onClick={this.msgEffect}
            />
          </Flex>
        </div>
        <Mobile {...mobileProp} />
        <div className={styles.botton}>
          <div className={styles.agreement}>
            <Switch {...getFieldProps('fagree', termConfig)}>
              <span>同意</span>
            </Switch>
            <span onClick={this.toLink} className={styles.link}>
              《乐百分条款》
            </span>
          </div>
          <Button type="primary" className={styles.btn} onClick={this.onSubmit}>
            {!disable ? '立即冻结额度' : '冻结中' + this.state.ticks + 's'}
          </Button>

          <Flex className={styles.msg} justify="center">
            <img src={AssetImage.MyTrade.Creditcard.Baizhang} className={styles.img} />信息安全保障中
          </Flex>
        </div>
      </>
    )
  }
}

export default withLoading(createForm()(Detail))
