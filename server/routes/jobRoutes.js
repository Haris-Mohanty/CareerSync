import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createJobController,
  getAllJobsController,
} from "../controllers/jobController.js";

// Router obj
const router = express.Router();

// Create Job
router.post("/create-job", authMiddleware, createJobController);

// Get alll jobs
router.get("/get-all-jobs", authMiddleware, getAllJobsController);

// Export
export default router;
