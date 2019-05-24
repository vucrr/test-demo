import React, { Fragment } from 'react'
import Router from 'next/router'
import { List } from 'antd-mobile'
import { Link } from 'components'
import styles from './ListForm.less'

const Item = List.Item

const ListForm = () => {
  const handleItemClick = async link => {
    await Router.push(link)
  }

  return (
    <Fragment>
      <List className={styles.form_box}>
        <Item extra="未验证" onClick={() => {}}>
          姓名
        </Item>
        <Item extra="未验证" onClick={() => {}}>
          身份证号
        </Item>
        <Item
          extra="130****5710"
          arrow="horizontal"
          className={styles.item_phone}
          onClick={() => handleItemClick('/account/changephone')}
        >
          手机号
        </Item>
        <Item extra="未绑定" arrow="horizontal" onClick={() => {}}>
          支付宝
        </Item>
        <Item extra="未绑定" onClick={() => {}}>
          支付宝代扣
        </Item>
      </List>
      <List className={styles.form_box}>
        <Item>
          <Link to="account/logout" className={styles.btn_red}>
            退出登录
          </Link>
        </Item>
      </List>
    </Fragment>
  )
}

export default ListForm
