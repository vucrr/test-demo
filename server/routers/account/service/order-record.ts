import { Router } from 'express'
import { query } from 'express-validator/check'
import { getRecordList, getRecordTradeDetail } from '../../../controllers/account/service/order-record'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/list', [query('contract_no').exists()], handler(getRecordList))
router.get('/detail', [query('trade_no').exists()], handler(getRecordTradeDetail))

export default router
