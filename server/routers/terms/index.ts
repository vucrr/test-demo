import { Router } from 'express'
import agreement from './agreement'

const router = Router()

router.use('/agreement', agreement)

export default router
