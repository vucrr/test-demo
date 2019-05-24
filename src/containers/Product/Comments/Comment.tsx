import { openModal } from 'actions/product/comments'
import classnames from 'classnames'
import { LazyImage } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './Comment.less'

interface CommentProps {
  item: any
  openModal: any
  nowrap: any
  smallTime?: boolean
}

class Comment extends React.Component<Partial<CommentProps>> {
  static defaultPorps = {
    smallTime: false,
  }
  showModal = (e: any, index: number) => {
    if (!this.props.item.imgs || !this.props.item.imgs.length) return
    e.preventDefault()
    e.stopPropagation()
    this.props.openModal({ data: this.props.item, index })
  }

  renderList() {
    const {
      item: { imgs },
      nowrap,
    } = this.props
    if (!imgs || !imgs.length) return null
    return (
      <div className={classnames(styles.images, nowrap && styles.oneLine)}>
        {imgs.map((v: { img: string }, i: number) => (
          <LazyImage onClick={e => this.showModal(e, i)} className={styles.image} src={v.img} key={i} />
        ))}
      </div>
    )
  }

  render() {
    const { item, smallTime } = this.props
    return (
      <div className={styles.container} onClick={e => this.showModal(e, 0)}>
        <div className={styles.top}>
          <span className={styles.phone}>{item.name}</span>
          <span>{smallTime ? item.created_at.split(' ')[0] : item.created_at}</span>
        </div>
        <div className={styles.detail}>
          <p>{item.content}</p>
        </div>
        {this.renderList()}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  openModal: bindActionCreators(openModal, dispatch),
})

export default connect(
  null,
  mapDispatchToProps,
)(Comment)
