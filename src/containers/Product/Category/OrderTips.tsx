import { checkTradeDone, receiveCheckTradeDone } from 'actions/app'
import { Flex } from 'antd-mobile'
import { Icon, Link } from 'components'
import { TrackEventHome } from 'configs/trackEventLabels'
import { CheckTradeDoneReturns } from 'interfaces/common'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cookies from 'utils/cookies'
import styles from './OrderTips.less'

export interface OrderTipsProps {
  orderTips: any
  checkTradeDone: () => any
  closeTips: (params: CheckTradeDoneReturns) => void
}

const OrderTips: React.FunctionComponent<OrderTipsProps> = ({ orderTips, checkTradeDone, closeTips }) => {
  useEffect(() => {
    if (cookies.get('hide_order_tips') !== '1') {
      checkTradeDone()
    }
  }, [])

  const handleClose = () => {
    cookies.set('hide_order_tips', '1', { expires: new Date(new Date().setMinutes(30, 0, 0)) })
    closeTips({ is_have_undone_trade: false, tips: '' })
  }

  if (!orderTips.get('is_have_undone_trade')) {
    return null
  }

  return (
    <Flex className={styles.tips_box}>
      <Icon type={require('svg/warning-circle.svg')} />
      <Flex.Item>
        <Link
          className={styles.link}
          to="/myaccount/service/list"
          trackEvent={{ category: TrackEventHome.Category, label: TrackEventHome.OrderTips.Link }}
        >
          {orderTips.get('tips')}
        </Link>
      </Flex.Item>
      <Icon type={require('svg/close.svg')} onClick={handleClose} />
    </Flex>
  )
}

const mapStateToProps = (state: any) => ({
  orderTips: state.getIn(['app', 'orderTips']),
})

const mapDispatchToProps = (dispatch: any) => ({
  checkTradeDone: bindActionCreators(checkTradeDone, dispatch),
  closeTips: bindActionCreators(receiveCheckTradeDone, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderTips)
