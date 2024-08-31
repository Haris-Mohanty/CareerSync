import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  getAllJobsOfLoggedInUser,
  getJobsByIdController,
  updateJobDetailsController,
  saveJobForLaterController,
} from "../controllers/jobController.js";

// Router obj
const router = express.Router();

// Create Job
router.post("/create-job", authMiddleware, createJobController);

// Get alll jobs
router.get("/get-all-jobs", getAllJobsController);

// Get All Jobs Of LoggedIn User (Recruiter)
router.get("/get-all-jobs-of-user", authMiddleware, getAllJobsOfLoggedInUser);

// Get Job By ID
router.get("/get-job-by-id/:id", getJobsByIdController);

// Update job details
router.put("/update-job/:id", authMiddleware, updateJobDetailsController);

// Delete Job
router.put("/delete-job/:id", authMiddleware, deleteJobController);

// Saved jobs
router.post("/save-job/:id", authMiddleware, saveJobForLaterController);

// Export
export default router;
