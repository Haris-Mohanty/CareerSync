import express from "express";
import { createCompanyController } from "../controllers/companyController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

// Router object
const router = express.Router();

// Create comapny
router.post("/create-company", authMiddleware, createCompanyController);

// Export
export default router;
