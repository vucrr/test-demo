import { Router } from 'express'
import { body, query } from 'express-validator/check'
import {
  getInfo,
  getResultInfo,
  getXhjInfo,
  getXhjResultInfo,
  payBuyOut,
  payXhjBuyOut,
} from '../../controllers/account/buy-out'
import { handler } from '../../utils/router'

const router = Router()

// 轻松用买断逻辑
router.get('/info', [query('trade_no').exists()], handler(getInfo))
router.get('/result-info', [query('trade_no').exists()], handler(getResultInfo))
router.post('/pay-buy-out', [body('trade_no').exists()], handler(payBuyOut))

// 享换机买断逻辑
router.get('/service/info', [query('trade_no').exists()], handler(getXhjInfo))
router.get('/service/result-info', [query('trade_no').exists()], handler(getXhjResultInfo))
router.post('/service/pay-buy-out', [body('trade_no').exists()], handler(payXhjBuyOut))

export default router
