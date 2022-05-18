import { Router } from 'express'
import controller from './controllers/NOTUSE.controller'

const asyncHandler = require('express-async-handler')

const router = Router()

// /api/
router
  .route('/')
  .get(asyncHandler(controller.getMany))
  .post(asyncHandler(controller.createOne))

// /api/:id
router
  .route('/:id')
  .get(asyncHandler(controller.getOne))
  .put(asyncHandler(controller.updateOne))
  .delete(asyncHandler(controller.removeOne))

export default router
