import { Router } from 'express'
import { auth } from '../../../middlewares/auth'
import express from './express'
import store from './store'

const router = Router()

router.use('/express', auth, express)
router.use('/store', auth, store)

export default router
