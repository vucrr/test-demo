import { Radio, Tabs } from 'antd-mobile'
import { Button, PopupModal } from 'components'
import React from 'react'
import styles from './TimeSelector.less'

const RadioItem = Radio.RadioItem

interface SelectorProps {
  show: boolean
  onClose: any
  onChangeTime: any
  timeList: any
  chooseTime?: any // 用户选择的时间,用于定位弹框的当前项
}

interface SelectorState {
  tabIndex: any
  time: any // 时间段
  tabTitle: string
  pickUpTime: any // 传给后端的时间
  tabs: any
}

class TimeSelector extends React.Component<SelectorProps, SelectorState> {
  state = {
    show: this.props.show,
    tabIndex: 0,
    time: '',
    tabTitle: '',
    pickUpTime: '',
    tabs: [
      {
        title: '',
      },
    ],
  }

  getTabsData() {
    const tabs: any = []
    this.props.timeList.map((tab: any) => {
      tabs.push({ title: tab.date })
    })
    this.setState({
      tabs,
      tabTitle: tabs[0].title,
    })
  }

  componentWillReceiveProps(nextProps: SelectorProps) {
    if (nextProps.show !== this.props.show) {
      const { chooseTime, timeList } = this.props
      this.getTabsData()
      if (chooseTime) {
        // 定位已选的时间
        timeList.map((list: any, tabIndex: number) => {
          list.time.map((time: any) => {
            if (time.start_time === chooseTime) {
              this.setState({
                pickUpTime: chooseTime,
                tabIndex,
                tabTitle: list.date,
              })
            }
          })
        })
      }
    }
  }

  changeTime = (displayTime: any, time: any) => {
    const { tabs, tabIndex } = this.state
    this.setState({
      time: displayTime,
      pickUpTime: time,
      tabTitle: tabs[tabIndex].title,
    })
  }

  handleSubmit = () => {
    const { onChangeTime } = this.props
    const { tabTitle, time, pickUpTime } = this.state
    onChangeTime({ tabTitle, time, pickUpTime })
  }

  render() {
    const { onClose, timeList } = this.props

    return (
      <PopupModal
        visible={this.props.show}
        title="取件时间"
        className={styles.popUpTime}
        bodyClassName={styles.body}
        onClose={onClose}
      >
        <Tabs
          tabs={this.state.tabs}
          initialPage={this.state.tabIndex}
          swipeable={false}
          onTabClick={(_, index) => {
            this.setState({
              tabIndex: index,
            })
          }}
        >
          {timeList.map((list: any, index: any) => (
            <div key={index}>
              {list.time.map((item: any) => (
                <RadioItem
                  key={item.start_time}
                  className={
                    item.start_time === this.state.pickUpTime && index === this.state.tabIndex && styles.active
                  }
                  checked={item.start_time === this.state.pickUpTime && index === this.state.tabIndex}
                  onClick={() => this.changeTime(item.display_str, item.start_time)}
                >
                  {item.display_str}
                </RadioItem>
              ))}
            </div>
          ))}
        </Tabs>
        <Button type="primary" fixed={true} className={styles.btn} onClick={this.handleSubmit}>
          确定
        </Button>
      </PopupModal>
    )
  }
}

export default TimeSelector
