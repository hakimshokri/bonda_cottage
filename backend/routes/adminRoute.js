import express from 'express'
import { addCottage, adminDashboard, allCottages, bookingCancel, bookingsAdmin, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeStatus } from '../controllers/cottageController.js'

const adminRouter = express.Router()

adminRouter.post('/add-cottage', authAdmin, upload.single('main_image'), addCottage)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-cottages', authAdmin, allCottages)
adminRouter.post('/change-status', authAdmin, changeStatus)
adminRouter.get('/bookings', authAdmin, bookingsAdmin)
adminRouter.post('/cancel-booking', authAdmin, bookingCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter