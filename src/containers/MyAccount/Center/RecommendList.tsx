import { Flex } from 'antd-mobile'
import { Product, Swiper } from 'components'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import { fromJS } from 'immutable'
import { Recommend, RecommendItem } from 'interfaces/account/center'
import React from 'react'
import styles from './RecommendList.less'

const Item = Flex.Item

export interface RecommendListProps {
  list: Recommend['list']
}

const RecommendList: React.FunctionComponent<RecommendListProps> = ({ list }) => {
  if (list.length === 0) {
    return null
  }
  return (
    <div className={styles.pro_box}>
      <div className={styles.title}>热门推荐</div>
      <Swiper
        className={styles.pro_list}
        dots={list.length > 1}
        dotPosition="bottom"
        loopFillGroupWithBlank={true}
        spaceBetween={10}
        autoplay={{
          delay: 5000,
        }}
      >
        {list.map((item: RecommendItem[], index: number) => {
          return (
            <Flex wrap="wrap" justify="start" key={index}>
              {item.map((item2: any, index2: number) => (
                <Item key={index + index2} className={styles.item}>
                  <Product
                    item={fromJS(item2)}
                    size="sm"
                    trackEvent={{
                      ...TrackEventMyCenter.Recommendation,
                      label: item2.id,
                    }}
                  />
                </Item>
              ))}
            </Flex>
          )
        })}
      </Swiper>
    </div>
  )
}

export default RecommendList
