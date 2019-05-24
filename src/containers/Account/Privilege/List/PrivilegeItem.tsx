import Router from 'next/router'
import React from 'react'
import styles from './PrivilegeItem.less'

interface Props {
  item: any
}

const PrivilegeItem = ({ item }: Props) => {
  const onClick = async () => {
    if (item.get('priv_url')) {
      location.href = item.get('priv_url')
    } else {
      await Router.push({
        pathname: '/account/privilege',
        query: {
          id: item.get('user_priv_id'),
          type: item.get('type'),
        },
      })
    }
  }
  return (
    <div className={styles.privilegeItem} onClick={onClick}>
      <img className={styles.headerImage} src={item.get('img')} alt="" />
      <p className={styles.description}>{item.get('desc')}</p>
    </div>
  )
}

export default PrivilegeItem
