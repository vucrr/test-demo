import { Button, ErrorMsg, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventTradeDev } from 'configs/trackEventLabels'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import { Query } from '.'
import styles from './SubmitBottom.less'

export interface SubmitBottomProps {
  pisCode: string
  submitText: string
  query: Query
  onOrderPayActions: any
}

class SubmitBottom extends React.Component<SubmitBottomProps & withLoadingProps> {
  async componentDidMount() {
    const { query, setAsyncLoading, setLoading, onOrderPayActions } = this.props
    if (query.check_flow) {
      setAsyncLoading(true)
      await onOrderPayActions.createStrategyPay(query)
      setLoading(false)
    }
  }

  handleSubmit = async () => {
    const { pisCode, setLoading, onOrderPayActions, query } = this.props

    if (!pisCode) {
      ErrorMsg.show('请先选选择担保方式')
      return false
    }
    trackClickEvent({
      category: TrackEventTradeDev.GuaranteeSubmit.Name,
      label: pisCode,
    })
    setLoading(true)
    await onOrderPayActions.createStrategyPay({
      trade_no: query.trade_no,
      pis_code: pisCode,
    })
    setLoading(false)
  }

  render() {
    const { submitText = '去授权', loading } = this.props

    return (
      <Button disabled={loading} type="primary" className={styles.submit} onClick={this.handleSubmit}>
        {submitText}
      </Button>
    )
  }
}

export default withLoading(SubmitBottom)
