import { Flex } from 'antd-mobile'
import { Button, LazyImage, Router } from 'components'
import React from 'react'
import styles from './ListBox.less'

const Item = Flex.Item

export interface ListBoxProps {
  list: any
  buttonUrl: string
}

const ListBox: React.FunctionComponent<ListBoxProps> = ({ list, buttonUrl }: ListBoxProps) => {
  const hanldeClickButton = () => {
    if (buttonUrl) {
      Router.push(buttonUrl).catch()
    } else {
      Router.push('/product/category').catch()
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.list}>
        {list.map((item: any, key: number) => (
          <Flex className={styles.item} key={key}>
            <LazyImage className={styles.icon} src={item.get('icon')} />
            <Item>
              <p>{item.get('title')}</p>
              <span>{item.get('sub_title')}</span>
            </Item>
          </Flex>
        ))}
      </div>
      <div className={styles.bottom}>
        <Button className={styles.btn} type="primary" safeArea={true} onClick={hanldeClickButton}>
          立即下单
        </Button>
      </div>
    </div>
  )
}

export default ListBox
