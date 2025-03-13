const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getAllBookings);
router.get('/add', bookingController.showBookingForm);
router.post('/add', bookingController.createBooking);
router.get('/edit/:id', bookingController.showUpdateBookingForm);
router.post('/edit/:id', bookingController.updateBooking);
router.post('/delete/:id', bookingController.deleteBooking);

module.exports = router;
