import { Button } from 'components'
import { AssetImage } from 'constant/uikit'
import Router from 'next/router'
import React from 'react'
import { Query } from '.'
import styles from './CooperateBox.less'

export interface CooperateBoxProps {
  query: Query
}

const CooperateBox: React.FunctionComponent<CooperateBoxProps> = ({ query }) => {
  const handleClick = async () => {
    await Router.push(`/trade/form/info?trade_no=${query.trade_no}`)
  }

  return (
    <>
      <div className={styles.success}>
        <img src={AssetImage.Trade.Results.PaySuccess} alt="" className={styles.rus_img} />
        <h2 className={styles.rus_title}>授权成功</h2>
        <p className={styles.rus_content}>只差一步就完成订单啦！</p>
      </div>
      <div className={styles.btn_box}>
        <Button type="primary" onClick={handleClick}>
          填写办卡入网资料
        </Button>
        <p className={styles.msg}>仅供办理手机卡套餐使用</p>
      </div>
    </>
  )
}

export default CooperateBox
