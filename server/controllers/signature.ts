import { SignReq } from '../routers/signature'
import config from '../utils/config'
import { rasPrivateKeySign } from '../utils/crypto'
import { setToCache } from '../utils/redis'

export async function receiveSign({ origin, host }: SignReq): Promise<void | { token: string }> {
  const token = rasPrivateKeySign({ origin, privateKeyPath: config.rsaKey.private })
  const preHost = host === 'localhost' ? host : host.substr(0, host.indexOf('.'))
  const key = origin + config.redis.version + (config.redis.isDebug ? `-${preHost}` : '')
  await setToCache(key, true, 'EX', 30 * 60)
  return { token }
}
