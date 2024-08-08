import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  applyJobController,
  getAllApplicationsOfAJob,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

// Router obj
const router = express.Router();

// Create a new application (apply job)
router.post("/apply-job/:id", authMiddleware, applyJobController);

// Get all applications of a job
router.get(
  "/get-all-applications/:id",
  authMiddleware,
  getAllApplicationsOfAJob
);

// Update application status
router.put(
  "/update-application-status/:id",
  authMiddleware,
  updateApplicationStatus
);

// Export
export default router;
