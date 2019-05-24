export function takePhoto(): Promise<string> {
  return new Promise((resolve, reject) => {
    AlipayJSBridge.call(
      'chooseImage',
      {
        count: 1,
        // 如果只需要拍照，可以只传['camera', 'album']
        sourceType: ['camera'],
      },
      (result: any) => {
        if (result.success) {
          let apFilePath = result.apFilePathsV2 || result.apFilePaths || []
          if (typeof apFilePath === 'string') {
            try {
              apFilePath = JSON.parse(apFilePath)
            } catch (e) {
              console.log('获取apFilePath出错')
            }
          }

          if (!apFilePath.length || !/^https?:/.test(apFilePath[0])) {
            console.log('无apFilePath')
          }
          const image = new Image()
          image.crossOrigin = 'anonymous'
          image.onload = () => {
            const canvas = document.createElement('CANVAS') as HTMLCanvasElement
            const context = canvas.getContext('2d')
            canvas.height = image.height
            canvas.width = image.width
            context!.drawImage(image, 0, 0)
            try {
              resolve(canvas.toDataURL('image/jpeg'))
            } catch (e) {
              alert('canvas 生成错误')
            }
          }
          image.src = apFilePath[0]
        } else {
          reject('error')
        }
      },
    )
  })
}

export function getCurrentLocation(): Promise<boolean | { latitude: number; longitude: number }> {
  return new Promise(resolve => {
    AlipayJSBridge.call('getCurrentLocation', { bizType: 'didi' }, function(result: any) {
      if (result.error) {
        resolve(false)
      }
      resolve(result)
    })
  })
}
