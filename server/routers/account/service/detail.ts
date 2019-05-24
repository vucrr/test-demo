import { Router } from 'express'
// import { body, query } from 'express-validator/check'
import { getServiceDetail } from '../../../controllers/account/service/datail'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/', handler(getServiceDetail))

export default router
