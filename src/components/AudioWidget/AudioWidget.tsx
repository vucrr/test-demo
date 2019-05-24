import React from 'react'
import Audio from './Audio'

export enum AudioWidgetStatus {
  Loading,
  Loaded,
  Failed,
  Playing,
  Paused,
}

type RequiredProps = {
  src: string
  children: (props: { toggle: () => void; status: AudioWidgetStatus }) => React.ReactElement<any>
}

export type OptionalConfig = {
  autoplay: boolean
  loop: boolean
}

type AudioWidgetProps = RequiredProps & Partial<OptionalConfig>

class AudioWidget extends React.Component<AudioWidgetProps> {
  static defaultProps = {
    autoplay: true,
    loop: true,
  }

  readonly state = {
    status: AudioWidgetStatus.Loading,
  }

  audio: null | Audio = null

  componentDidMount() {
    void this.loadAudio()
  }

  componentWillUnmount() {
    if (!this.audio) return
    this.audio.stop()
  }

  // fix iOS decodeAudioData bug
  // https://stackoverflow.com/questions/48597747/how-to-play-a-sound-file-safari-with-web-audio-api
  static async decodeAudioData(context: AudioContext, buffer: ArrayBuffer): Promise<AudioBuffer> {
    return new Promise(resolve => context.decodeAudioData(buffer, resolve))
  }

  async loadAudio() {
    const { src, ...config } = this.props
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    const context = new AudioContext()
    try {
      const res = await fetch(src)
      const buffer = await res.arrayBuffer()
      const decodedBuffer = await AudioWidget.decodeAudioData(context, buffer)
      this.audio = new Audio(decodedBuffer, context, config)
      if (config.autoplay) {
        this.audio.play()
        this.setState({ status: AudioWidgetStatus.Playing })
      } else {
        this.setState({ status: AudioWidgetStatus.Loaded })
      }
    } catch (e) {
      this.setState({ status: AudioWidgetStatus.Failed })
    }
  }

  toggle = () => {
    if (!this.audio) return
    if (this.audio.isPlaying) {
      this.audio.pause()
      this.setState({ status: AudioWidgetStatus.Paused })
    } else {
      this.audio.play()
      this.setState({ status: AudioWidgetStatus.Playing })
    }
  }

  render() {
    const { status } = this.state
    const { children } = this.props
    if (status === AudioWidgetStatus.Failed || !this.audio) return null
    return children({ toggle: this.toggle, status })
  }
}

export default AudioWidget
