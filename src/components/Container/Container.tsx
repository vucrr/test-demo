import classnames from 'classnames'
import React from 'react'
import withSource, { SourceProps } from '../withSource'
import styles from './Container.less'

interface ContainerProps {
  className: string
  renderHeader: any
  renderTabBar: any
  fixedTabBar: boolean
  children: any
  bgColor?: string
}

const Container = (props: Partial<ContainerProps & SourceProps>) => {
  const { className, renderHeader, renderTabBar, fixedTabBar = false, children, ua, bgColor } = props
  const hiddenHeader = ua.get('isApp') || (renderHeader && renderHeader.props.hidden)
  return (
    <div className={classnames(styles.content_box, className)} style={{ backgroundColor: bgColor }}>
      {renderHeader}
      <div
        className={classnames(styles.content, hiddenHeader && styles.hide_header, fixedTabBar && styles.with_tabbar)}
      >
        {children}
      </div>
      {renderTabBar}
    </div>
  )
}

export default withSource(Container)
