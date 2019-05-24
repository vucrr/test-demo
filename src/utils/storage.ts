export default class StorageService {
  static async get(key: string) {
    return new Promise((resolve, reject) => {
      if (key in localStorage) {
        const itemInLS = localStorage.getItem(key)
        try {
          itemInLS && resolve(JSON.parse(itemInLS))
        } catch (e) {
          console.error()
          reject('value in local storage is not an object. ')
        }
      } else {
        reject('key not found in local storage. ')
      }
    })
  }

  static async set(key: string, value: any) {
    return new Promise(resolve => {
      let valueToSet = value
      if (typeof value === 'object') {
        valueToSet = JSON.stringify(value)
      }
      localStorage.setItem(key, valueToSet)
      resolve()
    })
  }

  static async delete(key: string) {
    return new Promise((resolve, reject) => {
      if (key in localStorage) {
        localStorage.removeItem(key)
        resolve()
      } else {
        reject('key not in local storage. ')
      }
    })
  }

  static async clear() {
    return new Promise(resolve => {
      localStorage.clear()
      resolve()
    })
  }
}
