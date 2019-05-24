import { ButtonOptionsProps } from 'actions/myAccount/service/list'
import { Flex } from 'antd-mobile'
import cx from 'classnames'
import { Button } from 'components'
import { ContractInfo } from 'interfaces/account/service/detail'
import * as React from 'react'
import PopupBtn from '../List/PopupBtn'
import styles from './TopStatus.less'

export interface TopStatusProps {
  detail: any
  buttonOptions: (params: ButtonOptionsProps) => void
}

export interface TopStatusState {
  show: boolean
}

class TopStatus extends React.Component<TopStatusProps, TopStatusState> {
  readonly state: Readonly<TopStatusState> = {
    show: false,
  }

  togglePopup = (show: boolean) => {
    this.setState({ show })
  }

  handleClick = (btnItem: any, hasChildList: boolean) => {
    if (hasChildList) {
      this.togglePopup(!this.state.show)
    }
    const { detail, buttonOptions } = this.props
    const item: ContractInfo = detail.get('contract_info').toJS()
    buttonOptions({
      contractNo: item.contract_no,
      returnflowTradeNo: item.returnflow_trade_no,
      returnflowSubTradeNo: item.returnflow_sub_trade_no,
      contractStatus: item.contract_status,
      tradeNo: item.trade_no,
      returnDetailType: item.returnflow_type,
      buttonType: btnItem.get('button_type'),
      buttonLink: btnItem.get('button_link'),
      isSmallApp: item.is_ali_small,
      payNo: item.pay_no,
      pisCode: item.pis_code,
    })
  }
  render() {
    const { detail, buttonOptions } = this.props
    const btnList = detail.get('button_list')
    const mainStyles = cx(
      styles.top_status,
      detail.getIn(['contract_info', 'contract_status_bg_type']) === 1 && styles.default,
      btnList.size > 0 && styles.btn_status,
    )
    return (
      <div className={mainStyles}>
        <Flex align="start" justify="between">
          <div>
            <h3>{detail.getIn(['contract_info', 'contract_status_name'])}</h3>
            <p>{detail.getIn(['contract_info', 'contract_status_desc'])}</p>
          </div>
          <img className={styles.img} src={detail.getIn(['contract_info', 'contract_status_icon'])} alt="" />
        </Flex>
        {!!btnList.size && (
          <div className={styles.btn_box}>
            {btnList.map((btnItem: any, key: number) => {
              const hasChildList = !!btnItem.get('child_button_list').size
              const dicPosition = {
                0: 'left',
                [btnList.size - 1]: 'right',
              }
              const popupBtnProps = {
                position: dicPosition[key] || 'center',
                show: this.state.show,
                contract: {
                  contractNo: detail.getIn(['contract_info', 'contract_no']),
                  contractStatus: detail.getIn(['contract_info', 'contract_status']),
                  tradeNo: detail.getIn(['contract_info', 'trade_no']),
                  returnflowSubTradeNo: detail.getIn(['contract_info', 'returnflow_sub_trade_no']),
                  returnflowTradeNo: detail.getIn(['contract_info', 'returnflow_trade_no']),
                  returnDetailType: detail.getIn(['contract_info', 'returnflow_type']),
                },
                isSmallApp: detail.getIn(['contract_info', 'is_ali_small']),
                togglePopup: this.togglePopup,
                list: btnItem.get('child_button_list').toJS(),
                onServiceActions: {
                  buttonOptions,
                },
              }
              return (
                <Button
                  key={key}
                  className={cx(
                    styles.btn,
                    key === btnList.size - 1 && btnItem.get('button_tip').length > 0 && styles.btn_white,
                  )}
                  size="small"
                  inline={true}
                  onClick={() => this.handleClick(btnItem, hasChildList)}
                >
                  {btnItem.get('button_name')} {hasChildList ? <PopupBtn {...popupBtnProps} /> : ''}
                </Button>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

export default TopStatus
