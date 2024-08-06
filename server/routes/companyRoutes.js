import express from "express";
import {
  createCompanyController,
  getCompanyDetailsController,
  getCompanyByIdController,
  updateCompanyDetailsController,
} from "../controllers/companyController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

// Router object
const router = express.Router();

// Create comapny
router.post("/create-company", authMiddleware, createCompanyController);

// Get Company Details
router.get("/get-company-details", authMiddleware, getCompanyDetailsController);

// Get Company By Id
router.get("/get-company-by-id/:id", authMiddleware, getCompanyByIdController);

// Update Company
router.put(
  "/update-company/:id",
  authMiddleware,
  updateCompanyDetailsController
);

// Export
export default router;
