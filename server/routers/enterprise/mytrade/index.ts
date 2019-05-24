import { Router } from 'express'
import pickNumber from './pickNumber'

const router = Router()

router.use('/pickNumber', pickNumber)

export default router
