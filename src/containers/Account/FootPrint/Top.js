import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import styles from './Top.less'

const Item = Flex.Item

const TabNav = ({ active, onChange, honourCount, breachCount }) => {
  return (
    <Flex className={styles.tab_nav} justify="between" align="stretch">
      <Item className={styles.nav_item}>
        <span className={classnames(styles.btn, active === 1 && styles.active)} onClick={() => onChange(1)}>
          履约<span className={styles.text_blue}>{honourCount}</span>次
        </span>
      </Item>
      <Item className={styles.nav_item}>
        <span className={classnames(styles.btn, active === 2 && styles.active)} onClick={() => onChange(2)}>
          违约<span className={styles.text_red}>{breachCount}</span>次
        </span>
      </Item>
    </Flex>
  )
}
const convertBgImage = level => {
  if (level === '一般') {
    return styles.yibanbg
  }
  if (level === '优') {
    return styles.youbg
  }
  if (level === '良') {
    return styles.liangbg
  }
  return styles.haobg
}

TabNav.propTypes = {
  active: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  honourCount: PropTypes.number.isRequired,
  breachCount: PropTypes.number.isRequired,
}

const ConnectedTabNav = connect(state => ({
  honourCount: state.getIn(['account', 'footprint', 'honour_count']),
  breachCount: state.getIn(['account', 'footprint', 'breach_count']),
}))(TabNav)

const Top = ({ active, onTabChange, creditLevel }) => {
  return (
    <div className={classnames(styles.top_box, convertBgImage(creditLevel))}>
      <div className={styles.top}>
        <span className={styles.title}>我的信用等级</span>
        <span className={styles.level}>{creditLevel}</span>
      </div>
      <ConnectedTabNav active={active} onChange={onTabChange} />
    </div>
  )
}

Top.propTypes = {
  active: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
  creditLevel: PropTypes.string.isRequired,
}

export default Top
