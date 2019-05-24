import { Router } from 'express'
import { auth } from '../../../middlewares/auth'
import category from './category'
import form from './form'
import quality from './quality'
import standby from './standby'

const router = Router()

router.use('/quality', auth, quality)
router.use('/standby', auth, standby)
router.use('/category', auth, category)
router.use('/form', auth, form)

export default router
