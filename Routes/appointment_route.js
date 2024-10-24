// appointmentRoutes.js
const express = require('express');
const multer = require('multer');
const AppointmentController = require('../Controller/appointment_controller');

const router = express.Router();

// Create appointment (POST)
router.post('/appointments', AppointmentController.createAppointment);

// Get all appointments (GET)
router.get('/appointments', AppointmentController.getAppointments);

// Get appointment by ID (GET)
router.get('/appointments/:id', AppointmentController.getAppointmentById);

// Update appointment (PUT)
router.put('/appointments/:id',  AppointmentController.updateAppointment);

// Delete appointment (DELETE)
router.delete('/appointments/:id', AppointmentController.deleteAppointment);

module.exports = router;
