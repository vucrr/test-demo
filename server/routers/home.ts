import { Request, Router } from 'express'
import HomeCtrl from '../controllers/home'
// import cache from '../middlewares/apiCache'
import { handler } from '../utils/router'

const router = Router()

const parseHomeReq = (req: Request) => ({
  headers: req.headers,
  query: req.query,
})

router.get('/', handler(HomeCtrl.receiveHomeData, parseHomeReq))

router.get('/getUserTag', handler(HomeCtrl.getUserTag))

export default router
