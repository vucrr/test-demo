import { Modal } from 'antd-mobile'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

// TODO 暂时基于ant官方定制 alert 方法 待有更好的方法可去除该组建

function closest(el: Element, selector: string) {
  const matchesSelector =
    el.matches || el.webkitMatchesSelector || (el as any).mozMatchesSelector || (el as any).msMatchesSelector
  let p: Element | null = el
  while (p) {
    if (matchesSelector.call(p, selector)) {
      return p
    }
    p = p.parentElement
  }
  return null
}

interface Action<T> {
  text: string
  onPress?: () => void | Promise<any>
  style?: T | string
}

export default function alert(
  title: React.ReactNode,
  message: React.ReactNode,
  actions: Action<React.CSSProperties>[],
  platform = 'android',
  maskClosable = false,
) {
  let closed = false

  if (!title && !message) {
    // console.log('Must specify either an alert title, or message, or both');
    return {
      close: () => new Object(),
    }
  }

  const div: any = document.createElement('div')
  document.body.appendChild(div)

  function close() {
    ReactDOM.unmountComponentAtNode(div)
    if (div && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }

  const footer = actions.map((button: Action<React.CSSProperties>) => {
    // tslint:disable-next-line:only-arrow-functions
    const orginPress =
      button.onPress ||
      function() {
        return
      }
    button.onPress = () => {
      if (closed) {
        return
      }

      const res = orginPress()
      if (res && res.then) {
        res
          .then(() => {
            closed = true
            close()
          })
          .catch(() => new Object())
      } else {
        closed = true
        close()
      }
    }
    return button
  })

  const prefixCls = 'am-modal'

  function onWrapTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return
    }
    const pNode = closest(e.target as Element, `.${prefixCls}-footer`)
    if (!pNode) {
      e.preventDefault()
    }
  }

  // TODO 修复多层弹窗在ios下 zindex失效的问题 待有更好的方法可去除
  function FixMaskZIndex({ children }: any) {
    useEffect(() => {
      div.nextElementSibling.querySelector('.am-modal-mask').style.transform = 'translateZ(0.02rem)'
    }, [])

    return children
  }

  ReactDOM.render(
    <FixMaskZIndex>
      <Modal
        visible={true}
        transparent={true}
        title={title}
        transitionName="am-zoom"
        closable={false}
        maskClosable={maskClosable}
        footer={footer}
        maskTransitionName="am-fade"
        platform={platform}
        wrapProps={{ onTouchStart: onWrapTouchStart }}
        onClose={close}
      >
        <div className={`${prefixCls}-alert-content`}>{message}</div>
      </Modal>
    </FixMaskZIndex>,
    div,
  )

  return {
    close,
  }
}
