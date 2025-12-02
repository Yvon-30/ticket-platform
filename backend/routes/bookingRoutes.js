// backend/routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route POST pour créer une nouvelle réservation
// POST /api/bookings
router.post('/', bookingController.createBooking);

module.exports = router;