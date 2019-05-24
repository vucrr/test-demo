import { Flex, Modal, Toast } from 'antd-mobile'
import { Button, Icon } from 'components'
import Router from 'next/router'
import React from 'react'
import styles from './Success.less'
import { ReturnVia } from './index'

interface SuccessProps {
  via: string
  endDate: string
  store: any
  onCancel: any
}

function Success(props: SuccessProps) {
  const { endDate, store } = props
  const text =
    props.via === ReturnVia.Store
      ? `请在 ${endDate} 前到${store.get('store_name')}还机`
      : `请确保物流在 ${endDate} 前送达`

  const cancelMessage =
    props.via === ReturnVia.Store
      ? `您确认要取消 ${endDate} 到${store.get('store_name')}的还机申请吗？`
      : `您确认要取消邮寄还机申请吗？`

  const handleClick = () => {
    Modal.alert(
      '取消申请',
      cancelMessage,
      [
        { text: '暂不取消' },
        {
          text: '确定',
          async onPress() {
            try {
              await props.onCancel()
              await Router.push('/account/orderlist/3')
            } catch (e) {
              Toast.info('取消失败')
            }
          },
        },
      ],
      'android',
    )
  }

  const forward = async () => {
    await Router.push('/account/orderlist/0')
  }

  return (
    <Flex direction="column" align="center" justify="center" className={styles.container}>
      <div className={styles.title}>
        <Icon type={require('svg/xuanzhong.svg')} size="xxs" />
        <span>申请成功!</span>
      </div>
      <p>{text}</p>
      <div className={styles.btns}>
        <Button className={styles.btn} onClick={handleClick}>
          取消申请
        </Button>
        <Button className={styles.btn} type="primary" onClick={forward}>
          返回订单中心
        </Button>
      </div>
    </Flex>
  )
}

export default Success
