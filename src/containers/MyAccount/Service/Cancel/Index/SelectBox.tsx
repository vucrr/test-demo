import { List, Modal, TextareaItem } from 'antd-mobile'
import { Button, ChooseList, PopupModal } from 'components'
import React from 'react'
import { ServiceCancelQuery } from '.'
import styles from './SelectBox.less'

const Item = List.Item

type Option = { label: string; value: number | string }

interface SelectBoxProps {
  options: Option[]
  query: ServiceCancelQuery
  confirmText: string
  onCancelActions: any
}

interface SelectBoxState {
  visible: boolean
  option: Option
  reason: string | undefined
}

class SelectBox extends React.Component<SelectBoxProps, SelectBoxState> {
  readonly state: Readonly<SelectBoxState> = {
    visible: false,
    option: {
      value: '',
      label: '请选择',
    },
    reason: '',
  }

  handleClick = () => {
    const { onCancelActions, query } = this.props
    const { option, reason } = this.state
    if (!this.state.option) return

    Modal.alert(
      '提交确认',
      this.props.confirmText,
      [
        {
          text: '取消',
        },
        {
          text: '确认',
          onPress: () => {
            onCancelActions.submitCancel({
              contract_no: query.contract_no,
              reason_id: option.value,
              reason_dec: reason,
              type: query.type,
            })
          },
        },
      ],
      'android',
    )
  }

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  onSelect = (option: any) => {
    this.setState({ option })
  }

  onChange = (value: string | undefined) => {
    this.setState({ reason: value })
  }

  get disabled() {
    return this.state.option.label === '请选择'
  }

  submit = () => {
    this.setState({
      visible: false,
    })
  }

  renderModal() {
    const { options } = this.props
    return (
      <PopupModal visible={this.state.visible} onClose={this.toggleModal} title="取消原因">
        <div className={styles.modalWrapper}>
          <div className={styles.list_box}>
            <ChooseList options={options} onSelect={this.onSelect} />
          </div>
          <Button className={styles.submit} fixed={true} type="primary" disabled={this.disabled} onClick={this.submit}>
            确认
          </Button>
        </div>
      </PopupModal>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <List>
          <Item arrow="horizontal" extra={this.state.option.label} onClick={this.toggleModal}>
            取消原因
          </Item>
          <Item className={styles.cancelInput}>
            <span>取消说明</span>
            <TextareaItem autoHeight={true} onChange={this.onChange} placeholder="请填写取消原因(选填）" />
          </Item>
        </List>
        {this.renderModal()}
        <div className={styles.fixedButton}>
          <Button type="primary" fixed={true} onClick={this.handleClick} disabled={this.disabled}>
            确定
          </Button>
        </div>
      </div>
    )
  }
}

export default SelectBox
