import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Swiper } from 'components'
import React from 'react'
import Lottie from 'react-lottie'
import styles from './Record.less'

const Item = Flex.Item

export interface Props {
  listInfo: any
  onRecordActions: any
}

export interface State {}

const lottieProps = {
  options: {
    loop: true,
    autoplay: true,
    animationData: require('json/exchange-right.json'),
  },
  width: 27,
  height: 27,
}

const TradeItem = ({ item, color }: { item: any; color?: string }) => {
  return (
    <Flex className={styles.itemBox}>
      <div className={styles.thumb}>
        <img src={item.get('sku_img_url')} className={styles.img} />
      </div>
      <p className={classnames(styles.name, color === 'grey' && styles.grey)}>{item.get('sku_name')}</p>
    </Flex>
  )
}

const ChangeTradeItem = ({ item }: any) => {
  return (
    <>
      <TradeItem item={item.get('old_sku_info')} color="grey" />
      <div className={styles.lottieIcon}>
        <Lottie {...lottieProps} />
      </div>
      <TradeItem item={item.get('sku_info')} />
    </>
  )
}

class Record extends React.Component<Props, State> {
  onChange = async (index: number) => {
    const { listInfo } = this.props
    const list = listInfo.get('trade_list')
    const currentTrade = list.get(index)

    const params: any = {
      trade_no: currentTrade.get('trade_no'),
    }
    // replacement_no不为空才传值
    if (currentTrade.get('replacement_no')) {
      params.replacement_no = currentTrade.get('replacement_no')
    }

    await this.props.onRecordActions.fetchDetail({
      ...params,
    })
  }

  render() {
    const { listInfo } = this.props
    const count = listInfo.get('total_count')
    const list = listInfo.get('trade_list')
    return (
      <div className={styles.recordBox}>
        <Flex className={styles.titleBox}>
          <Item>下单记录</Item>
          <span className={styles.num}>{count}条</span>
        </Flex>
        {count === 1 && <TradeItem item={list.getIn(['0', 'sku_info'])} />}
        {count > 1 && (
          <Swiper
            className={styles.listBox}
            dots={true}
            dotPosition="bottom"
            afterChange={(index: number) => this.onChange(index)}
          >
            {list.map((item: any, index: number) => {
              if (item.get('replacement_type') === 2) {
                return (
                  <Flex className={styles.bgGrey} key={index}>
                    <ChangeTradeItem item={item} index={index} />
                  </Flex>
                )
              }
              return (
                <Flex className={styles.itemBox} key={index}>
                  <div className={styles.thumb}>
                    <img src={item.getIn(['sku_info', 'sku_img_url'])} className={styles.img} />
                  </div>
                  <p className={classnames(styles.name, styles.grey)}>{item.getIn(['sku_info', 'sku_name'])}</p>
                </Flex>
              )
            })}
          </Swiper>
        )}
      </div>
    )
  }
}

export default Record
