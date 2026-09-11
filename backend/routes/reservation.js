import express from 'express';
import { sendReservation, getAllReservations, checkAvailability } from '../controllers/reservation.js';

const router = express.Router();

router.post("/send",sendReservation)
router.get("/all", getAllReservations)
router.get("/availability", checkAvailability)
export default router;