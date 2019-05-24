import { Flex } from 'antd-mobile'
import { Link } from 'components'
import React from 'react'
import { formatBankCard } from 'utils/tools'
import styles from './Item.less'

interface ItemProps {
  item: any
  type: 'list' | 'item'
}

const Item = ({ item, type }: ItemProps) => {
  const bgStyle = {
    background: `#fff url('${item.get('backImg')}') right top no-repeat`,
    backgroundSize: 'contain',
  }

  return (
    <Link
      to={type === 'list' ? `/account/unionPay/detail?protocolNo=${item.get('protocolNo')}` : 'javascript:void(0);'}
      className={styles.item}
    >
      <div className={styles.bg} style={bgStyle}>
        <Flex>
          <img className={styles.icon} src={item.get('icon')} />
          <Flex.Item>
            <h5>{item.get('bankName')}</h5>
            <span>{item.get('cardDesc')}</span>
          </Flex.Item>
        </Flex>
        <p className={styles.card}>
          {type === 'list' ? item.get('bankCardNo') : formatBankCard(item.get('bankCardNo'))}
        </p>
      </div>
    </Link>
  )
}

export default Item
