import { Toast } from 'antd-mobile'
import { Button, Wrap, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventTradeDev } from 'configs/trackEventLabels'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import { ExreaListQuery } from '.'

export interface ButtonBoxProps {
  query: ExreaListQuery
  list: any
  onCreateStrategyPay: (params: ExreaListQuery) => any
}

const ButtonBox: React.FunctionComponent<ButtonBoxProps & withLoadingProps> = ({
  query,
  list,
  loading,
  setLoading,
  onCreateStrategyPay,
}) => {
  const isValid = () => {
    const unDoneItem = list.find((item: any) => item.get('step_status') === 0)
    if (unDoneItem) {
      Toast.info(`请先完善${unDoneItem.get('step_title')}`)
      return false
    }
    return true
  }

  const handleClick = async () => {
    if (isValid()) {
      setLoading(true)
      trackClickEvent({ category: TrackEventTradeDev.ExtraInfo.Name, label: TrackEventTradeDev.ExtraInfo.Item })
      await onCreateStrategyPay({
        trade_no: query.trade_no,
        pis_code: query.pis_code || '',
        type: query.type,
        pay_no: query.pay_no,
      })
      Toast.info('已成功保存资料')
      setLoading(false)
    }
  }
  return (
    <Wrap size="xl">
      <Button disabled={loading} type="primary" onClick={handleClick}>
        保存资料
      </Button>
    </Wrap>
  )
}

export default withLoading(ButtonBox)
