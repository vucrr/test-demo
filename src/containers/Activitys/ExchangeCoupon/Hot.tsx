import Router from 'next/router'
import React from 'react'
import styles from './Hot.less'

interface HotProps {
  list: any
  ua: any
}

class Hot extends React.Component<HotProps> {
  handleClick = (item: any) => async () => {
    await Router.push(`/product/detail?id_activity=${item.get('activity_id')}`)
    window.scrollTo(0, 0)
  }
  productClick = async () => {
    if (this.props.ua.get('isIOSApp')) {
      location.href = 'http://www.xianghuanji.com/product/category'
    } else if (this.props.ua.get('isAndroidApp')) {
      location.href = 'product/category'
    } else {
      await Router.push('/product/category')
    }
  }

  render() {
    const { list } = this.props
    return (
      <div className={styles.hot}>
        <div className={styles.hotbg} />
        <p className={styles.tit}>人气爆款</p>
        <div className={styles.hotorders}>
          {list.map((item: any, key: number) => (
            <div className={styles.hotorder} key={key} onClick={this.handleClick(item)}>
              <div className={styles.hotorderImg}>
                <img src={item.get('img_url')} alt="" />
              </div>
              <div className={styles.hotorderInfo}>
                <p className={styles.hotInfotit}>{item.get('product_name')}</p>
                <p className={styles.hotInfomsg}>
                  {item.get('compare_price_desc_left')}
                  <span className={styles.hotprice}>{item.get('compare_price_amount')}</span>
                  {item.get('compare_price_desc_right')}
                </p>
                <div className={styles.hotInfoBtn}>立即换新</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.checkbtn} onClick={this.productClick}>
          查看更多换新机型
        </div>
      </div>
    )
  }
}

export default Hot
