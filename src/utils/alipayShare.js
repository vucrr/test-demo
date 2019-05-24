// function importSDK() {
//   let d = document
//   let g = d.createElement('script')
//   let s = d.getElementsByTagName('script')[0]
//   g.type = 'text/javascript'
//   g.async = true
//   g.defer = true
//   g.src = 'https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js'
//   s.parentNode.insertBefore(g, s)
// }

export function initShare(params) {
  // importSDK()
  const meta = [
    {
      name: 'Alipay:title',
      content: params.title,
    },
    {
      name: 'Alipay:imgUrl',
      content: params.image,
    },
    {
      name: 'Alipay:desc',
      content: params.content,
    },
    {
      name: 'Alipay:link',
      content: params.url,
    },
  ]
  let d = document
  let h = d.getElementsByTagName('head')[0]
  meta.forEach(item => {
    let m = d.createElement('meta')
    m.name = item.name
    m.content = item.content
    h.appendChild(m)
  })
}

export function alipayShare(params) {
  const { title, content, image, url } = params
  if (!ap) {
    console.error('ap is not loaded in AlipayShare.js')
    return
  }
  ap.share({
    title,
    content,
    image,
    url,
    showToolBar: true,
  })
}
