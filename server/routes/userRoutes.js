import express from "express";
import {
  userRegisterController,
  userLoginController,
  userLogoutController,
  updateUserProfileDetails,
  markAllNotificationsAsSeen,
  deleteAllSeenNotifications,
  getUserInfoController,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

//***** Router Object ******/
const router = express.Router();

//***** Create Routes ****/
router.post("/register", userRegisterController);

// Login User routes
router.post("/login", userLoginController);

// logout User routes
router.get("/logout", authMiddleware, userLogoutController);

// Update user profile details
router.put("/update-user-profile", authMiddleware, updateUserProfileDetails);

// Mark all notifications as seen
router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  markAllNotificationsAsSeen
);

// Delete all seen notification
router.post(
  "/delete-all-seen-notifications",
  authMiddleware,
  deleteAllSeenNotifications
);

// Get user info (logged in user)
router.get("/get-user-info", authMiddleware, getUserInfoController);

// Export
export default router;
