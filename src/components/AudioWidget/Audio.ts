import { OptionalConfig } from './AudioWidget'

class Audio {
  constructor(public buffer: AudioBuffer, public context: AudioContext, public config: Partial<OptionalConfig>) {}

  private source: AudioBufferSourceNode | null = null
  private startedAt = 0
  private pausedAt = 0
  private playing = false

  public play() {
    const offset = this.pausedAt
    this.source = this.context.createBufferSource()
    this.source.loop = !!this.config.loop
    this.source.connect(this.context.destination)
    this.source.buffer = this.buffer
    this.source.start(0, offset)
    this.startedAt = this.context.currentTime - offset
    this.pausedAt = 0
    this.playing = true
  }

  public stop() {
    if (this.source) {
      this.source.disconnect()
      this.source.stop(0)
      this.source = null
    }
    this.pausedAt = 0
    this.startedAt = 0
    this.playing = false
  }

  public pause() {
    const delta = this.context.currentTime - this.startedAt
    this.stop()
    this.pausedAt = delta
  }

  public get isPlaying() {
    return this.playing
  }
}

export default Audio
