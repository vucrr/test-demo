import { Router } from 'express'
import { body } from 'express-validator/check'
import { payCredit, sendSms } from '../../controllers/easeu/creditCard'
import { handler } from '../../utils/router'

const router = Router()

router.post(
  '/sendSms',
  [
    body('phone')
      .exists()
      .isMobilePhone('zh-CN'),
  ],
  handler(sendSms),
)

router.post('/payCredit', handler(payCredit))

export default router
