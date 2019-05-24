import { Router } from 'express'
import { auth } from '../../../middlewares/auth'
import invoice from './invoice'

const router = Router()

router.use('/invoice', auth, invoice)

export default router
