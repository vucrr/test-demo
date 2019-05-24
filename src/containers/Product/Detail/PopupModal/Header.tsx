import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Alert, Icon } from 'components'
import React from 'react'
import styles from './index.less'

const Item = Flex.Item

interface HeaderProps {
  title: string
  property: any
  onDetailActions: any
  togglePopup: Function
}

const Header: React.FunctionComponent<HeaderProps> = props => {
  const { property, togglePopup, title } = props
  const { onDetailActions } = props

  const popupModalId = property.get('popupModalId')
  const vasList = property.get('vasList')
  const curRent = property.get('curRent')
  const info = property.get('info')
  const hasRent = !!curRent

  const showGoBack = popupModalId !== 0

  const goBack = () => {
    if (popupModalId - 1 < 0) return
    onDetailActions.changePopupModalId({ id: popupModalId - 1 })
  }

  const unit = hasRent ? '' : '起'

  // 服务价格
  const vasListPrice =
    vasList.reduce((curPrice: number, item: any) => {
      return item.get('is_required') || item.get('selected') ? curPrice + +item.get('price') : curPrice
    }, 0) || 0

  // 默认价格
  let price: any = {
    // 月租价格
    month_price: info.get('monthly_rent_price'),
    // 首期费用
    down_payment_price: info.get('down_payment_price'),
    // 划线价格
    line_price: info.get('line_price'),
    // 买断价格
    buyout_price: info.getIn(['rent_plan', 'buyout_content']),
    // 续租价格
    relet_fee: info.getIn(['rent_plan', 'relet_content']),
  }

  if (curRent) {
    price = curRent.toJS()
    price.down_payment_price = (+price.month_price || 0) + (+price.service_price || 0) + vasListPrice
    Object.keys(price).forEach(key => (price[key] = parseFloat(price[key])))
  }

  return (
    <div className={styles.popup_header}>
      <Flex className={styles.header_top} justify="between" align="center">
        <Icon
          className={classnames(styles.icon, { [styles.show]: showGoBack })}
          onClick={goBack}
          type={require('svg/arrow-left.svg')}
        />
        <div className={styles.title}>{title}</div>
        <Icon color="#BBB" onClick={e => togglePopup(e, false)} type={require('svg/close.svg')} />
      </Flex>
      <div className={styles.header_body}>
        <Flex className={styles.price_box} justify="center" align="start">
          <div className={styles.prize_item}>
            <Flex className={styles.prize_item_title} align="center" justify="center">
              {info.get('monthly_rent_title')}
            </Flex>
            <span className={styles.text_red}>
              ￥{price.month_price}/月{unit}
            </span>
            {price.line_price > 0 && (
              <span className={styles.old_price}>
                ￥{price.line_price}/月{unit}
              </span>
            )}
          </div>
          <div className={styles.line} />
          <div className={styles.prize_item}>
            <Flex className={styles.prize_item_title} align="center" justify="center">
              {info.get('down_payment_title')}
              <Icon
                onClick={() => {
                  Alert(
                    info.get('down_payment_desc_title'),
                    info.get('down_payment_desc'),
                    [{ text: '我知道了' }],
                    'android',
                  )
                }}
                className={styles.icon}
                color="#00A699"
                type={require('svg/question-circle.svg')}
              />
            </Flex>
            <span className={styles.text_red}>
              ￥{price.down_payment_price}
              {unit}
            </span>
          </div>
        </Flex>
        <Flex className={styles.info} align="center" justify="center">
          <Icon className={styles.icon} color="#DDDDDD" type={require('svg/rule.svg')} />
          {`${info.get('deposit_tips_1')}${parseFloat(info.get('deposit'))}${info.get('deposit_tips_2')}`}
        </Flex>
        <div className={styles.plan_box}>
          <div className={styles.title}>
            {info.getIn(['rent_plan', 'title'])}
            <span>{info.getIn(['rent_plan', 'tips'])}</span>
          </div>
          <div className={styles.line} />
          <Flex className={styles.plan_list} align="center" justify="around">
            <Item>
              <div className={styles.text}>{info.getIn(['rent_plan', 'replace_title'])}</div>
              <div className={styles.des + ' ' + styles.small}>{info.getIn(['rent_plan', 'replace_content'])}</div>
            </Item>
            <Item>
              <div className={styles.text}>{info.getIn(['rent_plan', 'relet_title'])}</div>
              <div className={styles.des}>
                {curRent ? '¥' : ''}
                {price.relet_fee}
              </div>
            </Item>
            <Item>
              <div className={styles.text}>{info.getIn(['rent_plan', 'buyout_title'])}</div>
              <div className={styles.des}>
                {curRent ? '¥' : ''}
                {price.buyout_price}
              </div>
            </Item>
            <Item>
              <div className={styles.text}>{info.getIn(['rent_plan', 'return_title'])}</div>
              <div className={styles.des}>{info.getIn(['rent_plan', 'return_content'])}</div>
            </Item>
          </Flex>
        </div>
      </div>
    </div>
  )
}

export default Header
