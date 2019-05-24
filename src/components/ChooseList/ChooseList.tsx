import cx from 'classnames'
import React, { useState } from 'react'
import styles from './ChooseList.less'

type Option = {
  value: string | number
  label: string
  selected?: boolean
}

interface ChooseListProps {
  options: Option[]
  onSelect: (selected: Option | Option[]) => void
  multi?: boolean
  className?: any
}

function ChooseList(props: ChooseListProps) {
  const [options, setOptions] = useState(props.options)

  const select = (index: number) => () => {
    const newOptions = options.map((option: Option, i: number) => {
      if (!props.multi) option.selected = i === index
      else {
        if (i === index) option.selected = !option.selected
      }
      return option
    })
    setOptions(newOptions)
    const selected = options.filter(o => o.selected).map(o => ({
      value: o.value,
      label: o.label,
    }))
    props.onSelect(props.multi ? selected : selected[0])
  }

  return (
    <div className={cx(props.className, styles.container)}>
      {options.map((item: Option, index: number) => (
        <div onClick={select(index)} key={index} className={cx(item.selected && styles.active)}>
          {item.label}
        </div>
      ))}
    </div>
  )
}

ChooseList.defaultProps = {
  multi: false,
}

export default ChooseList
