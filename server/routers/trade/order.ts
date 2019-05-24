import { Router } from 'express'
import { body, query } from 'express-validator/check'
import {
  ceateTrade,
  createStrategyPay,
  getConfirmInfo,
  getConfirmRemote,
  getConfirmReplace,
  getPayDetail,
  getPayResult,
} from '../../controllers/trade/order'
import { RouterRequest } from '../../interfaces/router'
import { auth } from '../../middlewares/auth'
import config from '../../utils/config'
import { handler } from '../../utils/router'

const router = Router()

const checkString = (value: string) => !value || value.length > 0
const checkNaN = (value: number) => !value || !isNaN(value)
// const checkObject = (value: object) => !value || !Object.keys(value).length

router.get(
  '/confirm/info',
  auth,
  [
    query('contract_product_id')
      .exists()
      .isInt(),
    query('vas_id').custom(checkString),
    query('store_code').custom(checkString),
    query('trade_type').custom(checkString),
    query('old_trade_no').custom(checkString),
  ],
  handler(getConfirmInfo),
)
router.get('/confirm/remote', auth, handler(getConfirmRemote))
router.post(
  '/confirm/replace',
  auth,
  [
    body('contract_product_id')
      .exists()
      .isInt(),
    body('old_trade_no').custom(checkString),
  ],
  handler(getConfirmReplace),
)

router.post(
  '/confirm/ceateTrade',
  auth,
  [
    body('contract_product_id')
      .exists()
      .isInt(),
    body('vas_id').custom(checkString),
    body('coop_no').custom(checkString),
    body('delivery_type').custom(checkNaN),
    body('store_code').custom(checkString),
    // body('vas_params').custom(checkObject),
  ],
  handler(ceateTrade),
)

router.get(
  '/pay/info',
  auth,
  [
    query('trade_no')
      .exists()
      .isInt(),
    query('pis_code').custom(checkString),
  ],
  handler(getPayDetail),
)

const parseCreateStrategyPayReq = (req: RouterRequest) => ({
  headers: req.headers,
  query: {},
  body: {
    return_url: `${config.host}mytrade/order/pay?trade_no=${req.body.trade_no}&pis_code=${req.body.pis_code || ''}`,
    ...req.body,
  },
})

router.post(
  '/pay/createStrategyPay',
  auth,
  [
    body('trade_no')
      .exists()
      .isInt(),
    body('pis_code').custom(checkString),
    body('return_url').custom(checkString), // parseCreateStrategyPayReq
    body('pay_no').custom(checkString),
    body('type').custom(checkString),
    body('zhima_unique_no').custom(checkString),
  ],
  handler(createStrategyPay, parseCreateStrategyPayReq),
)

router.get(
  '/result/info',
  auth,
  [
    query('trade_no')
      .exists()
      .isInt(),
    query('pis_code').custom(checkString),
  ],
  handler(getPayResult),
)

export default router
