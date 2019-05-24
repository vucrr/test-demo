import { List, Radio } from 'antd-mobile'
import { Icon, PopupModal } from 'components'
import { TrackEventMyAccountReturn } from 'configs/trackEventLabels'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './ExpressType.less'

const Item = List.Item
const Brief = Item.Brief
const RadioItem = Radio.RadioItem
const waysList = [
  {
    code: 2,
    content: (
      <div className={styles.itemBox}>
        <Icon type={require('svg/door.svg')} className={styles.icon} />预约上门取件<span className={styles.tag}>
          免邮费
        </span>
      </div>
    ),
    brief: '1小时上门取走快件，享换机推荐寄件服务',
  },
  {
    code: 1,
    content: (
      <div className={styles.itemBox}>
        <Icon type={require('svg/express.svg')} className={styles.icon} />自行快递寄回
      </div>
    ),
    brief: '需要您自己联系快递寄回，邮费需自付哦',
  },
]

interface TypeSelectorProps {
  list: any
  show: boolean
  expressType: any
  handleConfirm: any
  toggleTypeSelector: any
}

interface TypeSelectorState {
  index: number
}

class TypeSelector extends React.Component<TypeSelectorProps, TypeSelectorState> {
  state = {
    index: this.props.expressType,
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.expressType !== this.props.expressType) {
      this.setState({ index: nextProps.expressType })
    }
  }

  changeType = async (code: number) => {
    const trackEvent = {
      label: `${TrackEventMyAccountReturn.Apply.name9}${code}`,
      category: TrackEventMyAccountReturn.Apply.category,
    }
    trackClickEvent(trackEvent)
    this.setState({ index: code })
  }

  render() {
    const { show, list, toggleTypeSelector, handleConfirm } = this.props
    const listFilter = list && list.map((item: any) => item.get('code'))
    let selectList
    if (listFilter) {
      selectList = waysList.filter((way: any) => listFilter.includes(way.code))
    }
    return (
      <PopupModal visible={show} title="寄件方式" className={styles.popUp} onClose={toggleTypeSelector}>
        <List>
          {selectList &&
            selectList.map((item: any) => {
              return (
                <RadioItem
                  key={item.code}
                  className={styles.item}
                  checked={item.code === this.state.index}
                  onChange={() => this.changeType(item.code)}
                >
                  {item.content}
                  <Brief> {item.brief}</Brief>
                </RadioItem>
              )
            })}
        </List>
        <button className={styles.btn} onClick={() => handleConfirm(this.state.index)}>
          确定
        </button>
      </PopupModal>
    )
  }
}

export default TypeSelector
