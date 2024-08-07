import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { applyJobController } from "../controllers/applicationController.js";

// Router obj
const router = express.Router();

// Create a new application (apply job)
router.post("/apply-job/:id", authMiddleware, applyJobController);

// Export
export default router;
