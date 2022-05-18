import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

const getMany = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json('Hello world')
}

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json('Hello world')
}

const createOne = async (req: Request, res: Response, next: NextFunction) => {}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {}

const removeOne = async (req: Request, res: Response, next: NextFunction) => {}

export default {
  getMany,
  getOne,
  createOne,
  updateOne,
  removeOne,
}
