import { fetchComments } from 'actions/product/comments'
import { CommentsTag } from 'containers/Product/Comments/index'
import { withRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './Header.less'

interface HeaderProps {
  totalCount: number
  imageCount: number
  router: any
  fetchList: Function
}

interface HeaderState {
  active: number
}

enum Active {
  All,
  OnlyImage,
}

class Header extends React.Component<HeaderProps, HeaderState> {
  readonly state = {
    active: Active.All,
  }

  loadAll = () => {
    this.setState({ active: Active.All })

    // loading data
    const query = {
      tag: CommentsTag.All,
      pageId: 1,
      ...this.props.router.query,
    }
    this.props.fetchList(query)
    window.scrollTo(0, 0)
  }

  loadOnlyPic = () => {
    this.setState({ active: Active.OnlyImage })
    // loading data
    const query = {
      tag: CommentsTag.Image,
      pageId: 1,
      ...this.props.router.query,
    }
    this.props.fetchList(query)
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className={styles.container}>
        <a className={this.state.active === Active.All ? styles.active : null} onClick={this.loadAll}>
          全部({this.props.totalCount})
        </a>
        <a className={this.state.active === Active.OnlyImage ? styles.active : null} onClick={this.loadOnlyPic}>
          有图({this.props.imageCount})
        </a>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  totalCount: state.getIn(['product', 'comments', 'total']),
  imageCount: state.getIn(['product', 'comments', 'imageCount']),
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchList: bindActionCreators(fetchComments, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header as any))
