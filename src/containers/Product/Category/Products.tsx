import { Flex } from 'antd-mobile'
import { LazyImage, Link } from 'components'
import { TrackEventCategory } from 'configs/trackEventLabels'
import React from 'react'
import { renderLink } from 'utils/tools'
import styles from './Products.less'

export interface ProductProps {
  item: any
}

const Product: React.FunctionComponent<ProductProps> = ({ item }) => {
  const trackEvent = {
    label: `${TrackEventCategory.Product.CategoryProduct}\t${item.get('product_id')}`,
    category: TrackEventCategory.Category,
  }
  const showBaseFee = item.get('base_fee') > item.get('price')

  return (
    <Link className={styles.item} to={`/product/detail?id_activity=${item.get('product_id')}`} trackEvent={trackEvent}>
      <div className={styles.thumb}>
        <LazyImage src={item.get('image')} />
        {item.get('tag') && <p>{item.get('tag')}</p>}
      </div>
      <div className={styles.bottom}>
        <p className={styles.name}>{item.get('name')}</p>
        <p className={styles.offer}>{item.get('compare_buy')}</p>
        <Flex className={styles.tags} align="start" wrap="wrap">
          {item.get('property_tags').map((tag: any, key: number) => {
            return <span key={key}>{tag}</span>
          })}
        </Flex>
        <Flex className={styles.prices} align="end">
          <span className={styles.price}>
            ¥{item.get('price')}
            {item.get('price_unit')}
          </span>
          {showBaseFee && <span className={styles.line}>￥{item.get('base_fee')}</span>}
        </Flex>
      </div>
    </Link>
  )
}

export interface AdvertProps {
  advert: any
}

const Advert: React.FunctionComponent<AdvertProps> = ({ advert }) => {
  const trackEvent = {
    label: `${TrackEventCategory.Banner.CategoryBanner}\t${advert.get('image')}`,
    category: TrackEventCategory.Category,
  }
  
  return (
    <Link to={renderLink({ item: advert })} className={styles.advert} trackEvent={trackEvent}>
      <img src={advert.get('image')} />
    </Link>
  )
}

export interface ProductsProps {
  advert: any
  products?: any
}

const Products = ({ advert, products }: ProductsProps) => (
  <div className={styles.product_list_box}>
    {advert.get('image') && <Advert advert={advert} />}
    <Flex className={styles.product_list} wrap="wrap" justify="between" align="start">
      {products.map((item: any) => <Product key={item.get('product_id')} item={item} />)}
    </Flex>
  </div>
)

export default Products
