import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const readDir = promisify(fs.readdir)
const fileStat = promisify(fs.stat)

const router = express.Router()

type Method = 'get' | 'post' | 'delete' | 'put' | 'patch'

function parseKey(key: string): { method: Method; path: string } {
  let method: Method = 'get'
  let path = key
  if (path.indexOf(' ') > -1) {
    method = path.split(' ')[0].toLocaleLowerCase() as Method
    path = path.split(' ')[1]
  }
  return { method, path }
}

async function parsePaths(dir: string): Promise<string[]> {
  const subs = await readDir(dir)
  const files = await Promise.all(
    subs.map(async sub => {
      const res = path.resolve(dir, sub)
      return (await fileStat(res)).isDirectory() ? parsePaths(res) : res
    }),
  )
  return files.reduce<string[]>((prev, curr) => prev.concat(curr), [])
}

async function readMockData() {
  const dir = path.resolve(__dirname, '../../mocks')
  const paths = await parsePaths(dir)
  return paths.reduce((prev, curr) => {
    try {
      const module = require(curr)
      return Object.assign({}, prev, module.default || module)
    } catch (e) {
      throw new Error('invalid module')
    }
  }, {})
}

type Handler = (req: Request) => any | Promise<any>

const parseHandler = (handler: Handler) => async (req: Request, res: Response) => {
  Promise.resolve(handler(req))
    .then((data: any) => res.json({ code: 200, data }))
    .catch(() => {
      throw new Error('return error')
    })
}

function registerRouter(method: Method, path: string, handler: object | Handler) {
  if (typeof handler === 'object') {
    router[method](path, (_, res: Response) => res.json({ code: 200, data: handler }))
  } else {
    router[method](path, parseHandler(handler))
  }
}

readMockData()
  .then(mocks => {
    Object.entries(mocks).map(mock => {
      const { method, path } = parseKey(mock[0])
      const handler = mock[1]
      registerRouter(method, path, handler)
    })
  })
  .catch(() => {
    throw new Error('mock files fail to load')
  })

export default router
