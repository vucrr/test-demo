import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Icon } from 'components'
import { Flex, ActionSheet } from 'antd-mobile'
import popupStyles from 'themes/action-sheet.less'
import styles from './RentBox.less'

const Item = Flex.Item

const RentBox = ({ info }) => {
  const showActionSheet = () => {
    // const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
    // const wrapProps = isIPhone ? {
    //   onTouchStart: e => e.preventDefault(),
    // } : null
    const BUTTONS = [
      <div className={popupStyles.popup_body_box}>
        <Flex>
          <Item>• 到期后自动按月续租，租金¥{info.get('rent_price')}/月</Item>
        </Flex>
        <Flex>
          <Item>• 期间可随时还机或买断</Item>
        </Flex>
        <Flex>
          <Item>• 续租最大时长为{info.get('max_rent_installment')}个月，到期自动买断，不再收费</Item>
        </Flex>
      </div>,
    ]
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      title: (
        <div className={popupStyles.popup_title} onClick={() => ActionSheet.close()}>
          <span>自动续租</span>
          <Icon className={popupStyles.btn_close} type={require('svg/close.svg')} />
        </div>
      ),
      maskClosable: true,
      className: popupStyles.popup_box,
      'data-seed': 'logId',
      // wrapProps,
    })
  }

  return (
    <Flex className={styles.rent_box}>
      <Item>
        <Flex>
          <Icon className={styles.icon} type={require('svg/right-circle-o.svg')} />自动续租
        </Flex>
      </Item>
      <span className={styles.link} onClick={showActionSheet}>
        了解详情
      </span>
    </Flex>
  )
}

RentBox.propTypes = {
  info: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default RentBox
