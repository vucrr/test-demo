import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Router from 'next/router'
import classnames from 'classnames'
import { Tabs, Flex, Badge, Card } from 'antd-mobile'
import { Icon, Link } from 'components'
import styles from './TabContent.less'

const Item = Flex.Item

const Empty = () => {
  return (
    <Flex className={styles.empty} align="center" justify="center">
      <Item className={styles.box}>
        <Icon className={styles.icon} type={require('svg/empty-cart.svg')} />
        <br />
        列表还是空空的<br />
        马上去拥有您的宝贝
      </Item>
    </Flex>
  )
}

const Content = ({ list }) => {
  const footerProps = item => {
    return {
      className: styles.footer,
      content: <div className={styles.title}>总租金￥{item.get('total')}</div>,
      extra: (
        <Flex className={styles.btn_box} justify="end" align="center">
          <span className={styles.btn}>取消订单</span>
          <Link
            className={classnames(styles.btn, styles.btn_red)}
            to={`/trade/middleTrade?trade_no=${item.get('orderId')}&assurance_type=ca08`}
          >
            去授权
          </Link>
        </Flex>
      ),
    }
  }

  return (
    <div className={styles.list_box}>
      {!list.count() && <Empty />}
      {list.map(item => (
        <Card full key={item.get('orderId')} className={styles.list}>
          <Card.Header title={<div className={styles.title}>订单编号：{item.get('orderId')}</div>} />
          <Card.Body className={styles.item}>
            <Link className={styles.flex} to={`/account/orderdetail/${item.get('orderId')}`}>
              <Flex>
                <img className={styles.icon} src={item.get('thumb')} alt="" />
                <div className={styles.text_box}>
                  <span>{item.get('title')}</span>
                  <span>租期：{item.get('date')}</span>
                </div>
              </Flex>
              <div className={styles.right}>
                <span>{item.get('status')}</span>
              </div>
            </Link>
          </Card.Body>
          <Card.Footer {...footerProps(item)} />
        </Card>
      ))}
    </div>
  )
}
Content.propTypes = {
  list: PropTypes.instanceOf(Immutable.List).isRequired,
}

const TabContent = ({ status }) => {
  const tabs = [
    { title: <Badge>全部</Badge> },
    { title: <Badge text={1}>待授权</Badge> },
    { title: <Badge>租赁中</Badge> },
    { title: <Badge>待处理</Badge> },
    { title: <Badge>已结束</Badge> },
  ]

  const tabProps = {
    tabs,
    initialPage: status,
    tabBarActiveTextColor: '#ff5544', // tabBar激活Tab文字颜色
    tabBarUnderlineStyle: { border: '1px solid #ff5544' }, // tabBar下划线样式
    onChange(tab, index) {
      Router.replace(`/account/orderlist?trade_status=${index}`)
    },
  }

  const list = Immutable.fromJS([
    {
      orderId: '20180504232243389881',
      title: '苹果 iPhone X 银色 64G 国行 全新',
      thumb:
        'https://img2.xianghuanji.com/image/product/6a1f1f60e950cf6f510a5553dd6d2c724628a52e.jpg@100w_100h_1e_1c.jpg',
      date: '12个月',
      status: '待授权',
      total: '5355.00',
    },
    {
      orderId: '20180504232243389882',
      title: '苹果 iPhone X 银色 64G',
      thumb:
        'https://img2.xianghuanji.com/image/product/6a1f1f60e950cf6f510a5553dd6d2c724628a52e.jpg@100w_100h_1e_1c.jpg',
      date: '12个月',
      status: '待授权',
      total: '5388.00',
    },
    {
      orderId: '20180504232243389883',
      title: '苹果 iPhone X 银色 64G 国行 全新',
      thumb:
        'https://img2.xianghuanji.com/image/product/6a1f1f60e950cf6f510a5553dd6d2c724628a52e.jpg@100w_100h_1e_1c.jpg',
      date: '12个月',
      status: '待授权',
      total: '5366.00',
    },
  ])

  return (
    <Tabs {...tabProps}>
      <Content list={list} />
      <Content list={list} />
      <Content list={list} />
      <Content list={list} />
      <Content list={list} />
    </Tabs>
  )
}

TabContent.propTypes = {
  status: PropTypes.number.isRequired,
}

export default TabContent
