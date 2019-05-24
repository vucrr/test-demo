import React from 'react'
import styles from '../common.less'

// 意外维修服务条款
const Insurance = ({ agreement }: any) => {
  return (
    <div className={styles.container}>
      <h1>第一条 意外维修服务内容</h1>
      <p>1. 服务商品：用户通过享换机平台租赁的手机。</p>
      <p>
        2.
        服务范围：租赁设备在正常使用过程中，由于意外损坏（意外坠落、挤压、碰撞或进液）导致的手机性能故障。（维修主体为手机/笔记本。如耳机、电池、充电器等所有配件不在维修范围内），人为故意除外。另后壳和电池损坏不在维修服务范围内。
      </p>
      <p>3. 服务期限：签收后第7天凌晨生效，租赁合同结束时终止。</p>
      <p>4. 维修金额</p>
      <ul>
        <li>
          （a）意外维修服务费：<span className={styles.filling}>
            {agreement.getIn(['trade_info', 'ap_service_price'])}
          </span>元；维修额度<span className={styles.filling}>
            {agreement.getIn(['trade_info', 'ap_service_coverage'])}
          </span>元；
        </li>
        <li>（b）当维修累计金额超过维修额度时用户需补足超出额度部分的差价，同时服务终止；</li>
        <li>（c）累加计入维修金额的内容包括不限于：维修手机所必须的零件费用、人工费用、单次物流费用，所有费用含税。</li>
      </ul>
      <p>5. 置换</p>
      <ul>
        <li>（a）当手机经检测无法修复或维修金额高于机器官网售价时，我们将通过置换同型号同配置机器的方式提供服务。</li>
        <li>（b）新机置换新机，二手机器置换不低于原机成色的机器。</li>
        <li>
          （c）置换需补齐售价差价<span className={styles.filling}>{agreement.getIn(['trade_info', 'diff_price'])}</span>元作为人工成本费。
        </li>
        <li>（d）当手机被我们置换后，即视为我们已经完全履行本维修服务的义务，本服务即告终止。</li>
      </ul>
      <h1>第二条 意外维修服务的终止</h1>
      <p>发生下述情形的，服务终止：</p>
      <ul>
        <li>1. 累计维修金额超过维修额度的；</li>
        <li>2. 已根据前款进行过机器置换的；</li>
        <li>3. 经过非享换机认定的授权网点维修的；</li>
        <li>4. 已经超过服务期限的；</li>
        <li>5. 有主观恶意欺骗行为的；</li>
        <li>6. 用户私自拆开机器或任何其他第三方或个人未经授权私自拆开机器的。</li>
      </ul>
      <p>其他：意外损坏导致性能故障维修后不承诺可继续享有厂家规定的售后服务。</p>
    </div>
  )
}

export default Insurance
