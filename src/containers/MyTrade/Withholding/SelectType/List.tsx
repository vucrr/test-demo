import { Flex } from 'antd-mobile'
import cx from 'classnames'
import { Button, Icon } from 'components'
import { TrackEventRentWithholding } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './List.less'

interface SelectTypeListProps {
  list: any
  onWithholdingActions: any
}

interface SelectTypeListState {
  select: any
}

class SelectTypeList extends React.Component<SelectTypeListProps, SelectTypeListState> {
  readonly state = {
    select: { type: 0, code: '' },
  }

  handleChange = (item: any) => () => {
    if (!item.get('is_able')) return
    trackClickEvent({
      ...TrackEventRentWithholding.RentMethod,
      label: 'RentMethod' + item.get('code'),
    })
    this.setState({
      select: item.toJS(),
    })
  }

  handleSubmit = async () => {
    trackClickEvent({
      ...TrackEventRentWithholding.RentMethod,
      label: 'RentMethodConfirm' + this.state.select.code,
    })
    const { list, onWithholdingActions } = this.props
    const fromPayType = +list.get('pay_type') // 1标志授权确认页,2表示花呗预授权
    const redirect = `${window.location.origin}${
      fromPayType === 2 ? '/mytrade/funds-union/confirm' : '/mytrade/assess/result'
    }${window.location.search}`
    if (this.state.select.type === 1) {
      onWithholdingActions.sign({
        type: 1,
        return_url: encodeURIComponent(redirect),
      })
    } else {
      await Router.push({
        pathname: '/account/unionPay/form',
        query: {
          step: '1',
          redirect,
        },
      })
    }
  }

  render() {
    const { list } = this.props
    const { select } = this.state
    return (
      <Flex className={styles.container} direction="column">
        <div className={styles.list}>
          {list.get('list').map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={cx(styles.item, item.get('is_able') === 0 && styles.disabled)}
                onClick={this.handleChange(item)}
              >
                <Flex className={styles.titleWrapper} justify="between">
                  <Flex>
                    <img className={styles.logo} src={item.get('icon')} alt="logo" />
                    <p className={styles.title}>{item.get('title')}</p>
                  </Flex>
                  {select.type === item.get('type') ? (
                    <Icon type={require('svg/xuanzhong.svg')} className={styles.selected} />
                  ) : (
                    <div className={styles.ball} />
                  )}
                </Flex>
                <p className={styles.desc}>{item.get('tips')}</p>
              </div>
            )
          })}
        </div>
        <Button disabled={select.type === 0} type="primary" className={styles.button} onClick={this.handleSubmit}>
          确定
        </Button>
      </Flex>
    )
  }
}

export default SelectTypeList
