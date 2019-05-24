import React from 'react'
import { Flex } from 'antd-mobile'
import propTypes from 'prop-types'
import { Product, Swiper } from 'components'
import { fromJS } from 'immutable'
import styles from './RecommendList.less'

const Item = Flex.Item

const RecommendList = ({ list }) => {
  RecommendList.propTypes = {
    list: propTypes.any.isRequired,
  }
  const ActivityInfo = list.toJS() || []
  if (ActivityInfo.length === 0) return null
  return (
    <div className={styles.pro_box}>
      <div className={styles.title}>为您推荐</div>
      <Swiper
        className={styles.pro_list}
        dotPosition="bottom"
        loopFillGroupWithBlank
        spaceBetween={10}
        autoplay={{
          delay: 5000,
        }}
      >
        {ActivityInfo.filter(item => item.length === 3).map((item, index) => {
          return (
            <Flex wrap="wrap" justify="start" key={index}>
              {item.map((item2, index2) => (
                <Item key={index + index2} className={styles.item}>
                  <Product item={fromJS(item2)} size="sm" />
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
