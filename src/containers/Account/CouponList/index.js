import React from 'react'
// import PropTypes from 'prop-types'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import centerActions from 'actions/account/center'
import { Container, Header, TabBar } from 'components'
import TabContent from './TabContent'

const OrderList = () => {
  const headerProps = {
    rightContentType: 'tabBar',
  }
  const containerProps = {
    renderHeader: <Header {...headerProps}>我的卡券包</Header>,
    renderTabBar: <TabBar selectedTab="myCenter" hidden />,
  }

  return (
    <Container {...containerProps}>
      <TabContent />
    </Container>
  )
}

OrderList.propTypes = {
  //   query: PropTypes.object.isRequired,
}

// const mapStateToProps = (state, ownProps) => ({
//   query: ownProps.url.query,
// })

// const mapDispatchToProps = dispatch => ({
//   onTasksActions: bindActionCreators(tasksActions, dispatch),
// })

export default connect()(OrderList)
