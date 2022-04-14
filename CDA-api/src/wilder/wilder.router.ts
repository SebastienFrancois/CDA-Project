import { Router } from 'express'
import wilderController from './controller'

const asyncHandler = require('express-async-handler')

const router = Router()

// /api/wilders
router
  .route('/')
  .get(asyncHandler(wilderController.getMany))
  .post(asyncHandler(wilderController.createOne))

// /api/wilders/:id
router
  .route('/:id')
  .get(asyncHandler(wilderController.getOne))
  .put(asyncHandler(wilderController.updateOne))
  .delete(asyncHandler(wilderController.removeOne))

export default router
