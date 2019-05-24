import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Icon, LazyImage } from 'components'
import React, { useEffect, useRef, useState } from 'react'
import styles from './ListBox.less'

export interface ListBoxProps {
  list: any
}

const ListBox: React.FunctionComponent<ListBoxProps> = ({ list }) => {
  const [open, setOpen] = useState(false)
  const [itemHeight, setItemHeight] = useState(40)
  const [listHeight, setListHeight] = useState(40)
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
      const lineCount = list.size

      const openHeight = lineCount * itemHeight + 5

      setListHeight(open ? openHeight : itemHeight * (lineCount > 3 ? 3 : lineCount))
    },
    [list, itemHeight, open],
  )

  if (!list.size) {
    return null
  }

  return (
    <div className={styles.list_box}>
      <div className={styles.list} style={{ height: listHeight }}>
        {list.map((item: any, key: number) => (
          <div ref={itemEl} className={styles.item} key={key}>
            <LazyImage className={styles.icon} src={item.get('icon')} />
            <p>{item.get('sub_title')}</p>
          </div>
        ))}
      </div>
      {list.size > 3 && (
        <Flex className={styles.btn} justify="center" onClick={() => setOpen(!open)}>
          {open ? '收起' : '查看全部权益'}
          <Icon className={classnames(styles.icon, open && styles.open)} size="xs" type="down" />
        </Flex>
      )}
    </div>
  )
}

export default ListBox
