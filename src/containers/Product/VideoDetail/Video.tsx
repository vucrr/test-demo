import React, { Component } from 'react'
import styles from './Video.less'

interface Props {
  video: any
}
class Video extends Component<Props> {
  videoRef = React.createRef<HTMLVideoElement>()
  componentWillUnmount() {
    this.videoRef.current!.pause()
  }
  render() {
    return (
      <div className={styles.video_box}>
        <video
          id="video"
          ref={this.videoRef}
          playsInline={true}
          controls={true}
          poster={this.props.video.get('pic')}
          className={styles.video}
        >
          <source src={this.props.video.get('url')} />
        </video>
      </div>
    )
  }
}

export default Video
