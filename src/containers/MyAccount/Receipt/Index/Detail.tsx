import { Modal } from 'antd-mobile'
import classnames from 'classnames'
import { AssetImage } from 'constant/uikit'
import Router from 'next/router'
import React from 'react'
import styles from './Detail.less'
import DetailList from './DetailList'

export interface DetailProps {
  TYPE: 3 | 4
  invoice: any
  contract_no: string
  cancelClick: Function
  isAndroidApp: boolean
  isWechat: boolean
}

export interface DetailState {}

class Detail extends React.Component<DetailProps, DetailState> {
  cancelApply = () => {
    Modal.alert(
      '',
      '您确定要取消吗？取消后将不再自动开具发票，如需开票可重新申请。',
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
  toLink = async () => {
    await Router.push({
      pathname: '/myaccount/receipt/form',
      query: {
        contract_no: this.props.contract_no,
        open_type: this.props.invoice.get('open_type'),
      },
    })
  }

  render() {
    const { TYPE, invoice, isAndroidApp, isWechat } = this.props
    return (
      <div className={styles.detail}>
        {TYPE === 4 ? (
          <div className={classnames(styles.detail_state, styles.cancel_state)}>
            <img className={styles.icon} src={AssetImage.MyAccount.Receipt.CancelZiyuan} alt="发票" />
            <div className={styles.detail_bg}>
              <h3>已取消申请</h3>
              <p>您已取消开具发票，可重新申请</p>
              <div className={styles.btn}>
                <a href="tel:400-670-0188" className={styles.btn_kefu}>
                  联系客服
                </a>
                <span onClick={this.toLink}>重新申请</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={classnames(styles.detail_state)}>
            <img className={styles.icon} src={AssetImage.MyAccount.Receipt.Ziyuan} alt="发票" />
            <div className={styles.detail_bg}>
              <h3>已申请{invoice.get('open_type_zh')}</h3>
              {invoice.get('open_type') === 'merge' && <p>在租机器的发票将在服务终止/换机后开具</p>}
              {invoice.get('open_type') === 'stage' && <p>发票将在每期租金成功扣款3个工作日内开具</p>}
              <div className={styles.btn}>
                <span onClick={this.cancelApply}>取消申请</span>
                <a href="tel:400-670-0188">联系客服</a>
              </div>
            </div>
          </div>
        )}
        <h2>已开具 {invoice.get('open_num')} 张发票</h2>
        <DetailList
          contract_no={this.props.contract_no}
          email={this.props.invoice.get('email')}
          isAndroidApp={isAndroidApp}
          isWechat={isWechat}
        />
      </div>
    )
  }
}

export default Detail
