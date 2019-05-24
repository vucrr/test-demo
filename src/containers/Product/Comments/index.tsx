import { GetInitialPropsContext } from '@@types/next'
import { fetchComments } from 'actions/product/comments'
import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CommentList from './CommentList'
import CommentHeader from './Header'

const headerProps = {
  rightContentType: 'tabBar',
}

const containerProps = {
  renderHeader: <Header {...headerProps}>用户评价</Header>,
  renderTabBar: <TabBar hidden={true} />,
}

export enum CommentsTag {
  Text = 1,
  Image,
  All,
}

class Comments extends React.Component<any> {
  static async getInitialProps({ store, query, req }: GetInitialPropsContext) {
    const mergedQuery = {
      pageId: 1,
      tag: CommentsTag.All,
      ...query,
    }
    await store.dispatch(fetchComments(mergedQuery, false, req))
  }

  // componentDidMount() {
  //   const mergedQuery = {
  //     pageId: 1,
  //     tag: CommentsTag.All,
  //     ...this.props.url.query,
  //   }
  //   this.props.onFetchComments(mergedQuery)
  // }

  render() {
    return (
      <Container {...containerProps}>
        <CommentHeader />
        <CommentList />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  list: state.getIn(['product', 'comments', 'list']),
  totalCount: state.getIn(['product', 'comments', 'total']),
  imageCount: state.getIn(['product', 'comments', 'imageCount']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onFetchComments: bindActionCreators(fetchComments, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comments)
