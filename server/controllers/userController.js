import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

// Response message
const handleResponse = (res, success, message, statusCode) => {
  return res.status(statusCode).json({
    success,
    message,
  });
};

//********* REGISTER USER CONTROLLER FUNCTION ************/
export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, profilePhoto, role } = req.body;

    // Validation
    if (!name || !email || !password || !phoneNumber || !role) {
      return handleResponse(res, false, "Please provide all fields!", 422);
    }

    // Name validation
    if (!validator.isLength(name, { min: 2, max: 40 })) {
      return handleResponse(
        res,
        false,
        "Name must be between 3 and 40 characters long!",
        422
      );
    }

    // Email Validation
    if (!validator.isEmail(email)) {
      return handleResponse(
        res,
        false,
        "Please provide a valid email address!",
        422
      );
    }

    // Password
    if (!validator.isLength(password, { min: 6, max: 18 })) {
      return handleResponse(
        res,
        false,
        "Password must be at least 6 characters long!",
        422
      );
    }

    // Phone Number Validation
    if (
      !validator.isMobilePhone(phoneNumber, undefined, { strictMode: true })
    ) {
      return handleResponse(
        res,
        false,
        "Please provide a valid phone number!",
        422
      );
    }

    // Role validation
    const validRoles = ["user", "recruiter"];
    if (!validRoles.includes(role)) {
      return handleResponse(
        res,
        false,
        "Role must be either 'user' or 'recruiter'.",
        422
      );
    }

    // Check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return handleResponse(res, false, "User already exists!", 422);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Register user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePhoto: profilePhoto || null,
      role,
    });
    await newUser.save();

    // Response message
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********* LOGIN USER CONTROLLER FUNCTION ************/
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return handleResponse(res, false, "Please provide all fields!", 422);
    }

    // Email Validation
    if (!validator.isEmail(email)) {
      return handleResponse(
        res,
        false,
        "Please provide a valid email address!",
        422
      );
    }

    // Password
    if (!validator.isLength(password, { min: 6, max: 18 })) {
      return handleResponse(
        res,
        false,
        "Password must be at least 6 characters long!",
        422
      );
    }

    // Check user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return handleResponse(res, false, "Invalid Credentials!", 404);
    }

    // Password match
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return handleResponse(
        res,
        false,
        "Incorrect Password, Please check again...",
        400
      );
    }

    // Check for JWT secret
    if (!process.env.JWT_SECRET) {
      return handleResponse(
        res,
        false,
        "JWT token not set. Please configure environment variables.",
        500
      );
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Login Success
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        user,
        token,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
