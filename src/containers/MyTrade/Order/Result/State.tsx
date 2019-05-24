import { AssetImage } from 'constant/uikit'
import React, { Fragment } from 'react'
import styles from './State.less'

export interface OrderStateProps {
  info: any
  status: number
}

const OrderState: React.FunctionComponent<OrderStateProps> = ({ status, info }) => {
  const signList = info.getIn(['sign_info', 'content_list'])
  if (status === 1 || status === 4) {
    return (
      <div className={styles.success}>
        <img src={AssetImage.Trade.Results.PaySuccess} alt="" className={styles.rus_img} />
        <h2 className={styles.rus_title}>{info.get('pay_result_msg')}</h2>
        {info.get('is_risk_credit') && <p className={styles.rus_content}>{info.get('reduct_msg')}</p>}
        <div className={styles.rus_need}>
          <h4 className={styles.need_tit}>{info.getIn(['sign_info', 'title'])}</h4>
          <p className={styles.need_con}>
            {signList.map((item: string, key: number) => (
              <Fragment key={key}>
                {item} {key < signList.count() - 1 && <br />}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    )
  }

  if (status === 2) {
    return (
      <div className={styles.rusult}>
        <img src={AssetImage.Trade.Results.AssError} alt="" className={styles.rus_img} />
        <h2 className={styles.rus_title}>{info.get('pay_result_msg')}</h2>
        <p className={styles.rus_content}>{info.get('pay_result_tips')}</p>
      </div>
    )
  }
  // 审核中， 暂未使用
  return (
    <div className={styles.rusult}>
      <img src={AssetImage.Trade.Results.PayWait} alt="" className={styles.rus_img} />
      <h2 className={styles.rus_title}>{info.get('pay_result_msg')}</h2>
      <p className={styles.rus_content}>{info.get('pay_result_tips')}</p>
    </div>
  )
}

export default OrderState
