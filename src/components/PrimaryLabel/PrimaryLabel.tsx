import classnames from 'classnames'
import React from 'react'
import withSource, { SourceProps } from '../withSource'
import styles from './PrimaryLabel.less'

export interface PrimaryLabelProps {
  children: React.ReactNode
}

const PrimaryLabel: React.FunctionComponent<PrimaryLabelProps & SourceProps> = ({ utm, children }) => {
  const isQsy = utm.get('isQsy')
  return <span className={classnames(isQsy ? styles.blue : styles.red)}>{children}</span>
}

export default withSource<PrimaryLabelProps>(PrimaryLabel)
