import { Router } from 'express'
import { getCenter, getInfo } from '../../controllers/account/center'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.get('/', auth, handler(getCenter))

router.get('/info', auth, handler(getInfo))

export default router
