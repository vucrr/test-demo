// import { Icon } from 'components'
// import classnames from 'classnames'
import { Flex, List, NoticeBar } from 'antd-mobile'
import React from 'react'
import styles from './ItemBox.less'

const Item = List.Item
const Brief = Item.Brief

const ItemBox = ({ buyout }: { buyout: any }) => {
  return (
    <>
      <List className={styles.item_box}>
        <Item extra={`￥${buyout.get('buyoutPrice')}`}>
          <strong>买断金额</strong>
          {+buyout.get('overdueFee') > 0 && <Brief>(含逾期利息¥{buyout.get('overdueFee')})</Brief>}
        </Item>
        {/* 当没有押金抵扣时，也不显示另需支付金额 */}
        {+buyout.get('frozen_to_payprice') > 0 ? (
          <Item>
            <Flex className={styles.sub_item}>
              <Flex.Item>押金抵扣</Flex.Item>
              <span>￥{buyout.get('frozen_to_payprice')}</span>
            </Flex>
            <Flex className={styles.sub_item}>
              <Flex.Item>另需支付</Flex.Item>
              <span>￥{buyout.get('buyoutFee')}</span>
            </Flex>
          </Item>
        ) : (
          <></>
        )}
      </List>
      {buyout.get('unfreeze_price') > 0 && (
        <NoticeBar className={styles.notice} icon={<></>}>
          还剩¥{buyout.get('unfreeze_price')}押金未抵扣，将在买断后释放
        </NoticeBar>
      )}
    </>
  )
}

export default ItemBox
