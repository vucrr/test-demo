import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './State.less'

export interface StateProps {
  icon: any
  stepDoc: any
  appraiseTitle: any
}

const State: React.FunctionComponent<StateProps> = ({ stepDoc, appraiseTitle }) => {
  return (
    <div className={styles.stateBox}>
      <img src={AssetImage.Trade.Results.AssResult} />
      <h2>{appraiseTitle}</h2>
      <p>{stepDoc}</p>
    </div>
  )
}

export default State
