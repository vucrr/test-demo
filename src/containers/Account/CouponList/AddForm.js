import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Flex, List, InputItem } from 'antd-mobile'
import styles from './AddForm.less'

class AddForm extends Component {
  static propTypes = {}

  state = {
    value: '',
    disabled: true,
  }

  handleChange = value => {
    this.setState({ value, disabled: value.length < 8 })
  }

  handleAdd = () => {
    const { disabled } = this.state
    if (!disabled) {
      // console.log(value)
    }
  }

  render() {
    const { value, disabled } = this.state

    return (
      <div className={styles.form_box}>
        <Flex>
          <Flex.Item>
            <List>
              <InputItem onChange={this.handleChange} placeholder="请输入兑换码" value={value} />
            </List>
          </Flex.Item>
          <div onClick={this.handleAdd} className={classnames(styles.btn_add, disabled && styles.disabled)}>
            兑换
          </div>
        </Flex>
      </div>
    )
  }
}

export default AddForm
