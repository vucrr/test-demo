import { lockPhone } from 'actions/myTrade/hunanMobile'
import { List, Radio } from 'antd-mobile'
import { Button } from 'components'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './Options.less'

const RadioItem = Radio.RadioItem

interface Props {
  goUrl: any
  lockPhone: Function
  phone: any
}

interface State {
  value: any
}

class Options extends React.Component<Props, State> {
  state = {
    value: 0,
  }

  onChange = (value: any) => {
    this.setState({
      value: value,
    })
  }

  onConfirm = async (value: any) => {
    if (value === 0) {
      const query = {
        phone: this.props.phone,
        type: 1,
      }
      const data = await this.props.lockPhone({ ...query })
      if (data) {
        await Router.push(decodeURIComponent(this.props.goUrl))
      }
    } else {
      await Router.push(`/mytrade/hunanmobile/pick-number?go=${encodeURIComponent(this.props.goUrl)}`)
    }
  }
  render() {
    const { value } = this.state
    const listItem = [
      {
        value: 0,
        label: (
          <>
            使用当前号码 {this.props.phone}
            <i className={styles.tag}>推荐</i>
          </>
        ),
      },
      { value: 1, label: '挑选新手机号' },
    ]
    return (
      <>
        <div className={styles.optionsBox}>
          <h2 className={styles.title}>请选择套餐手机号</h2>
          <List className={styles.list}>
            {listItem.map(i => (
              <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                {i.label}
              </RadioItem>
            ))}
          </List>
        </div>
        <Button type="primary" fixed={true} className={styles.btn} onClick={() => this.onConfirm(value)}>
          确定
        </Button>
      </>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: any) => ({
  lockPhone: bindActionCreators(lockPhone, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Options)
