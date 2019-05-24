import { Router } from 'express'
import { auth } from '../../../middlewares/auth'
import detail from './detail'

const router = Router()

router.use('/', auth, detail)

export default router
