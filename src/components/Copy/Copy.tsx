import { Toast } from 'antd-mobile'
import React from 'react'

interface CopyProps extends React.HTMLProps<any> {
  text: string

  onCopied?(text: string): void
}

const copy = (value: string): boolean => {
  if (!document || !navigator) throw new Error('document is missing, can not use copy function in server side.')
  const el = document.createElement('textarea')
  el.style.opacity = '0'
  el.style.position = 'fixed'
  el.style.left = '0'
  el.style.top = '0'
  el.value = value

  document.body.appendChild(el)
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    const editable = el.contentEditable
    const readOnly = el.readOnly
    el.contentEditable = 'true'
    el.readOnly = false
    const range = document.createRange()
    range.selectNodeContents(el)
    const sel = document.getSelection()!
    sel.removeAllRanges()
    sel.addRange(range)
    el.setSelectionRange(0, 999999)
    el.contentEditable = editable
    el.readOnly = readOnly
  } else {
    el.select()
  }
  const result: any = document.execCommand('copy', false, '￥')
  el.blur()
  // 针对uc浏览器兼容
  if (navigator.appVersion.indexOf('UC') !== -1 && result === undefined) {
    return true
  }
  return result
}

const Copy = ({ children, text, onCopied, ...rest }: CopyProps) => {
  const elem = React.Children.only<any>(children)
  const onClick = (event: Event) => {
    const success = copy(text)
    if (elem && elem.props && typeof elem.props.onClick === 'function') {
      elem.props.onClick(event)
    }
    if (success) {
      onCopied ? onCopied(text) : Toast.info('复制成功', 1.5)
    } else {
      Toast.info('复制失败', 1.5)
    }
  }

  return React.cloneElement(elem, { ...rest, onClick })
}

export default Copy
