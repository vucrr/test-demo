import { getCurrentLocation, takePhoto as alipayTakePhoto } from './alipayJSBridge'
import { zipBase64 } from './tools'
export function isIOS() {
  if (window && window.navigator && window.navigator.userAgent) {
    const ua = window.navigator.userAgent
    return /enjoyChanging/.test(ua) && /platform\/iOS/.test(ua)
  }
}

export function isAndroid() {
  if (window && window.navigator && window.navigator.userAgent) {
    const ua = window.navigator.userAgent
    return /Android;enjoyChanging_native/i.test(ua)
  }
}

export function isAliPay() {
  if (window && window.navigator && window.navigator.userAgent) {
    const ua = window.navigator.userAgent
    return /AlipayClient/.test(ua)
  }
}
export function isWechat() {
  if (window && window.navigator && window.navigator.userAgent) {
    const ua = window.navigator.userAgent
    return /MicroMessenger/.test(ua)
  }
}
export function isApp() {
  return isIOS() || isAndroid()
}

export function takePhoto(): Promise<string> {
  if (isAliPay()) {
    return alipayTakePhoto()
  }
  if (isAndroid()) {
    window.jsObj.takePhoto()
    return new Promise<string>(resolve => {
      window.chooseResult = (stringkey: any, stringjson: any) => {
        if (stringkey === 'takePhoto') {
          resolve('data:image/jpeg;base64,' + stringjson.path)
        }
      }
    })
  }
  if (isIOS()) {
    window.webkit.messageHandlers.takePhoto.postMessage('takePhoto')
    return new Promise<string>(resolve => {
      window.chooseResult = (stringkey: string, stringjson: string) => {
        if (stringkey === 'takePhoto') {
          const result = zipBase64('data:image/jpeg;base64,' + stringjson)
          resolve(result)
        }
      }
    })
  }
  return new Promise(resolve => resolve(''))
}

export function sendTitle(text: string) {
  // tslint:disable-next-line
  if (typeof window !== 'undefined') {
    if (isIOS()) {
      window.webkit &&
        window.webkit.messageHandlers.sendTitle &&
        window.webkit.messageHandlers.sendTitle.postMessage(text)
    } else {
      window.jsObj && window.jsObj.sendTitle && window.jsObj.sendTitle(text)
    }
  }
}

export function getTongDunResult(): Promise<string> {
  return new Promise(resolve => {
    if (isApp()) {
      if (isAndroid()) {
        if (window.jsObj && window.jsObj.getBlackbox) {
          window.jsObj.getBlackbox()
        } else {
          resolve('')
        }
      } else if (isIOS()) {
        if (window.webkit && window.webkit.messageHandlers.getBlackbox) {
          window.webkit.messageHandlers.getBlackbox.postMessage('')
        } else {
          resolve('')
        }
      }
      window.chooseResult = function(type, result: any) {
        if (type === 'getBlackbox') {
          if (isIOS()) {
            resolve(JSON.parse(result).blackbox)
          } else {
            resolve(result.blackbox)
          }
        }
      }
    } else {
      resolve(window._fmOpt.getinfo())
    }
  })
}

export function getLocation(): Promise<boolean | { latitude: number; longitude: number }> {
  return new Promise<boolean | { latitude: number; longitude: number }>(async resolve => {
    if (isAliPay()) {
      resolve(await getCurrentLocation())
    } else if (isApp()) {
      if (isAndroid()) {
        window.jsObj && window.jsObj.chooseLocation()
      } else if (isIOS()) {
        window.webkit && window.webkit.messageHandlers.chooseLocation.postMessage('chooseLocation')
      }
      window.chooseResult = function(type, result: any) {
        if (type === 'chooseLocation') {
          if (isAndroid()) {
            resolve(result.longitude ? result : false)
          } else if (isIOS()) {
            resolve(result.length ? JSON.parse(result) : false)
          }
        }
      }
    }
  })
}

export function getContacts(): Promise<boolean | string> {
  return new Promise<boolean | string>(async resolve => {
    if (isApp()) {
      if (isAndroid()) {
        if (window.jsObj.getContacts) {
          window.jsObj.getContacts()
        } else {
          resolve(false)
        }
      } else if (isIOS()) {
        if (window.webkit.messageHandlers.getContacts) {
          window.webkit.messageHandlers.getContacts.postMessage('')
        } else {
          resolve(false)
        }
      }
      window.chooseResult = function(type, result: any) {
        if (type === 'getContacts') {
          if (isIOS()) {
            resolve(JSON.stringify(JSON.parse(result).contacts))
          } else {
            resolve(JSON.stringify(result.contacts))
          }
        }
      }
    }
    resolve(false)
  })
}
