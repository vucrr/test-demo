import { ButtonOptionsProps, buttonOptions } from 'actions/myAccount/service/list'
import { Flex } from 'antd-mobile'
import { Button, Icon, LazyImage } from 'components'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import { ButtonGroup, Contract, EquityItem } from 'interfaces/account/center'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { TrackClickEventProperties, trackClickEvent } from 'utils/piwik'
import styles from './ServiceItem.less'
import Tips from './Tips'

const Item = Flex.Item

const dicColor: { [index: number]: string } = {
  1: styles.blue,
  2: styles.red,
  3: styles.gray,
}

export interface TopItemProps {
  info: Omit<Contract, 'equity' | 'button_group'>
  btnList: ButtonGroup[]
  buttonOptions: (params: ButtonOptionsProps) => void
}

const TopItem: React.FunctionComponent<TopItemProps> = ({ info, btnList, buttonOptions }) => {
  const linkTo = async (contractNo: string) => {
    trackClickEvent(TrackEventMyCenter.Commodity)
    await Router.push(`/myaccount/service/detail?contract_no=${contractNo}`)
  }

  const handleClick = (btnItem: ButtonGroup) => {
    buttonOptions({
      contractNo: info.contract_no,
      returnflowTradeNo: info.returnflow_trade_no, // 申请还机单号
      returnflowSubTradeNo: info.returnflow_sub_trade_no, // 还机单号
      returnDetailType: info.returnflow_type,
      contractStatus: info.contract_status,
      tradeNo: info.trade_no,
      buttonType: btnItem.button_type,
      buttonLink: btnItem.button_link,
      isSmallApp: info.is_ali_small,
      payNo: info.pay_no,
      pisCode: info.pis_code,
    })
  }
  return (
    <div className={styles.top}>
      <Flex className={styles.info} onClick={() => linkTo(info.contract_no)}>
        <div className={styles.thumb}>
          <LazyImage src={info.sku_info.sku_img_url} />
          <span className={dicColor[info.color_type]}>{info.show_text}</span>
        </div>
        <Item>
          <h4>{info.sku_info.sku_name}</h4>
          <span>{info.next_pay_date}</span>
          <br />
          <span>{info.repayment_amount}</span>
        </Item>
      </Flex>
      {!!btnList.length && (
        <div className={styles.btn_box}>
          {btnList.map((item, key) => (
            <Button
              key={key}
              type={key === btnList.length - 1 && item.button_tip.length > 0 ? 'ghost' : undefined}
              className={styles.btn}
              size="small"
              inline={true}
              onClick={() => {
                handleClick(item)
              }}
            >
              {item.button_name}
              {key === btnList.length - 1 && item.button_tip.length > 0 ? <Tips info={item.button_tip} /> : ''}
            </Button>
          ))}
        </div>
      )}
      {!!info.logistics_tip && (
        <div className={styles.content_box}>
          <Flex className={styles.tips} justify="between" align="center">
            {info.logistics_tip} <Icon type="cross" />
          </Flex>
        </div>
      )}
    </div>
  )
}

export interface BottomProps {
  list: Contract['equity']['list']
  contractNo: string
}

const Bottom: React.FunctionComponent<BottomProps> = ({ list, contractNo }) => {
  const linkTo = async (link: string, trackEvent?: TrackClickEventProperties) => {
    if (trackEvent) trackClickEvent(trackEvent)
    await Router.push(link)
  }
  return (
    <div className={styles.bottom}>
      <Flex
        className={styles.title_box}
        align="center"
        onClick={() =>
          linkTo(`/myaccount/service/privilege?contract_no=${contractNo}`, TrackEventMyCenter.ViewAllRights)
        }
      >
        <Item>专属权益</Item>
        <Icon type="right" color="#ccc" />
      </Flex>
      <Flex className={styles.grid}>
        {list.map((item: EquityItem, key: number) => (
          <Item
            className={styles.grid_item}
            key={key}
            onClick={() =>
              linkTo(`/myaccount/service/privilege?contract_no=${contractNo}&page=${key}`, {
                ...TrackEventMyCenter.Right,
                label: item.title,
              })
            }
          >
            <LazyImage src={item.icon} />
            <span>{item.title}</span>
          </Item>
        ))}
      </Flex>
    </div>
  )
}

export interface ServiceItemProps {
  item: Contract
  buttonOptions: (params: ButtonOptionsProps) => void
}

const ServiceItem: React.FunctionComponent<ServiceItemProps> = ({ item, buttonOptions }) => {
  const { equity, button_group, ...topInfo } = item
  return (
    <>
      <TopItem info={topInfo} btnList={button_group} buttonOptions={buttonOptions} />
      {!!equity.list.length && <Bottom list={equity.list} contractNo={topInfo.contract_no} />}
    </>
  )
}

export default connect(
  null,
  { buttonOptions },
)(ServiceItem)
