import { Router } from 'express'
import { getPickNumber, lockPhone, searchPhone, unlockPhone } from '../../../controllers/enterprise/mytrade/pickNumber'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/', handler(getPickNumber))
router.get('/searchPhone', handler(searchPhone))
router.get('/lockPhone', handler(lockPhone))
router.get('/unlockPhone', handler(unlockPhone))

export default router
