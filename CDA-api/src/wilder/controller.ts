import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

const getMany = async (req: Request, res: Response, next: NextFunction) => {}

const getOne = async (req: Request, res: Response, next: NextFunction) => {}

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
