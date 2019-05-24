import classnames from 'classnames'
import { Icon, Link } from 'components'
import { TrackEventTradeDev } from 'configs/trackEventLabels'
import qs from 'querystring'
import React, { useEffect, useState } from 'react'
import { ExreaListQuery } from '.'
import styles from './InfoList.less'

interface InfoListProps {
  query: ExreaListQuery
  list: any
}

const InfoList: React.FunctionComponent<InfoListProps> = ({ query, list }) => {
  const [redirect, setRedirect] = useState('')
  useEffect(() => {
    setRedirect(encodeURIComponent(`${window.location.pathname}${window.location.search}`))
  }, [])

  const approve = (item: any) => (
    <div className={styles.listState}>
      {' '}
      {item} <Icon type={require('svg/youjiantouxin.svg')} className={styles.stateIcon} />
    </div>
  )
  const ready = (item: any) => (
    <div className={classnames(styles.listState, styles.ready)}>
      <Icon type={require('svg/xuan.svg')} className={styles.readyIcon} />
      {item}
    </div>
  )

  const dicPiwik: { [key: string]: string } = {
    idcard_ocr: 'Authentication',
    zhongan_otp: 'BankCardCertification',
    geren: 'ImprovePersonalInformation',
  }

  const renderLink = (item: any) => {
    const stepCode = item.get('step_code')
    if (stepCode === 'zhongan_otp') {
      return `/mytrade/funds-union/check-card?formStatus=1&${qs.stringify(query)}&redirect=${redirect}`
    } else if (stepCode === 'idcard_ocr') {
      return item.get('step_url')
    }
    return ''
  }

  return (
    <div className={styles.box}>
      <p className={styles.title}>本业务需完善以下资料，请配合填写</p>
      {list.map((item: any, key: number) => {
        return (
          <Link
            className={styles.list}
            to={renderLink(item)}
            key={key}
            trackEvent={{ category: TrackEventTradeDev.ExtraInfo.Name, label: dicPiwik[item.get('step_code')] }}
          >
            <div className={styles.listCon}>
              <img src={item.get('step_icon')} alt="" className={styles.listImg} />
              <span className={styles.listContit}>{item.get('step_title')}</span>
            </div>
            {item.get('step_status') === 0 ? approve(item.get('step_info')) : ready(item.get('step_info'))}
          </Link>
        )
      })}
    </div>
  )
}

export default InfoList
