import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import {syncProfile} from "../controllers/authController.js"
const router=express.Router();

router.use(authMiddleware)
router.post("/syncProfile",syncProfile);

export default router;