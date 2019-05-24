import { bindPhone } from 'actions/myAccount/bind/bindPhone'
import { Toast } from 'antd-mobile'
import { Button, Container, Header, TabBar } from 'components'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import cookies from 'utils/cookies'
import { getDomain } from 'utils/tools'
import styles from './index.less'

export enum OperateType {
  BindSuccess = 'bind_success',
  UpdateBindSuccess = 'update_bind_success',
  CanBind = 'can_bind',
  CanNot = 'can_not_bind',
  CanUpdate = 'can_update_bind',
  CanNotUpdate = 'can_not_update_bind',
  VeriCodeOutOfTime = 'mes_code_outtime',
  VeriCodeError = 'mes_code_error',
  NoSupportMerge = 'not_support_account_merge',
  SameAccount = 'same_account',
}

interface InjectedProps {
  url: { query: { phone: string; redirect: string } }
  bindPhone: Function
}

const BindPhone = (props: InjectedProps) => {
  const containerProps = {
    renderHeader: <Header>绑定手机号</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const goChangePhone = async () => {
    await Router.push({
      pathname: '/myaccount/bind/change-phone',
      query: props.url.query,
    })
  }

  const ToastMsgMap: { [key: string]: string } = {
    [OperateType.NoSupportMerge]: '手机号已占用',
    [OperateType.SameAccount]: '该手机号已绑定',
  }

  const bindPhone = async () => {
    const { redirect } = props.url.query
    const data = await props.bindPhone()
    const type = data.operate_type
    if (type === OperateType.BindSuccess) {
      Toast.info('绑定成功')
      const domain = getDomain(window.location.hostname)
      cookies.set('user_id_v2', data.user_id, { expires: 30, domain })
      cookies.set('userToken', data.user_token, { expires: 30, domain })
      redirect && window.location.replace(redirect)
    } else {
      Toast.info(ToastMsgMap[type])
    }
  }

  return (
    <Container {...containerProps}>
      <div className={styles.inner}>
        <p className={styles.title}>为了更好的体验租机服务，请绑定手机号</p>
        <p className={styles.alipay_phone}>支付宝手机号码</p>
        <p className={styles.phone}>{props.url.query.phone}</p>
        <Button type="primary" className={styles.btn} onClick={bindPhone}>
          绑定此手机号
        </Button>
        <Button type="ghost" className={styles.btn} onClick={goChangePhone}>
          绑定其他手机号
        </Button>
      </div>
    </Container>
  )
}

const mapDispatchToProps = {
  bindPhone,
}

export default connect(
  null,
  mapDispatchToProps,
)(BindPhone)
