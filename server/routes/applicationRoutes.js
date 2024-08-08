import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  applyJobController,
  getAllApplicationsOfAJob,
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

// Export
export default router;
