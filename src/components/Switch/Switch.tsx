import classnames from 'classnames'
import React from 'react'
import styles from './Switch.less'

interface SwitchProps {
  children: string | React.ReactChildren
  onChange: Function
  checked: boolean
  className?: string
  editable?: boolean
  hideCheckBox?: boolean
  round?: boolean
}

interface SwitchState {
  checked: boolean
}

class Switch extends React.Component<SwitchProps, SwitchState> {
  static defaultProps = {
    editable: true,
    hideCheckBox: false,
  }

  readonly state = {
    checked: this.props.checked,
  }

  handleClick = () => {
    if (!this.props.editable) return
    this.setState(
      {
        checked: !this.state.checked,
      },
      () => {
        const onChange = this.props.onChange
        if (onChange) {
          onChange(this.state.checked)
        }
      },
    )
  }

  componentWillReceiveProps(nextProps: SwitchProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked,
      })
    }
  }

  render() {
    const { children, className, hideCheckBox } = this.props
    const cx = classnames(styles.switch, className, hideCheckBox && styles.hiddenBox)
    const cx2 = classnames(styles.box, this.state.checked && styles.checked, this.props.round && styles.round)
    return (
      <div className={cx} onClick={this.handleClick}>
        {!hideCheckBox && <div className={cx2} />}
        <div className={styles.text}>{children}</div>
      </div>
    )
  }
}

export default Switch
