import { Router } from 'express'
import apply from './apply'
import mytrade from './mytrade'

const router = Router()

router.use('/apply', apply)

router.use('/mytrade', mytrade)

export default router
