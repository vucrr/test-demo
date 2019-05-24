let fs = require('fs')
let path = require('path')

let MockLite = require('mockjs-lite')
let walkdir = require('node-walkdir')

let Mock = MockLite
let Random = MockLite.Random

let template = fs.readFileSync(path.join(__dirname, 'doc.html'), 'utf8')
let RE = /^\s*\/\*[*\s]+?([^\r\n]+)[\s\S]+?@url\s+([^\n]+)[\s\S]+?\*\//im


function mock(dir) {
  let routes = {} // routes list

  walkdir(dir, /\.ts?$/i, (filepath) => {
    let content = String(fs.readFileSync(filepath, 'utf8')).trim() || '{}'

    let url = filepath
    let describe = 'no description'

    let m = content.match(RE)

    if (m) {
      url = m[2].trim()
      describe = m[1].replace(/(^[\s*]+|[\s*]+$)/g, '')
    }

    if (url[0] !== '/') { // fix url path
      url = `/${url}`
    }

    let pathname = url
    if (pathname.indexOf('?') > -1) {
      pathname = pathname.split('?')[0]
    }

    if (mock.debug && routes[pathname]) {
      console.warn(`[Mock Warn]: [${filepath}: ${pathname}] already exists and has been covered with new data.`)
    }

    routes[pathname] = {
      url,
      filepath,
      describe,
    }

    if (/\.ts$/.test(filepath)) {
      routes[pathname].data = require(filepath)
    } else {
      try {
        routes[pathname].data = new Function(`return (${content})`)()
      } catch (e) {
        delete routes[pathname]
        mock.debug && console.warn('[Mock Warn]:', e)
      }
    }
  })


  return function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')

    let allowedHeaders = req.headers['access-control-request-headers']
    if (allowedHeaders) {
      res.set('Access-Control-Allow-Headers', allowedHeaders)
    }

    if (req.method === 'OPTIONS') {
      return res.send('')
    }

    let url = req.url.split('?')[0]

    if (url === '/') { // api document page
      let host = `${req.protocol}://${req.headers.host}${req.baseUrl}`

      let list = Object.keys(routes).sort().map((_path) => {
        let route = routes[_path]
        return {
          title: route.describe,
          url: host + route.url,
          file: route.filepath,
        }
      })

      return res.send(template.replace('@menuList', JSON.stringify(list)))
    }

    let data = (routes[url] || 0).data

    if (data) {
      if (typeof data === 'function') {
        data = data(req, Mock, Random)
      }
      res.json(Mock.mock(data))
    } else {
      next()
    }
  }
}

mock.debug = false
module.exports = mock
