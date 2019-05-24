// import classnames from 'classnames'
import { Flex } from 'antd-mobile'
import { Icon, Link } from 'components'
import React from 'react'

import { TrackEventMyCenter } from 'configs/trackEventLabels'
import styles from './TopBox.less'

const Item = Flex.Item

export interface TopBoxProps {
  mobile: string
  thumb: string
  children: React.ReactNode
}

const TopBox: React.FunctionComponent<TopBoxProps> = ({ mobile, thumb, children }) => {
  return (
    <div className={styles.top_box}>
      <Flex className={styles.top}>
        <Item>
          <Flex>
            <img src={thumb} />
            <span>{mobile}</span>
          </Flex>
        </Item>
        <Link to="/account/info-new" trackEvent={TrackEventMyCenter.Setting}>
          <Icon type={require('svg/setting.svg')} color="#fff" size="sm" />
        </Link>
      </Flex>
      {children}
    </div>
  )
}

export default TopBox
