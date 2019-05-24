export default class LoadScript {
  static script: HTMLScriptElement
  isLoaded = false

  constructor(public url: string, public name: string) {
    // FIXME: constructor public members
    this.url = url
    this.name = name
    if (!window) throw new Error('must init in client')
    if (window[name]) {
      this.isLoaded = true
      return
    }
    LoadScript.script = document.createElement('script')
    LoadScript.script.type = 'text/javascript'
    LoadScript.script.src = url
    LoadScript.script.async = true
    const el = document.getElementsByTagName('script')[0]
    el.parentNode!.insertBefore(LoadScript.script, el)
  }

  load() {
    return new Promise(resolve => {
      if (window[this.name]) {
        this.isLoaded = true
        resolve()
      } else {
        LoadScript.script.addEventListener('load', () => {
          this.isLoaded = true
          resolve()
        })
      }
    })
  }
}
