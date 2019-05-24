import { Button, Flex, List, WhiteSpace, WingBlank } from 'antd-mobile'
import { Icon } from 'components'
import React from 'react'
import styles from './CacheList.less'

const Item = Flex.Item

interface CacheListProps {
  list: any
  onCacheListActions: any
}

const CacheList = ({ list, onCacheListActions }: CacheListProps) => {
  return (
    <>
      <List renderHeader="缓存列表">
        {list.map((item: any, index: number) => (
          <Flex className={styles.item} key={index}>
            <Item>
              {index + 1}.{item}
            </Item>
            <Icon onClick={() => onCacheListActions.remove(item, index)} type={require('svg/close-circle.svg')} />
          </Flex>
        ))}
      </List>
      <WhiteSpace />
      <WingBlank>
        <Button type="warning" disabled={!list.count()} onClick={onCacheListActions.removeAll}>
          清除所有缓存
        </Button>
      </WingBlank>
    </>
  )
}

export default CacheList
