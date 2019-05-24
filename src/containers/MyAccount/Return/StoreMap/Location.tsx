import React from 'react'
import Geo from 'utils/geo'
import styles from './Location.less'

interface LocationProps {
  store: any
}

class Location extends React.Component<LocationProps> {
  container = React.createRef<HTMLDivElement>()

  async componentDidMount() {
    const { store } = this.props
    await Geo.load()
    const map = new AMap.Map(this.container.current, {
      resizeEnable: true, // 是否监控地图容器尺寸变化
      zoom: 15, // 初始地图级别
      center: [store.longitude, store.latitude], // 初始地图中心点
      showIndoorMap: false, // 关闭室内地图
    })
    const Icon = new AMap.Icon({
      size: new AMap.Size(24, 32),
      imageOffset: new AMap.Pixel(0, 0),
      image: '../../../static/svg/qsy-location.svg',
      imageSize: new AMap.Size(24, 32),
    })

    const marker = new AMap.Marker({
      position: new AMap.LngLat(store.longitude, store.latitude),
      icon: Icon,
      offset: new AMap.Pixel(-10, -32),
    })
    map.add(marker)
  }

  render() {
    const { store } = this.props
    return (
      <div className={styles.container} ref={this.container}>
        <div className={styles.storeName}>{store.store_name}</div>
      </div>
    )
  }
}

export default Location
