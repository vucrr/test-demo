import { List } from 'antd-mobile'
import classNames from 'classnames'
import { Button, Icon } from 'components'
import Router from 'next/router'
import React from 'react'
import styles from './Content.less'

const Item = List.Item

interface Props {
  data: any
}

class Content extends React.Component<Props, any> {
  goIdentity = async () => {
    await Router.push('/mytrade/assess/identity')
  }

  goBindingCard = async () => {
    await Router.push('/account/unionPay/form?step=1')
  }

  handleSubmit = async () => {
    // 回跳确认订单页，并加参数actForSave=true，自动触发保存订单
    const url = document.referrer + '&actForSave=true'
    await Router.push(url)
  }

  render() {
    const { data } = this.props
    const needUpload = data.get('needUpload') === 0 ? false : true
    const needBindCard = data.get('needBindCard') === 0 ? false : true

    const itemProps = (isPass: number, type: number): any => {
      // 已认证
      if (isPass === 0) {
        return {
          extra: (
            <>
              <Icon type={require('svg/right.svg')} /> {type === 1 ? '已认证' : '已绑定'}
            </>
          ),
          className: classNames(styles.listItem, styles.success),
        }
      } else {
        // 未认证
        return {
          extra: type === 1 ? '未认证' : '未绑定',
          arrow: 'horizontal',
          className: styles.listItem,
          onClick: type === 1 ? this.goIdentity : this.goBindingCard,
        }
      }
    }

    return (
      <div className={styles.box}>
        <p className={styles.tips}>补全资料，获得更好的租机体验</p>
        <List>
          <Item {...itemProps(data.get('needUpload'), 1)}>
            <Icon type={require('svg/identity.svg')} className={styles.icon} />
            <span>身份认证</span>
          </Item>
          <Item {...itemProps(data.get('needBindCard'), 2)}>
            <Icon type={require('svg/band-card.svg')} className={styles.icon} />
            <span>银行卡绑定</span>
          </Item>
        </List>
        <Button type="primary" disabled={needUpload || needBindCard} className={styles.btn} onClick={this.handleSubmit}>
          提交
        </Button>
      </div>
    )
  }
}
export default Content
