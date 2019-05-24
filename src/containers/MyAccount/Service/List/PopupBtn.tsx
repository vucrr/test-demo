import { ButtonOptionsProps } from 'actions/myAccount/service/list'
import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { ButtonGroup, ChildButtonList } from 'interfaces/account/service/list'
import React from 'react'
import styles from './PopupBtn.less'

const Item = Flex.Item

export interface PopupBtnProps {
  position: string
  show: boolean
  togglePopup: any // (show: boolean): void
  contract: {
    contractNo: string
    contractStatus?: number
    tradeNo: string
    returnflowTradeNo?: string
    returnDetailType?: string
    returnflowSubTradeNo?: string
    payNo?: string
    pisCode?: string
  }
  isSmallApp: boolean
  list: ButtonGroup['child_button_list']
  onServiceActions: {
    buttonOptions: (params: ButtonOptionsProps) => void
  }
}

export const PopupBtn: React.FunctionComponent<PopupBtnProps> = ({
  position,
  show,
  togglePopup,
  contract,
  isSmallApp,
  list,
  onServiceActions,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>, btnItem?: ChildButtonList) => {
    e.preventDefault()
    e.stopPropagation()
    togglePopup(false)
    btnItem &&
      onServiceActions.buttonOptions({
        contractNo: contract.contractNo,
        contractStatus: contract.contractStatus,
        tradeNo: contract.tradeNo,
        returnflowSubTradeNo: contract.returnflowSubTradeNo,
        returnflowTradeNo: contract.returnflowTradeNo,
        returnDetailType: contract.returnDetailType,
        buttonType: btnItem.button_type,
        buttonLink: btnItem.button_link,
        isSmallApp: isSmallApp,
        payNo: contract.payNo,
        pisCode: contract.pisCode,
      })
  }
  return (
    <>
      <Flex className={classnames(styles.popup, styles[position], show && styles.active)}>
        {list!.map((item, key) => (
          <Item key={key} onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClick(e, item)}>
            {item.button_name}
          </Item>
        ))}
      </Flex>
      <div className={classnames(styles.popup_wrap, show && styles.active)} onClick={handleClick} />
    </>
  )
}

export default PopupBtn
