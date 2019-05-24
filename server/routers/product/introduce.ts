import { Router } from 'express'
import { query } from 'express-validator/check'
import { receiveInfo } from '../../controllers/product/introduce'
import { handler } from '../../utils/router'

const router = Router()

router.get(
  '/info',
  [
    query('id_activity')
      .exists()
      .isInt(),
  ],
  handler(receiveInfo),
)

export default router
