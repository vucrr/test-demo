import { Request, Router } from 'express'
import { body } from 'express-validator/check'
import { receiveSign } from '../controllers/signature'
import { handler } from '../utils/router'

const router = Router()

export interface SignReq {
  origin: string
  host: string
}

function parseSignReq(req: Request): SignReq {
  return {
    origin: req.body.origin,
    host: req.hostname,
  }
}

router.post('/', [body('origin').exists()], handler(receiveSign, parseSignReq))

export default router
