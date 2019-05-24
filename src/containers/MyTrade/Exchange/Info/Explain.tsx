import * as React from 'react'
import styles from './common.less'

export interface ExplainProps {}

const Explain: React.FunctionComponent<ExplainProps> = () => {
  return (
    <div className={styles.info}>
      <h2>换机说明</h2>
      <h3 className={styles.explain_tit}>新机首期扣款日</h3>
      <div>
        <p className={styles.explain_content}>
          • 本期扣款日仍是扣旧机租金，而且是旧机最后一期扣款；下期扣款日为新机首期扣款日。
        </p>
      </div>
      <h3 className={styles.explain_tit}>旧机归还时间</h3>
      <div>
        <p className={styles.explain_content}>• 新机签收后15天内归还，若不能按时归还，系统会按旧机买断价做扣款处理。</p>
      </div>
      <h3 className={styles.explain_tit}>提前还机服务费</h3>
      <div>
        <p className={styles.explain_content}>• 若提前还机，则在还机成功后需要支付一笔还机服务费；</p>
        <p className={styles.explain_content}>• 若到期还机，则无还机服务费。</p>
      </div>
    </div>
  )
}

export default Explain
