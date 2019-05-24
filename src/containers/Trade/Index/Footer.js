import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Link, Icon } from 'components'
import styles from './Footer.less'

const Item = Flex.Item

class Footer extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = {
    active: true,
  }

  handleChange = () => {
    this.setState(({ active }) => ({ active: !active }))
  }

  render() {
    const { children } = this.props
    const { active } = this.state
    return (
      <Fragment>
        <div className={styles.footer_box}>
          <div className={styles.list}>
            <Flex>
              <Item>已开启自动续租</Item>
              <Link to="/" className={styles.link}>
                了解详情
              </Link>
            </Flex>
          </div>
          <div className={styles.agree_box}>
            <Flex>
              <Flex className={classnames(styles.check_box, active && styles.active)} onClick={this.handleChange}>
                {active && <Icon type="icon-finish" />}
              </Flex>
              同意{' '}
              <Link className={styles.link} to="/">
                《享换机相关协议》
              </Link>
            </Flex>
          </div>
        </div>
        {children(active)}
      </Fragment>
    )
  }
}

export default Footer
