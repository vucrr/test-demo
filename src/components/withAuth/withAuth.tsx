import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

type OwnProps = {
  dispatch: Dispatch
}

type AuthProps = {
  auth: any
}

function getDisplayName<T>(WrappedComponent: React.ComponentType<T>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const mapStateToProps = (state: any) => ({
  auth: state.getIn(['serverApp', 'auth']),
})

function withAuth<T>(WrappedComponent: React.ComponentType<T & AuthProps>) {
  type Props = OwnProps & AuthProps
  const WithAuth: React.FunctionComponent<Props> = ({ dispatch, auth, ...props }) => {
    return <WrappedComponent auth={auth} {...props as T} />
  }

  WithAuth.displayName = `HocWithAuth(${getDisplayName(WrappedComponent)})`

  return connect<ReturnType<typeof mapStateToProps>, {}, T>(mapStateToProps)(WithAuth)
}

export default withAuth
