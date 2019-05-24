import { CreateStrategyPayParams } from 'actions/myTrade/order/pay'
import { Toast } from 'antd-mobile'
import { Button, Link, Switch, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventTradeAssess } from 'configs/trackEventLabels'
import Router from 'next/router'
import { createForm } from 'rc-form'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './ButtonBox.less'

export interface ButtonBoxProps {
  form: any
  agreementInfo: any
  success: boolean
  remark: any
  query: CreateStrategyPayParams
  onCreateStrategyPay: Function
}
const termConfig = {
  valuePropName: 'checked',
  initialValue: true,
  rules: [
    {
      validator(_: any, value: boolean, cb: Function) {
        const label = !value ? TrackEventTradeAssess.result.name2 : TrackEventTradeAssess.result.name3
        trackClickEvent({ label, category: TrackEventTradeAssess.result.category })
        return !value ? cb('请阅读并同意条款') : cb()
      },
    },
  ],
}

const ButtonBox: React.FunctionComponent<ButtonBoxProps & withLoadingProps> = ({
  form,
  loading,
  agreementInfo,
  success,
  remark,
  query,
  setLoading,
  onCreateStrategyPay,
}) => {
  const getFieldProps = form.getFieldProps
  const submitStrategyPay = async () => {
    await onCreateStrategyPay({
      ...query,
      // type: query.type === 'AliPayWithHoldTrait' ? 'AliPayWithHoldTrait' : 'XhjRiskResultTrait',
      type: query.check_flow ? query.type : 'XhjRiskResultTrait',
      return_url: `${location.origin}/mytrade/assess/result?trade_no=${query.trade_no}&pis_code=${query.pis_code ||
        ''}`,
    })
  }
  const handlePay = () => {
    trackClickEvent({ label: TrackEventTradeAssess.result.name4, category: TrackEventTradeAssess.result.category })
    form.validateFields(async (errors: any) => {
      if (!errors) {
        setLoading(true)
        await submitStrategyPay()
        setLoading(false)
      } else {
        Toast.info('请阅读并同意条款')
      }
    })
  }
  const linkToPay = async () => {
    await Router.replace(`/mytrade/order/pay?trade_no=${query.trade_no}`)
  }

  return (
    <div className={styles.buttonBox}>
      {success &&
        agreementInfo.get('agreement_name') !== '' && (
          <div className={styles.agreement}>
            <Switch {...getFieldProps('fagree', termConfig)}>
              <span>{agreementInfo.get('agreement_msg')}</span>
            </Switch>
            <Link
              to={agreementInfo.get('agreement_url')}
              trackEvent={{
                label: agreementInfo.get('agreement_name'),
                category: TrackEventTradeAssess.result.category,
              }}
              className={styles.link}
            >
              {agreementInfo.get('agreement_name')}
            </Link>
          </div>
        )}
      <Button type="primary" disabled={loading} className={styles.btn} onClick={success ? handlePay : linkToPay}>
        {success ? '下一步' : '更换担保方式'}
      </Button>
      {remark && <p className={styles.statement}>{remark}</p>}
    </div>
  )
}

export default withLoading(createForm()(ButtonBox))
