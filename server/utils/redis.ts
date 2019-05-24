import redis from 'redis'
import { promisify } from 'util'
import config from './config'
import { ErrorLog } from './tools'

const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  db: config.redis.db,
  password: config.redis.password,
  prefix: config.redis.prefix,
})

client.on('error', err => {
  if (err) {
    ErrorLog('redis failed to init')
    throw err
  }
})

export const getFromCache = promisify(client.get).bind(client)
export const setToCache = promisify(client.set).bind(client)
export const delCache = promisify(client.del).bind(client)

export default client
