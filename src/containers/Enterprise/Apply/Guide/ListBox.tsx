import { Flex, Tabs } from 'antd-mobile'
import { LazyImage } from 'components'
import React, { useEffect, useRef, useState } from 'react'
import styles from './ListBox.less'

export interface MyTabProps {
  tabs: { title: string }[]
  children: React.ReactNode
}

const MyTab: React.FunctionComponent<MyTabProps> = ({ tabs, children }) => {
  const tabProps: any = {
    tabs,
    initialPage: 0,
    renderTabBar: (props: any) => <Tabs.DefaultTabBar {...props} page={3.8} />,
    tabBarUnderlineStyle: { border: '0.02rem solid #E3BE83' }, // tabBar下划线样式
  }

  return (
    <div className={styles.tab_box}>
      <Tabs {...tabProps}>{children}</Tabs>
    </div>
  )
}

export interface ListProps {
  list: any
}

const List: React.FunctionComponent<ListProps> = ({ list }) => {
  const [open, setOpen] = useState(false)
  const [itemHeight, setItemHeight] = useState(92)
  const [listHeight, setListHeight] = useState(92)
  const itemEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    itemEl.current && setItemHeight(itemEl.current.clientHeight)
    window.addEventListener(
      'resize',
      () => {
        itemEl && itemEl.current && setItemHeight(itemEl.current.clientHeight)
      },
      true,
    )

    return () => {
      window.removeEventListener('resize', () => {
        itemEl && itemEl.current && setItemHeight(itemEl.current.clientHeight)
      })
    }
  }, [])

  useEffect(
    () => {
      const lineCount = Math.ceil(list.size / 4)

      const openHeight = lineCount * itemHeight

      setListHeight(open ? openHeight : itemHeight * (lineCount > 2 ? 2 : lineCount))
    },
    [list, itemHeight, open],
  )

  return (
    <div className={styles.list_wrap}>
      <Flex className={styles.list} wrap="wrap" style={{ height: listHeight }}>
        {list.map((item: any, key: number) => (
          <div ref={itemEl} className={styles.item} key={key}>
            <LazyImage src={item.get('icon')} alt="" />
            <span>{item.get('title')}</span>
          </div>
        ))}
      </Flex>
      {list.size > 8 && (
        <div className={styles.btn} onClick={() => setOpen(!open)}>
          <span>{open ? '收起' : '展开全部'}</span>
        </div>
      )}
      <p className={styles.desc}>* 最终企业权益方案根据合作沟通结果而定</p>
    </div>
  )
}

export interface ListBoxProps {
  list: any
}

const ListBox: React.FunctionComponent<ListBoxProps> = ({ list }) => {
  const tabProps = {
    tabs: list.map((item: any) => ({ title: item.get('title') })).toJS(),
  }

  const contentList = list.reduce((arr: any, item: any) => {
    arr.push(item.get('privileges'))
    return arr
  }, [])

  return (
    <div className={styles.list_box}>
      <MyTab {...tabProps}>{contentList.map((item: any, key: number) => <List list={item} key={key} />)}</MyTab>
    </div>
  )
}

export default ListBox
