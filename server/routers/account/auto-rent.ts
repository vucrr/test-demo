import { Router } from 'express'
import { body, query } from 'express-validator/check'
import { checkAndUserSign, frozenAutoRent, getInfo, openAutoRent, userSign } from '../../controllers/account/autoRent'
import { handler } from '../../utils/router'

const router = Router()

router.get('/info', [query('trade_no').exists()], handler(getInfo))
router.post('/openAutoRent', [body('trade_no').exists()], handler(openAutoRent))
router.post('/userSign', [body('trade_no').exists()], handler(userSign))
router.post(
  '/checkAnduserSign',
  [
    body('trade_no').exists(),
    body('only_check')
      .exists()
      .isBoolean(),
  ],
  handler(checkAndUserSign),
)
router.post('/frozenAutoRent', [body('trade_no').exists()], handler(frozenAutoRent))

export default router
