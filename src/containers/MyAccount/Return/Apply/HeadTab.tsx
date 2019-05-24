import { Flex, Modal } from 'antd-mobile'
import { Icon, Link } from 'components'
import { TrackEventMyAccountReturn } from 'configs/trackEventLabels'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './HeadTab.less'

interface TabProps {
  showTab: boolean
  data: any
  query: any
}

interface TabState {
  show: boolean
}

const returnWayInfo = [
  {
    code: 1,
    name: '门店还机',
    url: '/myaccount/return/apply/store',
  },
  {
    code: 2,
    name: '邮寄还机',
    url: '/myaccount/return/apply/express',
  },
]

class HeadTab extends React.Component<TabProps, TabState> {
  state = {
    show: false,
  }

  toggleShow = () => {
    const trackEvent = {
      label: `${TrackEventMyAccountReturn.Apply.name2}`,
      category: TrackEventMyAccountReturn.Apply.category,
    }
    if (!this.state.show) {
      trackClickEvent(trackEvent)
    }
    this.setState({
      show: !this.state.show,
    })
  }

  render() {
    const { showTab, data } = this.props
    const { show } = this.state
    return (
      <div className={styles.headTab}>
        {showTab && (
          <div className={styles.tab}>
            {data.get('return_route_list') &&
              data.get('return_route_list').map((type: any) => {
                const code = type.get('code')
                const selected = type.get('is_select')
                const link =
                  returnWayInfo.filter(item => item.code === code)[0].url +
                  '?returnflow_trade_no=' +
                  this.props.query.returnflow_trade_no
                const trackEvent = {
                  label: `${TrackEventMyAccountReturn.Apply.name1}${type.get('code')}`,
                  category: TrackEventMyAccountReturn.Apply.category,
                }
                return (
                  <Link
                    key={type.get('code')}
                    className={selected ? styles.active : null}
                    to={selected ? 'javascript:;' : link}
                    replace={true}
                    trackEvent={trackEvent}
                  >
                    {type.get('name')}
                  </Link>
                )
              })}
          </div>
        )}
        <Flex className={styles.tips} onClick={this.toggleShow} align="center" justify="center">
          <Flex.Item>{data && data.get('tips_info').get('title')}</Flex.Item>
          <Icon type={require('svg/arrow-right.svg')} className={styles.icon} />
        </Flex>
        <Modal
          transparent={true}
          visible={show}
          title="温馨提示"
          // onClose={this.toggleShow}
          footer={[{ text: '知道了', onPress: this.toggleShow }]}
          platform="android"
        >
          <div className={styles.text}>
            <p>
              请务必<b>关闭设备锁屏密码，并退出设备账户ID</b>。否则将导致还机失败并影响您的享换机信用等级。
            </p>
            <p>
              苹果用户前往“设置”>“触控ID与密码”>“关闭密码”，即可关闭锁屏密码；前往“设置”>轻点头像>“退出登录”，即可退出账户ID。其他用户请根据自身机型进行操作。
            </p>
            <p>
              还有疑问？<a href="tel:400-670-0188" className={styles.link}>
                咨询客服
              </a>。
            </p>
          </div>
        </Modal>
      </div>
    )
  }
}

export default HeadTab
