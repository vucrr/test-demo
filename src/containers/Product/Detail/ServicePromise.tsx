import React from 'react'
import styles from './ServicePromise.less'
import TitleBox from './TitleBox'

export interface ServicePromiseProps {
  servicePromise: any
}

const ServicePromise: React.FunctionComponent<ServicePromiseProps> = ({ servicePromise }) => {
  return (
    <div className={styles.service}>
      <TitleBox>{servicePromise.get('title')}</TitleBox>
      <img src={servicePromise.get('image')} alt="" />
    </div>
  )
}

export default ServicePromise
