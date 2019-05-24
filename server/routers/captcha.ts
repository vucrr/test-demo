import { Router } from 'express'
import { body, query } from 'express-validator/check'
import { getCaptchaImage, getCaptchaSMS, verifyCaptchaImage, verifyCaptchaSMS } from '../controllers/captcha'
import { handler } from '../utils/router'

const router = Router()

router.get('/image', [query('phone').exists(), query('type').exists()], handler(getCaptchaImage))

router.get(
  '/sms',
  [query('phone').exists(), query('type').exists(), query('image_code').exists()],
  handler(getCaptchaSMS),
)

router.post('/image', handler(verifyCaptchaImage))

router.post(
  '/sms',
  [body('phone').exists(), body('type').exists(), body('sms_code').exists()],
  handler(verifyCaptchaSMS),
)

export default router
