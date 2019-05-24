import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { TrackEventLBF } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import { Query } from '.'
import styles from './ButtonBox.less'

const Item = Flex.Item

export interface ButtonBoxProps {
  status: number
  message: string
  query: Query
  contractNo: string
}

const ButtonBox: React.FunctionComponent<ButtonBoxProps> = ({ status, query, contractNo }) => {
  const handleClick = async (link: string) => {
    await Router.replace(link)
  }
  const checkOrder = async () => {
    trackClickEvent({ category: TrackEventLBF.ResultPage.category, label: TrackEventLBF.ResultPage.name1 + status })
    await Router.replace(`/myaccount/service/detail?contract_no=${contractNo}`)
  }
  const refreeze = async () => {
    trackClickEvent({ category: TrackEventLBF.ResultPage.category, label: TrackEventLBF.ResultPage.name2 + status })
    await Router.replace(`/mytrade/order/pay?trade_no=${query.trade_no}`)
  }
  return (
    <div className={styles.button}>
      <Flex justify="between" className={styles.btn}>
        {status === 3 && (
          <Item className={styles.back} onClick={() => handleClick('/')}>
            返回首页
          </Item>
        )}
        <Item className={classnames([1, 3, 4, 11].includes(status) ? styles.order : styles.back)} onClick={checkOrder}>
          查看订单
        </Item>
        {status === 2 && (
          <Item className={styles.order} onClick={refreeze}>
            重新冻结
          </Item>
        )}
      </Flex>
      {/* 需要添加链接 */}
      <p className={styles.serviceTerms}>
        <a href="/">《享换机服务条款》</a>
      </p>
    </div>
  )
}

export default ButtonBox
