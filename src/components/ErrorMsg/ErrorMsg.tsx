import classnames from 'classnames'
import React from 'react'
import Notification from 'rmc-notification'
import styles from './ErrorMsg.less'

let notification: Notification | null = null

const prefixCls = 'am-toast'

const handleClose = (key: number) => {
  notification!.removeNotice(key)
  setTimeout(() => {
    notification!.destroy()
    notification = null
  }, 400)
}

export default {
  show: (msg: string, duration = 2, className = '') => {
    Notification.newInstance(
      {
        prefixCls,
        style: {},
        transitionName: 'am-slide-down',
        className: classnames({
          [`${prefixCls}-mask`]: true,
          [`${prefixCls}-msg`]: true,
          [`${prefixCls}-${className}`]: !!className,
        }),
      },
      (n: Notification) => (notification = n),
    )

    const key = Date.now()

    notification!.notice({
      key,
      content: (
        <>
          <span className={styles.msg} onClick={() => handleClose(key)}>
            {msg}
          </span>
        </>
      ),
      duration,
      closable: true,
      style: {},
      onClose() {
        handleClose(key)
      },
    })
  },
}
