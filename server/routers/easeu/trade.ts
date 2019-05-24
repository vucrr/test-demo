import { Router } from 'express'
import { body, query } from 'express-validator/check'
import { checkFlow, createPayQsy, getTrade, getTradeSuccess, riskHandle, userSign } from '../../controllers/easeu/trade'
import { handler } from '../../utils/router'

const router = Router()

router.get('/checkFlow', [query('flow_code').exists()], handler(checkFlow))
router.get('/info', [query('flow_code').exists()], handler(getTrade))
router.post('/riskHandle', [body('zhima_unique_no').exists()], handler(riskHandle))
router.post('/userSign', [body('flowCode').exists()], handler(userSign))
router.post('/createPayQsy', [body('flowCode').exists()], handler(createPayQsy))
router.get('/success', [query('flow_code').exists()], handler(getTradeSuccess))

export default router
