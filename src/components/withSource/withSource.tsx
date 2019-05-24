import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

type OwnProps = {
  dispatch: Dispatch
}

type SourceProps = {
  ua: any
  utm: any
}

function getDisplayName<T>(UnwrappedComponent: React.ComponentType<T & SourceProps>) {
  return UnwrappedComponent.displayName || UnwrappedComponent.name || 'Component'
}

const mapStateToProps = (state: any) => ({
  ua: state.getIn(['serverApp', 'ua']),
  utm: state.getIn(['serverApp', 'utm']),
})

function withSource<T>(UnwrappedComponent: React.ComponentType<T & SourceProps>) {
  type Props = OwnProps & SourceProps
  const WithSource: React.FunctionComponent<Props> = ({ dispatch, ua, utm, ...rest }) => {
    return <UnwrappedComponent ua={ua} utm={utm} {...rest as T} />
  }

  WithSource.displayName = `HocWithSource(${getDisplayName(UnwrappedComponent)})`

  return connect<ReturnType<typeof mapStateToProps>, {}, T>(mapStateToProps)(WithSource)
}

export default withSource
