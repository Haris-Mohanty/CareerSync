import express from "express";
import {
  userRegisterController,
  userLoginController,
  userLogoutController,
  updateUserProfileDetails,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

//***** Router Object ******/
const router = express.Router();

//***** Create Routes ****/
router.post("/register", userRegisterController);

// Login User routes
router.post("/login", userLoginController);

// logout User routes
router.post("/logout", authMiddleware, userLogoutController);

// Update user profile details
router.put("/update-user-profile", authMiddleware, updateUserProfileDetails);

// Export
export default router;
