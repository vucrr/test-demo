import { Router } from 'express'
import { Server } from 'next'
import account from './account'
import activitys from './activitys'
import assess from './assess'
import cacheList from './cacheList'
import captcha from './captcha'
import common from './common'
import easeu from './easeu'
import enterprise from './enterprise'
import home from './home'
import product from './product'
import signature from './signature'
import site from './site'
import terms from './terms'
import trade from './trade'

const router = Router()

export function cacheRouters() {
  router.use('/home', home)
  router.use('/product', product)
  router.use('/common', common)
  return router
}

export default function(app: Server, dev: boolean) {
  router.use('/cache', cacheList(app, dev))
  router.use('/common', common)
  router.use('/home', home)
  router.use('/signature', signature)
  router.use('/product', product)
  router.use('/account', account)
  router.use('/easeu', easeu)
  router.use('/trade', trade)
  router.use('/captcha', captcha)
  router.use('/site', site)
  router.use('/terms', terms)
  router.use('/assess', assess)
  router.use('/activitys', activitys)
  router.use('/enterprise', enterprise)
  return router
}
