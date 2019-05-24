import { Link } from 'components'
import React from 'react'
import Sheet from './Sheet'
import styles from './UserMachine.less'

const User = (res: any) => {
  let to
  if (res.query.newExpress) {
    to = '/myaccount/return/apply/express?returnflow_trade_no=' + res.query.trade_no // 新还机
  } else {
    to = '/returnflow/store-return-index/' + res.query.trade_no + '?ahs_city_id=0&ahs_store_id=0'
  }
  const content = res.content ? res.content : '由于您使用未满12个月，还机成功后还需支付提前还机费用'
  return (
    <>
      <div className={styles.user_header}>
        <h1>提前还机金额</h1>
        <h2>¥{res.return_price}</h2>
        <div>{content}</div>
      </div>
      <div className={styles.user_botton}>
        <span className={styles.feiyong} onClick={() => res.showPop(true)}>
          费用明细
        </span>
        <Link to={to} native={true}>
          {' '}
          同意并继续
        </Link>
      </div>
      <p className={styles.user_telservice}>
        如有疑问请联系享换机客服 <a href="tel:400-670-0188">400-670-0188</a>
      </p>
    </>
  )
}

class UserMachine extends React.Component<{ query: any; cost: any }> {
  state = {
    show: false,
  }
  showPop = (res: boolean) => {
    this.setState({
      show: res,
    })
  }
  render() {
    return (
      <>
        <User
          showPop={this.showPop}
          query={this.props.query}
          return_price={this.props.cost.get('return_price')}
          content={this.props.cost.get('content')}
        />
        <Sheet showPop={this.showPop} show={this.state.show} date={this.props.cost} />
      </>
    )
  }
}

export default UserMachine
