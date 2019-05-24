import { ButtonOptionsProps } from 'actions/myAccount/service/list'
import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Button, LazyImage, NoticeBar, Wrap } from 'components'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import { ButtonGroup, ServiceListItem } from 'interfaces/account/service/list'
import Router from 'next/router'
import React from 'react'
import { TrackClickEventProperties, trackClickEvent } from 'utils/piwik'
import styles from './ListItem.less'
import PopupBtn from './PopupBtn'

const Item = Flex.Item

export const dicColor: { [index: number]: string } = {
  1: styles.blue,
  2: styles.red,
  3: styles.gray,
}

const getLinkTo = (item: ServiceListItem, labelType: string): string => {
  // label_type: 1.开启续租、2.补充办卡入网资料、3.查看办卡入网资料
  const dic: { [index: string]: string } = {
    1: `/trade/autorent-open?trade_no=${item.trade_no}`,
    2: `/trade/form/info?trade_no=${item.trade_no}`,
    3: `/trade/form/info?trade_no=${item.trade_no}`,
  }
  return dic[labelType]
}

export interface ListItemProps {
  item: ServiceListItem
  status?: '1' | '2'
  onServiceActions: {
    buttonOptions: (params: ButtonOptionsProps) => void
  }
}

export interface ListItemState {
  show: boolean
}

class ListItem extends React.Component<ListItemProps, ListItemState> {
  readonly state: Readonly<ListItemState> = {
    show: false,
  }

  togglePopup = (show: boolean) => {
    this.setState({ show })
  }

  handleClick = (btnItem: ButtonGroup, hasChildList: boolean) => {
    if (hasChildList) {
      this.togglePopup(!this.state.show)
    }
    const { item, onServiceActions } = this.props
    onServiceActions.buttonOptions({
      contractNo: item.contract_no,
      returnflowTradeNo: item.returnflow_trade_no,
      returnflowSubTradeNo: item.returnflow_sub_trade_no,
      returnDetailType: item.returnflow_type,
      contractStatus: item.contract_status,
      tradeNo: item.trade_no,
      buttonType: btnItem.button_type,
      buttonLink: btnItem.button_link,
      isSmallApp: item.is_ali_small,
      payNo: item.pay_no,
      pisCode: item.pis_code,
    })
  }

  linkTo = async (contractNo: string, trackEvent?: TrackClickEventProperties) => {
    if (trackEvent) trackClickEvent(trackEvent)
    await Router.push(`/myaccount/service/detail?contract_no=${contractNo}`)
  }

  render() {
    const { show } = this.state
    const { item, onServiceActions, status } = this.props
    const btnList = item.button_group
    const notices = item.label_group
    const trackEvent = status === '2' ? TrackEventMyCenter.HistoricalOrderCommodity : TrackEventMyCenter.Commodity
    return (
      <>
        <Wrap size="md" bgColor="#fff" className={styles.item}>
          <Flex className={styles.info} onClick={() => this.linkTo(item.contract_no, trackEvent)}>
            <div className={styles.thumb}>
              <LazyImage src={item.sku_info.sku_img_url} />
              <span className={dicColor[item.color_type]}>{item.show_text}</span>
            </div>
            <Item>
              <h4>{item.sku_info.sku_name}</h4>
              <span>{item.next_pay_date}</span>
              <br />
              <span>{item.repayment_amount}</span>
            </Item>
          </Flex>
          {!!btnList.length && (
            <div className={styles.btn_box}>
              {btnList.map((btnItem, key) => {
                const hasChildList = !!btnItem.child_button_list && btnItem.child_button_list.length > 0
                const dicPosition = {
                  0: 'left',
                  [btnList.length - 1]: 'right',
                }
                const popupBtnProps = {
                  position: dicPosition[key] || 'center',
                  show,
                  contract: {
                    contractNo: item.contract_no,
                    contractStatus: item.contract_status,
                    returnflowSubTradeNo: item.returnflow_sub_trade_no,
                    tradeNo: item.trade_no,
                    returnflowTradeNo: item.returnflow_trade_no,
                    returnDetailType: item.returnflow_type,
                    payNo: item.pay_no,
                    pisCode: item.pis_code,
                  },
                  isSmallApp: item.is_ali_small,
                  togglePopup: this.togglePopup,
                  list: btnItem.child_button_list,
                  onServiceActions,
                }
                return (
                  <Button
                    key={key}
                    className={classnames(
                      styles.btn,
                      key === btnList.length - 1 &&
                        btnItem.button_tip &&
                        btnItem.button_tip.length > 0 &&
                        styles.btn_white,
                    )}
                    size="small"
                    inline={true}
                    onClick={() => this.handleClick(btnItem, hasChildList)}
                  >
                    {btnItem.button_name} {hasChildList ? <PopupBtn {...popupBtnProps} /> : ''}
                  </Button>
                )
              })}
            </div>
          )}
        </Wrap>
        {notices.length > 0 && (
          <NoticeBar native={true} to={getLinkTo(item, notices[0].label_type)} mode="link">
            {notices[0].label_name}
          </NoticeBar>
        )}
      </>
    )
  }
}

export default ListItem
