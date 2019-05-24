interface Properties {
  prefixCls?: string
  transitionName?: string
  animation?: string | object
  style?: object
  className?: string
}

interface NoticeProps {
  duration: number
  children?: any
  style: object
  closable: boolean
  key: number
  content: any
  onEnd?(): void
  onClose(): void
}

declare module 'rmc-notification' {
  export default class Notification {
    component: Notification
    static newInstance(properties: Properties, callback: Function): void
    notice(noticeProps: NoticeProps): void
    removeNotice(key: number): void
    destroy(): void
  }
}
