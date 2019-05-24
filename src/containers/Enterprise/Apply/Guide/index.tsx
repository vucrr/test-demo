import { NextSFC2 } from '@@types/next'
import * as applyActions from 'actions/enterprise/apply'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Bottom from './Bottom'
import ListBox from './ListBox'
import StepBox from './StepBox'
import Top from './Top'

export interface GuideQuery {}

interface GuideProps extends ErrorObject {
  query: GuideQuery
  guide: any
}

const Guide: NextSFC2<GuideProps> = ({ error, guide }: GuideProps) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>企业权益</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <Top />
      <ListBox list={guide} />
      <StepBox />
      <Bottom />
    </Container>
  )
}

Guide.getInitialProps = async ({ store, query, req }: any) => {
  await store.dispatch(applyActions.fetchGuideInfo({ query, req }))
}

const mapStateToProps = (state: any) => ({
  guide: state.getIn(['enterprise', 'apply', 'guide']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onGuideActions: bindActionCreators({}, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Guide)
