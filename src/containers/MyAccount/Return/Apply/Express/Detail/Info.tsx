import classnames from 'classnames'
import React from 'react'
import styles from './Info.less'

const Info = (props: { data: any }) => {
  const { data } = props
  return (
    <div className={styles.infoBox}>
      <ul>
        {data.get('express_route').map((item: any, index: number) => {
          let addClassName = ''
          if (item.get('isReceived')) {
            addClassName = styles.itemReceive // 取件样式
          }
          if (item.get('isSigned')) {
            addClassName = styles.itemSign // 签收样式
          }
          return (
            <li className={classnames(styles.item, addClassName && addClassName)} key={index}>
              <div className={styles.time}>
                <p>{item.get('time')}</p>
                <p className={styles.date}> {item.get('date')}</p>
              </div>
              <div className={styles.text}>
                {item.get('happened_address') ? `[${item.get('happened_address')}]` : ''} {item.get('desc')}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Info
