import React from 'react'
// import PropTypes from 'prop-types'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import centerActions from 'actions/account/center'
import { Container, Header, TabBar } from 'components'
import ListForm from './ListForm'

const Info = () => {
  const headerProps = {
    rightContentType: 'tabBar',
  }
  const containerProps = {
    renderHeader: <Header {...headerProps}>账户信息</Header>,
    renderTabBar: <TabBar selectedTab="myCenter" hidden />,
  }

  return (
    <Container {...containerProps}>
      <ListForm />
    </Container>
  )
}

// const mapDispatchToProps = dispatch => ({
//   onTasksActions: bindActionCreators(tasksActions, dispatch),
// })

export default connect()(Info)
