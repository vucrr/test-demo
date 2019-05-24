import classnames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import Sheet from '../ReturnCost/Sheet'
import UserButton from './UserButton'
import styles from './UserDetail.less'

const UserWay = (props: any) => {
  const orderdetail = props.orderdetail
  return (
    <div className={styles.user_way}>
      <h3>
        支付金额{' '}
        {!props.isQsy && (
          <Icon type={require('svg/yiwen.svg')} className={styles.logoal} onClick={() => props.showPop(true)} />
        )}
        <span>￥{orderdetail.get('return_price')}</span>
      </h3>
      {orderdetail.get('user_credit_deductible') === 0 ? (
        ''
      ) : (
        <h4>
          账户余额抵扣<span>￥{orderdetail.get('user_credit_deductible')}</span>
        </h4>
      )}
      {orderdetail.get('frozen_to_payprice') === 0 ? (
        ''
      ) : (
        <h4>
          押金抵扣<span>￥{orderdetail.get('frozen_to_payprice')}</span>
        </h4>
      )}
      {orderdetail.get('user_credit_deductible') === 0 && orderdetail.get('frozen_to_payprice') === 0 ? (
        ''
      ) : (
        <h4>
          另需支付<span>￥{orderdetail.get('actual_return_price')}</span>
        </h4>
      )}
      {// 剩余押金不为0 另需支付为0 押金减免不为0
      orderdetail.get('unfreeze_price') !== 0 ? (
        <p>还剩¥{orderdetail.get('unfreeze_price')}押金未抵扣，将在还机后释放</p>
      ) : (
        ''
      )}
    </div>
  )
}

interface UserDetailProps {
  orderdetail: any
  onPayReturnFlow: Function
  query: any
  isQsy: boolean
}

class UserDetail extends React.Component<UserDetailProps, { show: boolean }> {
  state = {
    show: false,
  }
  showPop = (res: boolean) => {
    this.setState({
      show: res,
    })
  }

  render() {
    const orderdetail = this.props.orderdetail
    const actualReturnPrice = orderdetail.get('actual_return_price')
    return (
      <div className={styles.user}>
        <div className={styles.user_top}>
          <h1>
            <Icon type={require('svg/xuanzhong.svg')} className={styles.icon_xz} />质检通过
          </h1>
          <h2>经质检确认，您的手机符合还机要求，支付还机金额 ¥{orderdetail.get('return_price')} 后即可还机成功哦。</h2>
        </div>
        <div className={styles.user_pay}>
          <h3>
            支付方式<span>
              <Icon type={require('svg/alipay.svg')} className={classnames(styles.logoal, styles.zhima)} />支付宝
            </span>
          </h3>
        </div>
        <UserWay isQsy={this.props.isQsy} showPop={this.showPop} orderdetail={orderdetail} />
        <Sheet showPop={this.showPop} show={this.state.show} date={orderdetail} />
        <UserButton
          isPay={actualReturnPrice === 0}
          actualReturnPrice={actualReturnPrice}
          query={this.props.query}
          onPayReturnFlow={this.props.onPayReturnFlow}
        />
      </div>
    )
  }
}

export default UserDetail
