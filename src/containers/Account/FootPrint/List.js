import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
// import { Flex } from 'antd-mobile'
import { Icon, Link } from 'components'
import { connect } from 'react-redux'
import styles from './List.less'

const Empty = ({ children, showBtn = false }) => {
  return (
    <div className={styles.empty}>
      <div className={styles.box}>
        <Icon className={styles.icon} type={require('svg/nodata.svg')} />
        <div>{children}</div>
        {showBtn && (
          <Link to="/product/category" className={styles.btn}>
            立即下单
          </Link>
        )}
      </div>
    </div>
  )
}
Empty.propTypes = {
  children: PropTypes.node,
  showBtn: PropTypes.bool,
}
// 履约列表
const HonourLists = ({ honour }) => {
  // 当数据为对象或者数组时需要用 toJS来进行转变为immutable
  return (
    <div className={styles.performshow}>
      <ul>
        <li>
          <Icon type={require('svg/huankuan.svg')} />还款<span>履约{honour.get('return_pay')}次</span>
        </li>
        <li>
          <Icon type={require('svg/huanji.svg')} />还机<span>履约{honour.get('return_machine')}次</span>
        </li>
        <li>
          <Icon type={require('svg/maiduan.svg')} />买断<span>履约{honour.get('buyout')}次</span>
        </li>
      </ul>
    </div>
  )
}

HonourLists.propTypes = {
  honour: PropTypes.object.isRequired,
}
// 违约列表
const BreachLists = ({ breach }) => {
  // 当数据为对象或者数组时需要用 toJS来进行转变为immutable
  return (
    <div className={styles.violationshow}>
      <ul>
        {breach.get('return_pay') !== 0 && (
          <li>
            <Link to="/account/footprint-list?type=return_pay">
              <Icon type={require('svg/huankuan.svg')} />还款<span>违约{breach.get('return_pay')}次</span>
              <Icon type={require('svg/arrow-right.svg')} />
            </Link>
          </li>
        )}
        {breach.get('return_machine') === 0 ? null : (
          <li>
            <Link to="/account/footprint-list?type=return_machine">
              <Icon type={require('svg/huanji.svg')} />还机<span>违约{breach.get('return_machine')}次</span>
              <Icon type={require('svg/arrow-right.svg')} />
            </Link>
          </li>
        )}
        {breach.get('buyout') !== 0 && (
          <li>
            <Link to="/account/footprint-list?type=buyout">
              <Icon type={require('svg/maiduan.svg')} />买断<span>违约{breach.get('buyout')}次</span>
              <Icon type={require('svg/arrow-right.svg')} />
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

BreachLists.propTypes = {
  breach: PropTypes.object.isRequired,
}

// 履约列表组件直接加载相关数据
const ConnectedHonourLists = connect(state => ({
  honour: state.getIn(['account', 'footprint', 'honour']),
}))(HonourLists)
// 违约列表组件直接加载相关数据
const ConnectedBreachLists = connect(state => ({
  breach: state.getIn(['account', 'footprint', 'breach']),
}))(BreachLists)

const List = ({ active, honourCount, breachCount }) => {
  return (
    <div className={styles.tab_content}>
      <div className={classnames(styles.tab_item, active === 1 && styles.active)}>
        {honourCount === 0 ? <Empty showBtn>暂无履约记录，快去下单吧</Empty> : <ConnectedHonourLists />}
      </div>
      <div className={classnames(styles.tab_item, active === 2 && styles.active)}>
        {breachCount === 0 ? <Empty>暂无违约记录，请继续保持</Empty> : <ConnectedBreachLists />}
      </div>
    </div>
  )
}

List.propTypes = {
  active: PropTypes.number.isRequired,
  honourCount: PropTypes.number.isRequired,
  breachCount: PropTypes.number.isRequired,
}

export default List
