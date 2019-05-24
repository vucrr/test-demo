import React from 'react'
import styles from './Header.less'

function SelectTypeHeader() {
  return (
    <div className={styles.container}>
      <h1>请选择以下代扣方式</h1>
      <p>每期自动扣除租金，无需担心忘记还款带来的麻烦。</p>
    </div>
  )
}

export default SelectTypeHeader
