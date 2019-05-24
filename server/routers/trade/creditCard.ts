import { Router } from 'express'
import { body } from 'express-validator/check'
import { getCreditCup, getCreditQuery, getCreditSMS } from '../../controllers/trade/creditCard'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.post(
  '/sms',
  auth,
  [
    body('mobile')
      .exists()
      .isInt(),
  ],
  handler(getCreditSMS),
)

router.post(
  '/query',
  auth,
  [
    body('bill_no')
      .exists()
      .isInt(),
  ],
  handler(getCreditQuery),
)
router.post(
  '',
  auth,
  [
    body('trade_no')
      .exists()
      .isInt(),
    body('pay_no')
      .exists()
      .isInt(),
    body('sms_code')
      .exists()
      .isInt(),
    body('name').exists(),
    body('card_id').exists(),
    body('acc_no')
      .exists()
      .isInt(),
    body('phone')
      .exists()
      .isInt(),
    body('cvn')
      .exists()
      .isInt(),
    body('valid_end_time').exists(),
  ],
  handler(getCreditCup),
)

export default router
