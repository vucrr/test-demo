import { List } from 'antd-mobile'
import { Button, Icon, PopupModal } from 'components'
import { TrackEventRentWithholding } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { TrackClickEventProperties, trackClickEvent } from 'utils/piwik'
import styles from './Popup.less'

const Item = List.Item
const Brief = Item.Brief

export interface PopupProps {
  popup: any
  show: boolean
  onClose: Function
  onWithHoldingActions: any
}

export interface PopupState {
  selected: { code: string; type: number }
}

class Popup extends React.Component<PopupProps, PopupState> {
  readonly state: Readonly<PopupState> = {
    selected: { type: 0, code: '' },
  }

  renderExtra = (item: any) => {
    if (this.state.selected.type === item.get('type')) {
      return <Icon size="xs" color="#00A699" type={require('svg/right-circle-o.svg')} />
    }
    return <span className={styles.checkbox} />
  }

  handleChange = (item: any, track: TrackClickEventProperties) => {
    trackClickEvent(track)
    this.setState({ selected: item.toJS() })
  }

  handleSubmit = async () => {
    const {
      onWithHoldingActions: { sign },
    } = this.props
    // 1 支付宝, 2 银行卡
    trackClickEvent({
      ...TrackEventRentWithholding.AddRentMethod,
      label: 'AddRentMethodConfirm' + this.state.selected.code,
    })
    if (this.state.selected.type === 1) {
      await sign({
        type: 1,
        return_url: encodeURIComponent(location.href),
      })
    } else {
      await Router.push({
        pathname: '/account/unionPay/form',
        query: {
          step: '1',
          redirect: location.href,
        },
      })
    }
  }

  render() {
    const { popup, show, onClose } = this.props
    const { selected } = this.state
    return (
      <PopupModal title="选择新增的代扣方式" visible={show} onClose={() => onClose(false)} className={styles.popup}>
        <div className={styles.title}>选择以下代扣方式，会优先代扣最新开通/绑定那一张哦</div>
        <List className={styles.list}>
          {popup.get('list').map((item: any, key: number) => (
            <Item
              key={key}
              className={styles.item}
              extra={this.renderExtra(item)}
              align="top"
              thumb={item.get('icon')}
              onClick={() =>
                this.handleChange(item, {
                  ...TrackEventRentWithholding.AddRentMethod,
                  label: 'AddRentMethod' + item.get('code'),
                })
              }
              multipleLine={true}
            >
              <span className={styles.text}>{item.get('title')}</span>
              <Brief className={styles.sub_text}>{item.get('tips')}</Brief>
            </Item>
          ))}
        </List>
        <Button
          disabled={!selected.type}
          className={styles.btn_submit}
          type="primary"
          fixed={true}
          onClick={this.handleSubmit}
        >
          确定
        </Button>
      </PopupModal>
    )
  }
}

export default Popup
