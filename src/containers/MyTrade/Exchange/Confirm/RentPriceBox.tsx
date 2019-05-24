import { Accordion, Flex, List } from 'antd-mobile'
import classnames from 'classnames'
import { PopupModal } from 'components'
import { TrackEventTradeDev } from 'configs/trackEventLabels'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './RentPriceBox.less'
// import { scrollToAnchor } from 'utils/tools'

const Item = Flex.Item

type source = 'exchange' | 'order'

export interface ExtraRentBoxProps {
  info: any
  source: source
}

const ExtraRentBox: React.FunctionComponent<ExtraRentBoxProps> = ({ info, source }) => {
  const onChange = (key: any) => {
    const label = key.length ? TrackEventTradeDev.ExtraRentBox.Item1 : TrackEventTradeDev.ExtraRentBox.Item2
    trackClickEvent({ category: TrackEventTradeDev.ExtraRentBox.Name, label: label })
  }
  return (
    <Accordion className={classnames(styles.extra_rent_box, styles[source])} onChange={onChange}>
      <Accordion.Panel header={info.get('title')}>
        <div className={styles.rent_body}>
          <Flex>
            <Flex.Item>每期还款</Flex.Item>
            <span>￥{info.get('price')}</span>
          </Flex>
          <div className={styles.text_box}>
            {info.get('remark_info').map((item: string, key: number) => <span key={key}>{item}</span>)}
          </div>
        </div>
      </Accordion.Panel>
    </Accordion>
  )
}

export interface DetailModalProps {
  vasList: any
  priceInfo: any
  couponList: any
  schemeInfo: any
  firstPerReduceInfo: any
}

export interface DetailModalState {
  show: boolean
}
export class DetailModal extends React.Component<DetailModalProps, DetailModalState> {
  readonly state: Readonly<DetailModalState> = {
    show: false,
  }

  handleToggleModal = (type: boolean) => {
    const label = type ? TrackEventTradeDev.DetailModal.Item1 : TrackEventTradeDev.DetailModal.Item2
    trackClickEvent({ category: TrackEventTradeDev.DetailModal.Name, label })
    this.setState(prevState => ({ show: !prevState.show }))
  }

  render() {
    const { priceInfo, vasList, couponList, schemeInfo, firstPerReduceInfo } = this.props
    const isTermPrice = priceInfo.get('show_model') === 2 // 显示模式（1、每期，2、首期剩余每期）
    return (
      <>
        <span className={styles.link} onClick={() => this.handleToggleModal(true)}>
          租金明细
        </span>
        <PopupModal
          title="租金明细"
          visible={this.state.show}
          onClose={() => this.handleToggleModal(false)}
          className={styles.popup}
        >
          {couponList.count() > 0 && (
            <div className={styles.coupon_list}>
              {couponList.map((item: any, key: number) => (
                <Flex className={styles.item} key={key}>
                  <Item className={styles.flex}>
                    <img src={item.get('coupon_icon')} className={styles.icon_coupon} />
                    {item.get('coupon_title')}
                  </Item>
                  <span>-￥{item.get('coupon_price')}</span>
                </Flex>
              ))}
            </div>
          )}
          {!isTermPrice && (
            <div className={styles.item_list}>
              <div className={styles.sub_title}>首期还款包含</div>
              <Flex className={styles.item} align="start">
                <Item>月租</Item>
                <b>￥{priceInfo.get('term_rent_line_price')}</b>
              </Flex>
              {priceInfo.get('ap_service_price') > 0 && (
                <Flex className={styles.item} align="start">
                  <Item>{priceInfo.get('service_name')}</Item>
                  <b>￥{isTermPrice ? priceInfo.get('term_ap_service_price') : priceInfo.get('ap_service_price')}</b>
                </Flex>
              )}
              {priceInfo.get('is_show_premium') && (
                <Flex className={styles.item} align="start">
                  <Item>{priceInfo.get('premium_name')}</Item>
                  <b>￥{priceInfo.get('premium_price')}</b>
                </Flex>
              )}
              {vasList.map((item: any, key: number) => {
                const price = isTermPrice ? item.get('vas_term_price') : item.get('vas_price')
                if (+price === 0) {
                  return false
                }
                return (
                  <Flex className={styles.item} align="start" key={key}>
                    <Item>{item.get('vas_name')}</Item>
                    <b>￥{price}</b>
                  </Flex>
                )
              })}
              {firstPerReduceInfo.get('is_show_first_text') && (
                <div className={styles.total}>
                  <span className={styles.sub_title}>已优惠¥{firstPerReduceInfo.get('first_price_gurantee')}</span>总计<span
                    className={styles.red}
                  >
                    <b>￥{firstPerReduceInfo.get('first_price_count')}</b>
                  </span>
                </div>
              )}
            </div>
          )}
          <div className={styles.item_list}>
            <div className={styles.sub_title}>{isTermPrice ? '' : '剩余'}每期还款包含</div>
            <Flex className={styles.item} align="start">
              <Item>月租</Item>
              <b>￥{priceInfo.get('term_rent_line_price')}</b>
            </Flex>
            {firstPerReduceInfo.get('is_show_per_text') && (
              <div className={styles.total}>
                <span className={styles.sub_title}>每期已优惠¥{firstPerReduceInfo.get('per_price_gurantee')}</span>优惠后月租<span
                  className={styles.red}
                >
                  <b>￥{firstPerReduceInfo.get('per_price_count')}</b>
                </span>
              </div>
            )}
          </div>
          <div className={styles.item_list}>
            <div className={styles.sub_title}>{priceInfo.get('lease_term')}期后还款包含</div>
            <Flex className={styles.item} align="start">
              <Item>月租</Item>
              <b>￥{schemeInfo.get('price')}</b>
            </Flex>
          </div>
        </PopupModal>
      </>
    )
  }
}

export interface RentPriceBoxProps {
  priceInfo: any
  priceSchemeInfo: any
  couponList: any
  vasList: any
  source?: source
  firstPerReduceInfo: any
}

const RentPriceBox: React.FunctionComponent<RentPriceBoxProps> = ({
  priceInfo,
  priceSchemeInfo,
  couponList,
  vasList,
  source = 'order',
  firstPerReduceInfo,
}) => {
  const isTermPrice = priceInfo.get('show_model') === 2 // 显示模式（1、首期每期，2、分摊每月）

  return (
    <>
      <List className={classnames(styles.rent_price_box, styles[source])}>
        <List.Item className={styles.title_box}>
          <Flex>
            <Item className={styles.title}>{source === 'exchange' && '新机'}租金费用</Item>
            <DetailModal
              vasList={vasList}
              priceInfo={priceInfo}
              couponList={couponList}
              schemeInfo={priceSchemeInfo}
              firstPerReduceInfo={firstPerReduceInfo}
            />
          </Flex>
        </List.Item>
        {couponList.map((item: any, key: number) => (
          <List.Item className={classnames(styles.coupon_box, styles.item_box)} key={key}>
            <Flex className={styles.item}>
              <Item className="flex-box">
                <img src={item.get('coupon_icon')} className={styles.icon_coupon} />
                {item.get('coupon_title')}
              </Item>
              <span>-￥{item.get('coupon_price')}</span>
            </Flex>
          </List.Item>
        ))}
        {!isTermPrice && (
          <List.Item className={styles.item_box}>
            <Flex className={styles.item} align="start">
              <Item>首期还款</Item>
              <span>
                ￥{priceInfo.get('first_rent_price')}x1 期
                {priceInfo.get('is_show_first_line') && (
                  <span className={styles.line_price}>￥{priceInfo.get('first_rent_line_price')}</span>
                )}
              </span>
            </Flex>
            <Flex className={styles.item} align="start">
              <Item>剩余分期</Item>
              <span>
                ￥{priceInfo.get('term_rent_price')}x{priceInfo.get('lease_term') - 1} 期
                {priceInfo.get('is_show_term_line') && (
                  <span className={styles.line_price}>￥{priceInfo.get('term_rent_line_price')}</span>
                )}
              </span>
            </Flex>
          </List.Item>
        )}
        {isTermPrice && (
          <List.Item className={styles.item_box}>
            <Flex className={styles.item} align="start">
              <Item>每期还款</Item>
              <span>
                ￥{priceInfo.get('term_rent_price')} x {priceInfo.get('lease_term')} 期
                {priceInfo.get('is_show_term_line') && (
                  <span className={styles.line_price}>￥{priceInfo.get('term_rent_line_price')}</span>
                )}
              </span>
            </Flex>
          </List.Item>
        )}
      </List>
      <ExtraRentBox info={priceSchemeInfo} source={source} />
    </>
  )
}

export default RentPriceBox
