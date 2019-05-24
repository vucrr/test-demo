// import classnames from 'classnames'
import { ActionSheet, Flex, List, NoticeBar } from 'antd-mobile'
import { Icon } from 'components'
import React from 'react'
import popupStyles from 'themes/action-sheet.less'
import styles from './ItemBox.less'

const Item = List.Item

const ItemBox = () => {
  const showActionSheet = () => {
    // const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
    // const wrapProps = isIPhone ? {
    //   onTouchStart: e => e.preventDefault(),
    // } : null
    const BUTTONS: any = (
      <div className={popupStyles.popup_body_box} key={1}>
        <Flex className={popupStyles.gray_text}>
          <Flex.Item>支付金额包含以下费用：</Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item>· 提前还机服务费</Flex.Item>
          <Flex.Item className={popupStyles.right_item}>￥100</Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item>· 本期未结租金</Flex.Item>
          <Flex.Item className={popupStyles.right_item}>￥100</Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item>· 往期未结租金</Flex.Item>
          <Flex.Item className={popupStyles.right_item}>￥100</Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item>· 逾期费</Flex.Item>
          <Flex.Item className={popupStyles.right_item}>￥100</Flex.Item>
        </Flex>
        <Flex className={popupStyles.gray_text}>
          <Flex.Item>费用将会优先使用您的账户余额、已冻结押金部分抵扣</Flex.Item>
        </Flex>
      </div>
    )
    ActionSheet.showActionSheetWithOptions({
      options: [BUTTONS],
      title: (
        <div className={popupStyles.popup_title} onClick={() => ActionSheet.close()}>
          <span>费用明细</span>
          <Icon className={popupStyles.btn_close} type={require('svg/close.svg')} />
        </div>
      ),
      maskClosable: true,
      className: popupStyles.popup_box,
      // wrapProps,
    })
  }

  return (
    <>
      <List className={styles.item_box}>
        <Item extra={'￥3000'}>
          <Flex>
            支付金额{' '}
            <Icon onClick={showActionSheet} className={styles.icon} type={require('svg/question-circle.svg')} />
          </Flex>
        </Item>
        <Item>
          <Flex className={styles.sub_item}>
            <Flex.Item>账户余额抵扣</Flex.Item>
            <span>￥3000</span>
          </Flex>
          <Flex className={styles.sub_item}>
            <Flex.Item>押金抵扣</Flex.Item>
            <span>￥3000</span>
          </Flex>
          <Flex className={styles.sub_item}>
            <Flex.Item>另需支付</Flex.Item>
            <span>￥3000</span>
          </Flex>
        </Item>
      </List>
      <NoticeBar className={styles.notice} icon={<></>}>
        还剩¥200押金未抵扣，将在还机后释放
      </NoticeBar>
    </>
  )
}

export default ItemBox
