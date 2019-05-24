import { Button, Flex } from 'antd-mobile'
import { ErrorMsg, Switch, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventTradeDev } from 'configs/trackEventLabels'
import Router from 'next/router'
import { createForm } from 'rc-form'
import React, { Component } from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './SubmitBottom.less'
import { Query } from './index'

interface SubmitBottomProps {
  query: Query
  form: any
  hasAddress: boolean
  agreeList?: any
  onOrderConfirmActions: any
}

class SubmitBottom extends Component<SubmitBottomProps & withLoadingProps> {
  handleSubmit = () => {
    const { hasAddress, query, form, setLoading, onOrderConfirmActions } = this.props
    if (!hasAddress) {
      ErrorMsg.show('请先完善收货人信息')
      return false
    }
    form.validateFields(async (errors: any) => {
      if (errors) {
        const errMsg = errors[Object.keys(errors)[0]].errors[0].message
        ErrorMsg.show(errMsg)
        return false
      }
      setLoading(true)
      await onOrderConfirmActions.ceateTrade(query)
      setLoading(false)
    })
  }
  toLink = async (to: any, name: string) => {
    trackClickEvent({ category: TrackEventTradeDev.SubmitBottom2.Name, label: name })
    await Router.push(to)
  }
  render() {
    const {
      loading,
      form: { getFieldProps },
      agreeList,
    } = this.props

    const termConfig = {
      valuePropName: 'checked',
      initialValue: true,
      rules: [
        {
          validator(_: any, value: boolean, cb: Function) {
            return !value ? cb(`请同意${agreeList.map((item: any) => item.get('agreement_name')).join('')}`) : cb()
          },
        },
      ],
      onChange: (val: any) => {
        const label = val ? TrackEventTradeDev.SubmitBottom1.Item2 : TrackEventTradeDev.SubmitBottom1.Item1
        trackClickEvent({ category: TrackEventTradeDev.SubmitBottom1.Name, label })
      },
    }

    return (
      <>
        <div className={styles.footer_box}>
          <div className={styles.agree_box}>
            <Flex>
              <Switch {...getFieldProps('agree', termConfig)}>
                <span>我已阅读并同意</span>
              </Switch>
              {agreeList.map((item: any, key: number) => (
                <span
                  key={key}
                  className={styles.link}
                  onClick={() => this.toLink(item.get('path_url'), item.get('agreement_title'))}
                >
                  {item.get('agreement_name')}
                </span>
              ))}
            </Flex>
          </div>
        </div>
        <div className={styles.bottom_box}>
          <Button disabled={loading} type="primary" className={styles.submit} onClick={this.handleSubmit}>
            提交订单
          </Button>
        </div>
      </>
    )
  }
}

export default withLoading(createForm()(SubmitBottom))
