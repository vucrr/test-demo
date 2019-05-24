import { Button, Steps } from 'components'
import { TrackEventLBF } from 'configs/trackEventLabels'
import { AssetImage } from 'constant/uikit'
import Router from 'next/router'
// import { fromJS } from 'immutable'
import * as React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './ExchangeBox.less'

export interface ExchangeBoxProps {
  query: any
  info: any
  contractNo: string
  status: any
}

const ExchangeBox: React.FunctionComponent<ExchangeBoxProps> = ({ info, contractNo, status }: any) => {
  const handleClick = async () => {
    trackClickEvent({ category: TrackEventLBF.ResultPage.category, label: TrackEventLBF.ResultPage.name1 + status })
    await Router.push(`/myaccount/service/detail?contract_no=${contractNo}`)
  }
  return (
    <div className={styles.exchange}>
      <div className={styles.status}>
        <img src={AssetImage.Trade.Results.PaySuccess} alt="" className={styles.rus_img} />
        <h2>{info.get('status_text')}</h2>
        <p>{info.get('status_tips')}</p>
      </div>
      <div className={styles.show}>
        <Steps logs={info.get('copy_write')} />
      </div>
      <Button type="primary" className={styles.btn} onClick={handleClick}>
        查看订单
      </Button>
    </div>
  )
}

export default ExchangeBox
