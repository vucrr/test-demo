import React from 'react'
import styles from './Rule.less'

const Rule = () => {
  return (
    <div className={styles.rule}>
      <div className={styles.rulebg} />
      <p className={styles.tit}>活动规则</p>
      <div className={styles.rulecon}>
        <p>1. 优惠券每个用户仅可领取一次；</p>
        <p>2. 优惠券有效期为自领取后7天内有效，领取后优惠券 自动发放至“我的”-“卡券包”；</p>
        <p>3. 优惠券为全场通用券，优惠金额分摊到每个月租金内抵扣；</p>
        <p>4. 每个订单只可使用一张优惠券，不可叠加使用。</p>
      </div>
      <div className={styles.ruletips}>
        <div className={styles.leftline} />
        <div className={styles.rightline} />
        <div className={styles.tipscon}>
          本活动最终解释权归享换机所有<br />若有疑问，请联系客服:<a href="tel:400-670-0188">400-670-0188</a>
        </div>
      </div>
    </div>
  )
}

export default Rule
