import { Flex } from 'antd-mobile'
import { Icon } from 'components'
import Router from 'next/router'
import React from 'react'
import styles from './Foryou.less'

interface ForyouProps {
  list: any
}

const Pop = ({ popClick }: any) => {
  return (
    <div className={styles.pop}>
      <div className={styles.content}>
        <p className={styles.tit}>保价是什么意思？</p>
        <p className={styles.con}>下单后30天内，若下单机型月租降价,则会给您调整到降价后的月租哦。</p>
        <div className={styles.btn} onClick={() => popClick()}>
          我知道了
        </div>
      </div>
    </div>
  )
}

class Foryou extends React.Component<ForyouProps> {
  state = {
    show: false,
  }
  handleClick = (item: any) => async () => {
    await Router.push(`/product/detail?id_activity=${item.get('activity_id')}`)
    window.scrollTo(0, 0)
  }
  popClick = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    const { list } = this.props
    return (
      <div className={styles.foryou}>
        <div className={styles.orders}>
          {list.map((item: any, key: number) => (
            <div className={styles.order} key={key} onClick={this.handleClick(item)}>
              <div className={styles.orderImg}>
                <img src={item.get('img_url')} alt="" />
              </div>
              <div className={styles.orderInfo}>
                <p className={styles.Infotit}>{item.get('product_name')}</p>
                <p className={styles.Infomsg}>
                  {item.get('compare_price_desc_left')}
                  <span className={styles.price}>{item.get('compare_price_amount')}</span>
                  {item.get('compare_price_desc_right')}
                </p>
                <div className={styles.InfoBtn}>立即换新</div>
              </div>
            </div>
          ))}
        </div>
        <Flex className={styles.tips} align="center" justify="center">
          我们承诺：<span className={styles.pro}>
            换新机保价30天 租贵补差价
            <Icon
              type={require('svg/question-circle.svg')}
              className={styles.icon}
              color="#464646"
              onClick={() => this.popClick()}
            />
          </span>
        </Flex>
        {this.state.show === true && <Pop popClick={this.popClick} />}
      </div>
    )
  }
}

export default Foryou
