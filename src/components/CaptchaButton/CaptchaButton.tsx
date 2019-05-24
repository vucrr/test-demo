import { getCaptchaImage, verifyImageAndSendSMS } from 'actions/captcha'
import { Flex, InputItem, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { Button } from 'components'
import Icon from 'components/Icon'
import { SMS_TYPES } from 'constant/common'
import React from 'react'
import { connect } from 'react-redux'
import { isValidPhone } from 'utils/utilsValid'
import styles from './CaptchaButton.less'

interface CaptchaButtonProps {
  phone: string
  type: string // 指定验证码类型
  needImage?: boolean
  buttonClassName?: string
  dialogClassName?: string
}

interface InjectedProps {
  getCaptchaImage: Function
  verifyImageAndSendSMS: Function
}

interface CaptchaButtonState {
  showDialog: boolean
  countdown: number
  isCounting: boolean
  tip: string
  imageStr: string
  imageCaptcha: string
}

class CaptchaButton extends React.Component<CaptchaButtonProps & InjectedProps, CaptchaButtonState> {
  static defaultProps = {
    needImage: true,
    type: SMS_TYPES.BindPhone,
    auto: false,
  }

  readonly state = {
    showDialog: false,
    countdown: 60,
    isCounting: false,
    tip: '',
    imageStr: '',
    imageCaptcha: '',
  }

  timer = 0

  startTimer = () => {
    this.setState({ isCounting: true })
    this.timer = window.setInterval(() => {
      const countdown = this.state.countdown - 1
      this.setState({ countdown })
      if (countdown) return
      clearInterval(this.timer)
      this.setState({ countdown: 60, isCounting: false })
    }, 1000)
  }

  handleClick = async () => {
    const { getCaptchaImage, phone, needImage, type } = this.props
    if (needImage) {
      this.setState({
        showDialog: true,
        tip: '',
        imageStr: '',
        imageCaptcha: '',
      })
      const image = await getCaptchaImage(phone, type)
      this.setState({
        imageStr: 'data:image/png;base64,' + image,
      })
    } else {
      // not impl
    }
  }

  closePanel = () => {
    this.setState({
      showDialog: false,
      imageStr: '',
      tip: '',
    })
  }

  onChange = async (val: string) => {
    const { verifyImageAndSendSMS, phone, type } = this.props
    this.setState({
      imageCaptcha: val,
    })
    if (val && val.length === 4) {
      const data = await verifyImageAndSendSMS(phone, val, type)
      if (data.send_res) {
        // 成功
        this.closePanel()
        this.startTimer()
        // Dev
        if (data.sms_code) {
          Toast.info('验证码：' + data.sms_code)
        }
      } else {
        this.setState({ tip: data.errorMsg || '验证码验证失败，请重新输入' })
      }
    }
  }

  get disabled() {
    return this.state.isCounting || !this.props.phone || !isValidPhone(this.props.phone)
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer)
  }

  renderDialog() {
    const dialogStyles = classnames(this.props.dialogClassName, styles.dialog)
    const { tip, imageCaptcha, imageStr } = this.state
    return (
      <div className={dialogStyles}>
        <div className={styles.panel}>
          <div className={styles.close} onClick={this.closePanel}>
            <Icon type={require('svg/close.svg')} />
          </div>
          <p>请先输入下方数字</p>
          <div className={styles.tip}>
            <span>{tip}</span>
          </div>
          <Flex align="center">
            <InputItem
              name="imageCaptcha"
              value={imageCaptcha}
              onChange={this.onChange}
              clear={true}
              maxLength={4}
              className={styles.imageInput}
              placeholder="请输入图形验证码"
              disabled={!imageStr}
            />
            <Flex align="center" justify="center" className={styles.captchaImage} onClick={this.handleClick}>
              {imageStr ? <img src={imageStr} alt="captcha" /> : <Icon type={require('svg/placeholder.svg')} />}
            </Flex>
          </Flex>
        </div>
      </div>
    )
  }

  render() {
    const { needImage } = this.props
    const { showDialog } = this.state
    const buttonStyles = classnames(this.props.buttonClassName, styles.veriCodeBtn)
    return (
      <>
        <Button className={buttonStyles} disabled={this.disabled} onClick={this.handleClick}>
          {this.state.isCounting ? this.state.countdown + 'S' : '获取验证码'}
        </Button>
        {needImage && showDialog && this.renderDialog()}
      </>
    )
  }
}

const mapDispatch = {
  getCaptchaImage,
  verifyImageAndSendSMS,
}

export default connect(
  null,
  mapDispatch,
)(CaptchaButton)
