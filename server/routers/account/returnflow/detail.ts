import { Router } from 'express'
import { query } from 'express-validator/check'
import { getCost, getOrderDetail, getResults, getSavePayInfo } from '../../../controllers/account/returnflow/detail'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/', [query('trade_no').exists()], handler(getOrderDetail))
router.get('/success', [query('trade_no').exists(), query('pay_no').exists()], handler(getResults))
router.get('/cost', [query('trade_no').exists()], handler(getCost))
router.get('/savePayInfo', [query('trade_no').exists()], handler(getSavePayInfo))

export default router
