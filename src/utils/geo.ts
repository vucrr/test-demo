import LoadScript from 'utils/loadScript'

export default class Geo {
  static key = '7c5b64ecc95e5b6218c48471ec95ac80'
  static async load() {
    const script = new LoadScript(`https://webapi.amap.com/maps?v=1.4.11&key=${Geo.key}`, 'AMap')
    await script.load()
  }
  // 定位当前位置
  static get city(): Promise<string> {
    return new Promise((resolve, reject) => {
      function handleGetCity() {
        const geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          extensions: 'all',
        })
        geolocation.getCityInfo((status: any, result: any) => {
          if (status === 'complete') resolve(result.city)
          else reject(status)
        })
        // new window.AMap.addControl(geolocation);
        // geolocation.getCurrentPosition();
        // new window.AMap.event.addListener(geolocation, 'complete', resolve);//返回定位信息
        // new window.AMap.event.addListener(geolocation, 'error', reject);      //返回定位出错信息
      }
      if (window.AMap.Geolocation) handleGetCity()
      else window.AMap.plugin('AMap.Geolocation', handleGetCity)
    })
  }
  // 解析定位结果

  static cityDetail(city: string, lnglat: any, type: any): Promise<string> {
    return new Promise((resolve, reject) => {
      function handleGetcityDetail() {
        window.AMap.plugin('AMap.Geocoder', () => {
          const geocoder = new window.AMap.Geocoder({
            city: city,
            extensions: 'all',
            radius: 1000,
          })
          if (type) {
            // 正向地理编码方法
            geocoder.getLocation(city, (status: any, result: any) => {
              if (status === 'complete') resolve(result)
              else reject(status)
            })
          } else {
            // 逆向地理编码方法
            geocoder.getAddress(lnglat, (status: any, result: any) => {
              if (status === 'complete') resolve(result)
              else reject(status)
            })
          }
        })
      }
      if (window.AMap) {
        handleGetcityDetail()
      } else window.AMap.plugin('AMap.Geocoder', handleGetcityDetail())
    })
  }
  // 搜索附近
  static placeSearch(city: string, area: string): Promise<string> {
    return new Promise((resolve, reject) => {
      function handlePlaceSearch() {
        window.AMap.plugin(['AMap.PlaceSearch'], () => {
          const geoCity = new window.AMap.PlaceSearch({ city: city, pageSize: 20, citylimit: true })
          geoCity.search(area, (status: any, result: any) => {
            if (status === 'complete') {
              resolve(result.poiList)
            } else if (status === 'no_data') {
              resolve(status)
            } else {
              reject(status)
            }
          })
        })
      }
      if (window.AMap.PlaceSearch) handlePlaceSearch()
      else window.AMap.plugin('AMap.PlaceSearch', handlePlaceSearch())
    })
  }
}
