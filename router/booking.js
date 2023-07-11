import express from "express";
import middlewareVerifyToken from "../controller/middlewareController.js";
import { bookingController } from "../controller/index.js";


const router = express.Router()

router.post("/booking-appointment/:id", bookingController.bookingAppointment)
router.delete("/cancel-appointment/:id", bookingController.cancelAppointment)
router.get("/your-appointment/:id", bookingController.yourAppointment)

export default router