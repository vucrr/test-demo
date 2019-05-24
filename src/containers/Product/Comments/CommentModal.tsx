import { closeModal } from 'actions/product/comments'
import { Flex } from 'antd-mobile'
import { Icon, LazyImage, Swiper } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './CommentModal.less'

interface CommentModalProps {
  visible: boolean
  closeModal: any
  item: any
  index: number
}

class CommentModal extends React.Component<Partial<CommentModalProps>> {
  componentDidUpdate() {
    if (this.props.visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.removeAttribute('style')
    }
  }

  render() {
    if (!this.props.visible) return null
    const { item } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <Icon type={require('svg/close-fill.svg')} onClick={this.props.closeModal} />
        </div>
        <div className={styles.imageWrapper}>
          <Swiper dots={false} initialSlide={this.props.index}>
            {item.get('imgs').map((v: any, i: number) => {
              return (
                <Flex className={styles.thumb_box} align="center" key={i}>
                  <LazyImage
                    className={styles.images}
                    src={v.get('img')}
                    onLoad={() => {
                      window.dispatchEvent(new Event('resize'))
                    }}
                  />
                </Flex>
              )
            })}
          </Swiper>
        </div>
        <div className={styles.commentWrapper}>
          <div className={styles.title}>
            <span>{item.get('name')}</span>
            <span>{item.get('created_at')}</span>
          </div>
          <p>{item.get('content')}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  visible: state.getIn(['product', 'comments', 'showModal']),
  item: state.getIn(['product', 'comments', 'modalData']),
  index: state.getIn(['product', 'comments', 'index']),
})

const mapDispatchToProps = (dispatch: any) => ({
  closeModal: bindActionCreators(closeModal, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentModal)
