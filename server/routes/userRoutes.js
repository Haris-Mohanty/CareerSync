import express from "express";
import {
  userRegisterController,
  userLoginController,
} from "../controllers/userController.js";

//***** Router Object ******/
const router = express.Router();

//***** Create Routes ****/
router.post("/register", userRegisterController);

// Login User routes
router.post("/login", userLoginController);

// Export
export default router;
