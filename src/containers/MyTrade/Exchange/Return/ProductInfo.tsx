import { ActionSheet, Flex, Modal } from 'antd-mobile'
import { Icon } from 'components'
import { TrackEventExchange } from 'configs/trackEventLabels'
import React from 'react'
import popupStyles from 'themes/action-sheet.less'
import { trackClickEvent } from 'utils/piwik'
import styles from './ProductInfo.less'

const Item = Flex.Item

export interface ProductBoxProps {
  thumb: string
  alias: string
}

const ProductBox: React.FunctionComponent<ProductBoxProps> = ({ thumb, alias }) => {
  return (
    <div className={styles.product_box}>
      <Flex className={styles.item}>
        <img className={styles.thumb} src={thumb} />
        <Item className={styles.text}>{alias}</Item>
      </Flex>
    </div>
  )
}

export interface InfoListProps {
  info: any
}

const InfoList: React.FunctionComponent<InfoListProps> = ({ info }) => {
  const showActionSheet = () => {
    trackClickEvent({
      category: TrackEventExchange.ReturnWayChoose.category,
      label: TrackEventExchange.ReturnWayChoose.name1,
    })
    const returnTips = info.get('early_return_tips')
    const body = returnTips.get('body') || []
    const BUTTONS: any = [
      <div className={popupStyles.popup_body_box} key="1">
        <Flex className={popupStyles.gray_text}>
          <Flex.Item>{returnTips.get('head_text')}</Flex.Item>
        </Flex>
        {body.map((item: any, index: number) => {
          if (item.get('money') === '0') {
            return null
          }
          return (
            <Flex key={index}>
              <Item>{item.get('title')}</Item>
              <Item className={popupStyles.right_item}>{item.get('money')}</Item>
            </Flex>
          )
        })}

        <Flex className={styles.gray_red}>
          <Item>{returnTips.get('body_tips')}</Item>
        </Flex>
      </div>,
    ]
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      title: (
        <div className={popupStyles.popup_title}>
          <span>分期明细</span>
          <Icon className={popupStyles.btn_close} type={require('svg/close.svg')} onClick={() => ActionSheet.close()} />
        </div>
      ),
      maskClosable: true,
      className: popupStyles.popup_box,
    })
  }

  const showTips = () => {
    trackClickEvent({
      category: TrackEventExchange.ReturnWayChoose.category,
      label: TrackEventExchange.ReturnWayChoose.name2,
    })
    Modal.alert('', info.getIn(['end_time_tips', 'title']), [{ text: '我知道了' }], 'android')
  }

  return (
    <div className={styles.info_list}>
      <Flex className={styles.item} justify="between">
        <span>{info.get('use_text')}</span>
        <span>{info.get('use_time')}</span>
      </Flex>
      {info.get('early_return_money') !== 0 && (
        <Flex className={styles.item} justify="between">
          <Flex>
            {info.get('early_return_text')}
            <Icon
              onClick={showActionSheet}
              className={styles.icon}
              type={require('svg/question-circle.svg')}
              size="xxs"
              color="#00A699"
            />
          </Flex>
          <span>￥{info.get('early_return_money')}</span>
        </Flex>
      )}
      <Flex className={styles.item} justify="between">
        <Flex>
          {info.get('end_time_text')}
          <Icon
            onClick={showTips}
            className={styles.icon}
            type={require('svg/question-circle.svg')}
            size="xxs"
            color="#00A699"
          />
        </Flex>
        <span>{info.get('end_time')}</span>
      </Flex>
    </div>
  )
}

export interface ProductInfoProps {
  info: any
}

const ProductInfo: React.FunctionComponent<ProductInfoProps> = ({ info }) => {
  const productBoxProps = {
    thumb: info.get('sku_small_img'),
    alias: info.get('alias'),
  }

  return (
    <div className={styles.info_box}>
      <ProductBox {...productBoxProps} />
      <InfoList info={info} />
    </div>
  )
}

export default ProductInfo
