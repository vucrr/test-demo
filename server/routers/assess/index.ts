import { Router } from 'express'
import identity from './identity'
import informationManage from './informationManage'

const router = Router()

router.use('/identity', identity)
router.use('/informationManage', informationManage)

export default router
