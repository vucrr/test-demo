import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { List, Grid, Badge } from 'antd-mobile'
import { Icon, Link } from 'components'
import styles from './NavList.less'

const Item = List.Item

const Nav = ({ tradeCount }) => {
  Nav.propTypes = {
    tradeCount: PropTypes.object.isRequired,
  }
  const data = [
    { icon: require('images/account/center/daishouquan.png'), text: '待授权', num: tradeCount.get('unpay_count') },
    { icon: require('images/account/center/clock.png'), text: '租赁中', num: tradeCount.get('rent_list_count') },
    { icon: require('images/account/center/bell.png'), text: '待处理', num: tradeCount.get('pending_list_count') },
    { icon: require('images/account/center/yijieshu.png'), text: '已结束', num: 0 },
  ]

  const handleTitleClick = () => {
    window.location.href = '/account/orderlist?trade_status=0'
  }

  return (
    <List className={styles.nav_box}>
      <Item className={styles.title_box} extra="全部订单" arrow="horizontal" onClick={handleTitleClick}>
        我的订单
      </Item>
      <Item className={styles.icon_box}>
        <Grid
          className={styles.thumb_box}
          data={data}
          columnNum={data.length}
          hasLine={false}
          activeStyle={false}
          renderItem={(item, index) => {
            return (
              <Link
                className={styles.item_content}
                native
                to={{ pathname: '/account/orderlist', query: { trade_status: index + 1 } }}
                // href={'/account/orderlist?trade_status' + (index + 1)}
                key={index}
              >
                <Badge text={item && item.num}>
                  <img className={styles.grid_icon} src={item && item.icon} />
                </Badge>
                <div className={styles.grid_text}>{item && item.text}</div>
              </Link>
            )
          }}
        />
      </Item>
    </List>
  )
}

const ListItem = ({ showCredit }) => {
  ListItem.propTypes = {
    showCredit: PropTypes.bool.isRequired,
  }

  const handleItemClick = async link => {
    await Router.push(link)
  }
  const data = [
    { type: require('svg/wodequanyi.svg'), link: '/account/privilege/list', text: '我的权益', new: true, show: true },
    { type: require('svg/xinyongzuji.svg'), link: '/account/footprint', text: '信用足迹', new: false, show: true },
    {
      type: require('svg/union-card.svg'),
      link: '/myaccount/withholding/list',
      text: '租金代扣管理',
      new: false,
      show: showCredit,
    },
    { type: require('svg/repair.svg'), link: '/account/repairlist', text: '售后维修', new: false, show: true },
    { type: require('svg/helpcenter.svg'), link: '/help/index', text: '帮助中心', new: false, show: true },
  ]
  return (
    <List id={styles.list_box}>
      {data.filter(item => item.show).map((item, index) => {
        return (
          <Item
            thumb={<Icon className={styles.icon} type={item.type} />}
            arrow="horizontal"
            key={index}
            onClick={() => handleItemClick(item.link)}
          >
            {item.text}
            {item.new && <Icon type={require('svg/new.svg')} />}
          </Item>
        )
      })}
    </List>
  )
}

const NavList = ({ tradeCount, showCredit }) => {
  NavList.propTypes = {
    tradeCount: PropTypes.object.isRequired,
    showCredit: PropTypes.bool.isRequired,
  }
  return (
    <Fragment>
      <Nav tradeCount={tradeCount} />
      <ListItem showCredit={showCredit} />
    </Fragment>
  )
}

export default NavList
