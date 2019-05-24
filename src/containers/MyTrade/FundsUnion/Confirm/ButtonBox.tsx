import { CreateStrategyPayParams } from 'actions/myTrade/order/pay'
import { Toast } from 'antd-mobile'
import { Button, Link, Switch, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventFundsUnion } from 'configs/trackEventLabels'
import { createForm } from 'rc-form'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './ButtonBox.less'

export interface ButtonBoxProps {
  form: any
  agreementInfo: any
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
        const label = !value ? TrackEventFundsUnion.CheckAgreement.Item2 : TrackEventFundsUnion.CheckAgreement.Item1
        trackClickEvent({
          category: TrackEventFundsUnion.CheckAgreement.Name,
          label,
        })

        return !value ? cb('请阅读并同意条款') : cb()
      },
    },
  ],
}
class ButtonBox extends React.Component<ButtonBoxProps & withLoadingProps> {
  async componentDidMount() {
    const { query } = this.props
    if (query.check_flow) {
      await this.handleClick()
    }
  }

  handleClick = async () => {
    trackClickEvent({ category: TrackEventFundsUnion.Submission.Name, label: TrackEventFundsUnion.Submission.Item2 })
    this.props.form.validateFields(async (errors: any) => {
      if (!errors) {
        const { query, onCreateStrategyPay } = this.props
        this.props.setLoading(true)
        await onCreateStrategyPay({
          ...query,
          // type: query.type === 'AliPayWithHoldTrait' ? 'AliPayWithHoldTrait' : 'AuthAffirmPageTrait',
          type: query.check_flow ? query.type : 'AuthAffirmPageTrait',
          return_url: `${location.origin}/mytrade/funds-union/confirm?trade_no=${
            query.trade_no
          }&pis_code=${query.pis_code || ''}`,
        })
        this.props.setLoading(false)
      } else {
        Toast.info('请阅读并同意条款')
      }
    })
  }
  render() {
    const { form, loading, agreementInfo, remark } = this.props
    const getFieldProps = form.getFieldProps
    return (
      <div className={styles.buttonBox}>
        {agreementInfo.get('agreement_name') !== '' && (
          <div className={styles.agreement}>
            <Switch {...getFieldProps('fagree', termConfig)}>
              <span>{agreementInfo.get('agreement_msg')}</span>
            </Switch>
            <Link
              to={agreementInfo.get('agreement_url')}
              className={styles.link}
              trackEvent={{ category: 'Agreement', label: agreementInfo.get('agreement_name') }}
            >
              {agreementInfo.get('agreement_name')}
            </Link>
          </div>
        )}
        <Button type="primary" disabled={loading} className={styles.btn} onClick={this.handleClick}>
          下一步
        </Button>
        {remark && <p className={styles.statement}>{remark}</p>}
      </div>
    )
  }
}

export default withLoading(createForm()(ButtonBox))
