import express from "express"
import homeController from '../Controllers/index.js';
const router = express.Router();
router.get('/', homeController.getHomePage)
router.get('/get-room', homeController.getAllRooms)
router.get('/get-bookings', homeController.getAllBookings)
router.post('/create-room', homeController.createRoom)
router.post('/book-room', homeController.bookRooms)
router.get('/room-bookings', homeController.getBookedRooms)
router.get('/customer-bookings', homeController.bookedCustomers)
router.get('/all-customer-bookings', homeController.allCustomerBookings)

export default router