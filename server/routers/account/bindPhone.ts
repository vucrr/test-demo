import { Router } from 'express'
import { body, query } from 'express-validator/check'
import { bindPhone, getAlipayBindInfo, validateUser } from '../../controllers/account/bindPhone'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.get('/', [query('open_id').exists(), query('open_type').exists()], handler(bindPhone))

const validations = [
  body('phone')
    .exists()
    .isMobilePhone('zh-CN'),
  body('sms_code').exists(),
  body('open_id').exists(),
  body('open_type').exists(),
  body('type').exists(),
]

router.post('/validate_user', validations, handler(validateUser))

router.get(
  '/alipay_user_bind_info',
  auth,
  [query('alipay_user_id').exists(), query('type').exists()],
  handler(getAlipayBindInfo),
)

export default router
