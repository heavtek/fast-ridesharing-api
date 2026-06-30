import express from "express";
import {
  becomeDriver,
  toggleDriverStatus,
  updateLocation,
  findDrivers,
  acceptRide,
  requestRide,
  startTrip
} from "../controllers/driverController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// driver
router.post("/driver/become", becomeDriver);
router.patch("/driver/status", toggleDriverStatus);
router.patch("/driver/location", updateLocation);

// ride
router.post("/ride/request", requestRide);
router.get("/ride/drivers", findDrivers);
router.post("/ride/accept", acceptRide);
router.patch("/ride/start",startTrip)
export default router;