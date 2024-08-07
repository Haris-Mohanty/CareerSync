import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createJobController,
  getAllJobsController,
  getAllJobsOfLoggedInUser,
  getJobsByIdController,
} from "../controllers/jobController.js";

// Router obj
const router = express.Router();

// Create Job
router.post("/create-job", authMiddleware, createJobController);

// Get alll jobs
router.get("/get-all-jobs", authMiddleware, getAllJobsController);

// Get All Jobs Of LoggedIn User (Recruiter)
router.get("/get-all-jobs-of-user", authMiddleware, getAllJobsOfLoggedInUser);

// Get Job By ID
router.get("/get-job-by-id/:id", authMiddleware, getJobsByIdController);

// Export
export default router;
