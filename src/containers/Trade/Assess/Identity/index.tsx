import * as onIdentity from 'actions/assess/identity'
import { Container, Header } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Status from './Status'
import UploadPage from './UploadPage'

const Identity = (props: any) => {
  const containerProps = {
    renderHeader: <Header>身份信息</Header>,
  }
  return (
    <Container {...containerProps}>
      <Status onIdentity={props.onIdentity} identity={props.identity} />
      <UploadPage onIdentity={props.onIdentity} identity={props.identity} />
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  identity: state.getIn(['assess', 'identity']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onIdentity: bindActionCreators(onIdentity, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Identity)
