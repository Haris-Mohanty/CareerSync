import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createJobController } from "../controllers/jobController.js";

// Router obj
const router = express.Router();

// Create Job
router.post("/create-job", authMiddleware, createJobController);

// Export
export default router;
