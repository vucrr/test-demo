import {
  SendEmergencyContact,
  SendGPSFlowParams,
  finishCreditEntrydata,
  sendGPSFlow,
} from 'actions/myTrade/assess/list'
import { Flex, Toast } from 'antd-mobile'
import { Button, Icon, Link, Switch } from 'components'
import { TrackEventTradeDev } from 'configs/trackEventLabels'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Lottie from 'react-lottie'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getContacts, getLocation } from 'utils/app'
import { trackClickEvent } from 'utils/piwik'
import { delayHandle } from 'utils/tools'
import { Query } from '.'
import styles from './InfoList.less'

const Item = Flex.Item

export interface InfoListProps {
  query: Query
  creditTips: string
  submitText: string
  submitStatus: number
  agreementInfo: any
  stepList: any
  onSendGPSFlow: (params: SendGPSFlowParams) => void
  onFinishCreditEntrydata: (params: Query) => any
  onSendEmergencyContact: (params: string) => void
}

enum StepCode {
  ZhimaCredit = 'zhima_credit',
  GpsLocation = 'gps_location',
  EmergencyContact = 'emergency_contact',
}

function ShowTipsModel(): any {
  const div: any = document.createElement('div')
  document.body.appendChild(div)

  function close() {
    ReactDOM.unmountComponentAtNode(div)
    if (div && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require('lottie/verifying.json'),
  }

  ReactDOM.render(
    <div className={styles.TipsModel}>
      <div className={styles.modelBg}>
        <Lottie options={defaultOptions} width={36} height={36} />
        <p>资料认证中，请耐心等待</p>
      </div>
    </div>,
    div,
  )
  return {
    close,
  }
}

const InfoList: React.FunctionComponent<InfoListProps> = ({
  query,
  stepList,
  creditTips,
  submitText,
  submitStatus,
  agreementInfo,
  onSendGPSFlow,
  onFinishCreditEntrydata,
  onSendEmergencyContact,
}) => {
  let showModalInstance: any = null
  const [isAgree, setIsAgree] = useState(true)
  const [submiting, setSubmiting] = useState(false)

  const checkZhimaIsDone = () => {
    const zhimaIsDone = stepList.find(
      (item: any) => item.get('step_code') === StepCode.ZhimaCredit && item.get('step_status') === 1,
    )
    if (!zhimaIsDone) {
      Toast.info('请先去授权芝麻信用')
    }
    return zhimaIsDone
  }

  const handleLink = async (item: any) => {
    if (item.get('step_status') === 1) {
      return
    }
    if (item.get('step_code') === StepCode.GpsLocation) {
      if (checkZhimaIsDone()) {
        trackClickEvent({
          category: TrackEventTradeDev.CreditEvaluation.Name,
          label: TrackEventTradeDev.CreditEvaluation.GetLocation,
        })
        const result = await getLocation()
        Toast.info(JSON.stringify(result))
        typeof result === 'object' && onSendGPSFlow(result)
      }
    } else if (item.get('step_code') === StepCode.EmergencyContact) {
      if (checkZhimaIsDone()) {
        trackClickEvent({
          category: TrackEventTradeDev.CreditEvaluation.Name,
          label: TrackEventTradeDev.CreditEvaluation.AddEmergencyContact,
        })
        const result = await getContacts()
        if (typeof result === 'string') {
          onSendEmergencyContact(result)
          window.location.href = item.get('step_url')
        }
        Toast.info(`${result}`)
      }
    } else {
      trackClickEvent({
        category: TrackEventTradeDev.CreditEvaluation.Name,
        label: TrackEventTradeDev.CreditEvaluation.AuthorizationZHIMA,
      })
      window.location.href = item.get('step_url')
    }
  }

  const handleSubmit = async () => {
    if (!isAgree) {
      Toast.info(`请同意${agreementInfo.agreementName}`)
    } else {
      setSubmiting(true)
      showModalInstance = ShowTipsModel()
      trackClickEvent({
        category: TrackEventTradeDev.CreditEvaluation.Name,
        label: TrackEventTradeDev.CreditEvaluation.ToEvaluate,
      })
      await onFinishCreditEntrydata({
        pis_code: query.pis_code || '',
        trade_no: query.trade_no,
        pay_no: query.pay_no,
        type: query.type,
      })
      await delayHandle(0.1)
      showModalInstance && showModalInstance.close()
      setSubmiting(false)
    }
  }

  return (
    <div className={styles.infoList}>
      <p className={styles.creditTips}>{creditTips}</p>
      <div className={styles.list}>
        {stepList.map((item: any, key: any) => (
          <Flex key={key} className={styles.item} onClick={() => handleLink(item)}>
            <Item className={styles.left}>
              <img src={item.get('step_icon')} alt="" />
              {item.get('step_title')}
            </Item>
            {item.get('step_status') === 1 && <Icon size="xxs" color="#00AA99" type={require('svg/xuan.svg')} />}
            <span className={item.get('step_status') === 0 ? styles.stepUnDid : styles.stepDid}>
              {item.get('step_info')}
            </span>
            {item.get('step_status') === 0 && (
              <Icon size="xxs" color="#CCCCCC" type={require('svg/youjiantouxin.svg')} />
            )}
          </Flex>
        ))}
      </div>
      <Flex className={styles.agree}>
        <Switch className={styles.agreeText} checked={isAgree} onChange={() => setIsAgree(!isAgree)}>
          {agreementInfo.agreementMsg}
        </Switch>
        <Link native={true} to={agreementInfo.agreementUrl} className={styles.agreement_name}>
          {agreementInfo.agreementName}
        </Link>
      </Flex>
      <Button
        type="primary"
        disabled={submitStatus === 0 || submiting}
        className={styles.submitText}
        onClick={handleSubmit}
      >
        {submitText}
      </Button>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  onSendGPSFlow: bindActionCreators(sendGPSFlow, dispatch),
  onFinishCreditEntrydata: bindActionCreators(finishCreditEntrydata, dispatch),
  onSendEmergencyContact: bindActionCreators(SendEmergencyContact, dispatch),
})

export default connect(
  null,
  mapDispatchToProps,
)(InfoList)
