import express from 'express'
import { cottageList } from '../controllers/cottageController.js'

const cottageRouter = express.Router()

cottageRouter.get('/list', cottageList)

export default cottageRouter