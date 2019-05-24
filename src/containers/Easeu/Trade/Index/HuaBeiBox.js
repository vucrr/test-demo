import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Flex, ActionSheet, Toast } from 'antd-mobile'
import { Icon, Switch } from 'components'
import classnames from 'classnames'
import popupStyles from 'themes/action-sheet.less'
import { Step } from '../../../../../server/controllers/easeu/trade'
import RentBox from './RentBox'
import styles from './HuaBeiBox.less'

const Item = Flex.Item

const PaymentBox = ({ info }) => {
  const showActionSheet = () => {
    // const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
    // const wrapProps = isIPhone ? {
    //   onTouchStart: e => e.preventDefault(),
    // } : null
    const BUTTONS = [
      <div className={popupStyles.popup_body_box}>
        {info.get('service_price') > 0 && (
          <Flex>
            <Item>· 首期还款(含保险费)</Item>
            <Item className={popupStyles.right_item}>￥{info.get('first_month_amount')}</Item>
          </Flex>
        )}
        <Flex>
          <Item>· {info.get('service_price') > 0 && '以后'}每期还款</Item>
          <Item className={popupStyles.right_item}>￥{info.get('per_month_amount')}</Item>
        </Flex>
        <Flex>
          <Item>· 期数</Item>
          <Item className={popupStyles.right_item}>{info.get('installments_sum')}期</Item>
        </Flex>
      </div>,
    ]
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        title: (
          <div className={popupStyles.popup_title} onClick={() => ActionSheet.close()}>
            <span>分期明细</span>
            <Icon className={popupStyles.btn_close} type={require('svg/close.svg')} />
          </div>
        ),
        maskClosable: true,
        className: popupStyles.popup_box,
        'data-seed': 'logId',
        // wrapProps,
      },
      // buttonIndex => {
      //   // this.setState({ clicked: BUTTONS[buttonIndex] })
      // },
    )
  }

  return (
    <div className={styles.payment_box}>
      <Flex className={styles.pay_item}>
        <Item>
          <span className={styles.label}>
            总租金
            <span className={styles.sub_label}>
              {info.get('service_price') > 0 && `含意外维修服务费¥${info.get('service_price')}`}
            </span>
          </span>
        </Item>
        <span>￥{info.get('total_contract_charge')}</span>
      </Flex>
      <Flex className={classnames(styles.pay_item, styles.multiline)}>
        <Item>
          <span className={styles.label}>支付方式</span>
        </Item>
        <Icon className={classnames(styles.icon, styles.alipay_icon)} type={require('svg/alipay.svg')} />
        支付宝代扣
      </Flex>
      <Flex className={styles.more_box} justify="end" onClick={showActionSheet}>
        查看分期明细 <Icon className={styles.icon} type="right" />
      </Flex>
    </div>
  )
}
PaymentBox.propTypes = {
  info: PropTypes.instanceOf(Immutable.Map).isRequired,
}

const AssureBox = ({ info }) => {
  return (
    <div className={styles.assure_box}>
      <div className={styles.pay_item}>
        <Flex className={styles.inner}>
          <Item>
            <span className={styles.label}>总押金</span>
          </Item>
          <span>￥{info.get('frozen_charge')}</span>
        </Flex>
        <Flex className={styles.inner}>
          <Item>
            <span className={styles.label}>押金减免</span>
          </Item>
          <span>￥{info.get('assurance_reduce_charge')}</span>
        </Flex>
        <Flex className={styles.inner}>
          <Item>
            <span className={styles.label}>需冻押金</span>
          </Item>
          <span className={styles.red_text}>￥{info.get('guarantee_charge')}</span>
        </Flex>
      </div>
      <Flex className={styles.pay_item} align="start">
        <Item>
          <span className={styles.label}>冻结方式</span>
        </Item>
        <Icon className={classnames(styles.icon, styles.alipay_icon)} type={require('svg/huabei.svg')} />
        花呗预授权
      </Flex>
    </div>
  )
}
AssureBox.propTypes = {
  info: PropTypes.instanceOf(Immutable.Map).isRequired,
}

class HuaBeiBox extends React.Component {
  state = {
    checked: true,
  }

  handleSubmit = () => {
    if (!this.state.checked) {
      Toast.info('请先同意轻松用服务条款')
      return
    }
    const { flow, onTradeActions } = this.props
    const currentCode = flow.get('currentCode')
    const flowCode = flow.get('flowCode')
    if (currentCode === Step.HuabeiSign) {
      onTradeActions.userSign({ flowCode })
    } else if (currentCode === Step.createPayQsy) {
      onTradeActions.createPayQsy({ flowCode, type: 'huabei' })
    }
  }

  handleChange = () => {
    this.setState({
      checked: !this.state.checked,
    })
  }

  toLink = tradeNo => {
    window.location.href = `/terms/userterm?trade_no=${tradeNo}`
  }

  render() {
    const { checked } = this.state
    const { trade } = this.props
    return (
      <div className={styles.pay_box}>
        <PaymentBox info={trade.get('trade_info')} />
        <AssureBox info={trade.get('trade_info')} />
        {trade.getIn(['rent_info', 'is_open_auto_rent']) && <RentBox info={trade.get('rent_info')} />}
        <div className={styles.agree_box}>
          <Flex>
            <Switch checked={checked} onChange={this.handleChange}>
              我已阅读并同意
            </Switch>
            <span className={styles.link} onClick={() => this.toLink(trade.getIn(['trade_info', 'trade_no']))}>
              《轻松用服务条款》
            </span>
          </Flex>
        </div>
        <div className={styles.bottom_box}>
          <span className={styles.btn_submit} onClick={this.handleSubmit}>
            下一步
          </span>
        </div>
      </div>
    )
  }
}

HuaBeiBox.propTypes = {
  flow: PropTypes.instanceOf(Immutable.Map).isRequired,
  trade: PropTypes.instanceOf(Immutable.Map).isRequired,
  onTradeActions: PropTypes.object.isRequired,
}

export default HuaBeiBox
