import { Flex, List } from 'antd-mobile'
import React from 'react'
import styles from './ItemBox.less'

const Item = Flex.Item

export interface TitleBoxProps {
  title: string
  extendTitle?: React.ReactNode
}

const TitleBox: React.FunctionComponent<TitleBoxProps> = ({ title, extendTitle }) => {
  return (
    <Flex className={styles.title_box} align="center">
      <Item>{title}</Item>
      {extendTitle}
    </Flex>
  )
}

export interface ItemBoxProps {
  title: string
  extendTitle?: React.ReactNode
  children: any
  onClick?: any
}

const ItemBox: React.FunctionComponent<ItemBoxProps> = ({ title, extendTitle, children, onClick }) => {
  return (
    <div className={styles.item_box} onClick={onClick}>
      <TitleBox title={title} extendTitle={extendTitle} />
      <List className={styles.item_list}>
        {children.map((item: any, key: number) => (
          <List.Item key={key} className={styles.item}>
            <Flex justify="between" align="start">
              <span className={styles.label}>{item.title}</span>
              <Item>
                <span className={styles.text}>{item.content}</span>
              </Item>
            </Flex>
            {item.subLabel}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default ItemBox
