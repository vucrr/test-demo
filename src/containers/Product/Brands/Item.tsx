import { Flex } from 'antd-mobile'
import { Icon, LazyImage, Link } from 'components'
import { TrackEventBrand } from 'configs/trackEventLabels'
import React from 'react'
import styles from './Item.less'

interface ItemProps {
  item: any
}

function Item({ item }: ItemProps) {
  const trackEvent = {
    label: `${TrackEventBrand.Product.BrandPageProduct}\t${item.get('product_id')}`,
    category: TrackEventBrand.Category,
  }
  const showBaseFee = item.get('base_fee') > item.get('price')
  return (
    <Link
      className={styles.container}
      to={`/product/detail?id_activity=${item.get('product_id')}`}
      trackEvent={trackEvent}
    >
      <div className={styles.thumb}>
        <LazyImage src={item.get('image')} />
        {item.get('tag') && <span className={styles.badge}>{item.get('tag')}</span>}
      </div>
      <div className={styles.right}>
        <h2>{item.get('name')}</h2>
        <p className={styles.desc}>{item.get('sub_title')}</p>
        <Flex className={styles.tags} align="start" wrap="wrap">
          {item.get('property_tags').map((tag: any, key: number) => (
            <span className={styles.tag} key={key}>
              {tag}
            </span>
          ))}
        </Flex>
        <div className={styles.prices}>
          <span className={styles.price}>
            <span className={styles.prefix}>￥</span>
            {item.get('price')}
          </span>
          <span className={styles.unit}>{item.get('price_unit')}</span>
          {showBaseFee && <span className={styles.line}>￥{item.get('base_fee')}</span>}
        </div>
        <Flex className={styles.compares}>
          {item.get('compare_buy') && (
            <Flex className={styles.item_left}>
              <Icon className={styles.icon} type={require('svg/mai.svg')} color="#666" />
              <span className={styles.text}>{item.get('compare_buy')}</span>
            </Flex>
          )}
          {item.get('compare_installment') && (
            <Flex>
              <Icon className={styles.icon} type={require('svg/fen.svg')} color="#666" />
              <span className={styles.text}>{item.get('compare_installment')}</span>
            </Flex>
          )}
        </Flex>
      </div>
    </Link>
  )
}

export default Item
