import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import connect from './utils/connect'
// import errorHandler from './utils/errorHandler'
import Router from './src/router'
import { appoloLaunch } from './appolo-server'


const app = express()


// Database connection
connect()
// Start 
appoloLaunch(app)

const log = (req: Request, res: Response, next: NextFunction) => {
  console.log("You've just logged in !")
  next()
}
// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(log)
app.use(morgan('dev'))

// Routes
app.use('/api', Router)

// Error handler
// app.use(errorHandler)

app.listen(5000, () => console.log('Server started on localhost:5000'))
