import { Request, Router } from 'express'
import { body, query } from 'express-validator/check'
import { IncomingHttpHeaders } from 'http'
import { getInfo, getProperty, getStock, notice, saveRedirectUrl } from '../../controllers/product/detail'
// import cache from '../../middlewares/apiCache'
import { handler } from '../../utils/router'

const router = Router()

export interface SaveRedirectUrlQuery {
  headers: IncomingHttpHeaders
  body: { redirect_url: string; utm_source: string }
}

const parseNotice = (type: number) => (req: Request) => ({
  headers: req.headers,
  query: { ...req.query, type, action: 'userSubscribe' },
})

router.get(
  '/info',
  [
    query('product_id')
      .exists()
      .isInt(),
  ],
  handler(getInfo),
)
router.get(
  '/property',
  [
    query('product_id')
      .exists()
      .isInt(),
  ],
  handler(getProperty),
)
router.get(
  '/stock',
  [
    query('product_id')
      .exists()
      .isInt(),
  ],
  handler(getStock),
)
router.get(
  '/reduction',
  [
    query('activityId')
      .exists()
      .isInt(),
    query('price')
      .exists()
      .custom((value: number) => value > 0),
  ],
  handler(notice, parseNotice(2)),
)
router.get(
  '/no_stock',
  [
    query('activityId')
      .exists()
      .isInt(),
    query('skuId')
      .exists()
      .isInt(),
  ],
  handler(notice, parseNotice(1)),
)
// 三星手机助手中同步登录
router.post(
  '/userOauth/saveRedirectUrl',
  [body('redirect_url').exists(), body('utm_source').exists()],
  handler(saveRedirectUrl),
)

export default router
