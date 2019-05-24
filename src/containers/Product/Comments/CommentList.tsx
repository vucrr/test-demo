import { fetchComments } from 'actions/product/comments'
import { ListView } from 'components'
import { CommentsReturns } from 'interfaces/comment'
import { withRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Comment from './Comment'
import styles from './CommentList.less'
import CommentModal from './CommentModal'

interface CommentListProps {
  list: CommentsReturns['list']
  total: number
  imageCount: number
  commentQuery: any
  router: any
  fetchList: Function
}

const Row = (item: any) => <Comment item={item} key={item.id} />

const CommentList = ({ list, total, imageCount, commentQuery, router, fetchList }: CommentListProps) => {
  const hasMore =
    commentQuery.get('tag') === 3 ? total > 0 && list.length < total : imageCount > 0 && list.length < imageCount
  const viewListProps = {
    dataSource: list,
    hasMore,
    Row,
    className: styles.container,
    queryMoreList() {
      const query = {
        tag: commentQuery.get('tag'),
        pageId: commentQuery.get('pageId') + 1,
        ...router.query,
      }
      fetchList(query, true)
    },
  }

  return (
    <>
      <ListView {...viewListProps} />
      <CommentModal />
    </>
  )
}

const mapStateToProps = (state: any) => ({
  list: state.getIn(['product', 'comments', 'list']).toJS(),
  total: state.getIn(['product', 'comments', 'total']),
  imageCount: state.getIn(['product', 'comments', 'imageCount']),
  commentQuery: state.getIn(['product', 'comments', 'query']),
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchList: bindActionCreators(fetchComments, dispatch),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CommentList as any))
