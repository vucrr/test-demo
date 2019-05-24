import { Modal } from 'antd-mobile'
import classnames from 'classnames'
import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './Apply.less'

export interface SuccessProps {
  contract_no: string
  invoice: any
  cancelClick: Function
}

export interface SuccessState {}

class Success extends React.Component<SuccessProps, SuccessState> {
  cancelApply = () => {
    Modal.alert(
      '',
      '您确定要取消开电子发票吗？',
      [
        { text: '暂不取消' },
        {
          text: '确定',
          onPress: () => this.props.cancelClick(),
        },
      ],
      'android',
    )
  }
  render() {
    const { invoice } = this.props
    return (
      <div className={classnames(styles.success, styles.apply)}>
        <img className={styles.icon} src={AssetImage.MyAccount.Receipt.Success} alt="发票" />
        <h2>成功申请{invoice.get('open_type_zh')}</h2>
        {invoice.get('open_type') === 'merge' && (
          <p className={styles.apply_text}>
            发票将在<span>服务终止/换机</span>后3个工作日内发送至您的邮箱
          </p>
        )}
        {invoice.get('open_type') === 'stage' && (
          <p className={styles.apply_text}>
            发票将在<span>每期租金成功扣款</span>后3个工作日内发送至您的邮箱
          </p>
        )}

        <div className={styles.detail}>
          开票金额：
          {invoice.get('open_type') === 'merge' && <span>订单总金额</span>}
          {invoice.get('open_type') === 'stage' && <span>每期支付金额</span>}
          <br />
          发送邮箱：{invoice.get('email')} <br />
          发票抬头：{invoice.get('invoice_title')}
          {invoice.get('taxer_no') && <p>纳税人识别号：{invoice.get('taxer_no')}</p>}
        </div>
        <div className={styles.success_btn}>
          <span onClick={this.cancelApply}>取消申请</span>
          <a href="tel:400-670-0188">联系客服</a>
        </div>
      </div>
    )
  }
}

export default Success
