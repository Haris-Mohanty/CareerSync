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
    const { email, password, role } = req.body;

    // Validation
    if (!email || !password || !role) {
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

    // Check role (If role is user but use recruiter)
    if (role !== user.role) {
      return handleResponse(res, false, "Role mismatch!", 403);
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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Login Success
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 Day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        data: user,
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

//********* LOGOUT USER CONTROLLER FUNCTION ************/
export const userLogoutController = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict" })
      .json({
        success: true,
        message: "Logged out successfully!",
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********* UPDATE USER PROFILE CONTROLLER ************/
export const updateUserProfileDetails = async (req, res) => {
  try {
    // Get user
    const userId = req.user;
    const user = await UserModel.findById(userId);
    if (!user) {
      return handleResponse(res, false, "User not found!", 404);
    }

    // Get details
    const {
      name,
      phoneNumber,
      profilePhoto,
      bio,
      skills,
      location,
      resume,
      resumeName,
      totalExperienceYears,
      experience,
      education,
    } = req.body;

    // Validation
    if (!name || !phoneNumber || !profilePhoto || !bio || !resume || !skills) {
      return handleResponse(res, false, "Please provide all fields!", 422);
    }

    // Name Validation
    if (!validator.isLength(name, { min: 2, max: 40 })) {
      return handleResponse(
        res,
        false,
        "Name must be between 2 and 40 characters long!",
        422
      );
    }
    

    // Phone number validation
    if (
      phoneNumber &&
      !validator.isMobilePhone(phoneNumber, undefined, { strictMode: true })
    ) {
      return handleResponse(
        res,
        false,
        "Please provide a valid phone number!",
        422
      );
    }

    // Validate profile photo URL
    if (profilePhoto && !validator.isURL(profilePhoto)) {
      return handleResponse(
        res,
        false,
        "Please provide a valid URL for the profile photo!",
        422
      );
    }

    // Bio validation
    if (bio && bio.length > 200) {
      return handleResponse(
        res,
        false,
        "Bio cannot be longer than 200 characters!",
        422
      );
    }

    // Validate resume URL
    if (resume && !validator.isURL(resume)) {
      return handleResponse(
        res,
        false,
        "Please provide a valid URL for the resume!",
        422
      );
    }

    // Validate resume name
    if (resumeName && !validator.isLength(resumeName, { min: 1, max: 25 })) {
      return handleResponse(
        res,
        false,
        "Resume name must be between 1 and 25 characters long!",
        422
      );
    }

    // Validate skills
    if (skills) {
      for (const skill of skills) {
        if (!validator.isLength(skill, { min: 1, max: 50 })) {
          return handleResponse(
            res,
            false,
            "Each skill must be between 1 and 50 characters long!",
            422
          );
        }
      }
    }

    // Validate location
    if (location && !validator.isLength(location, { min: 1, max: 100 })) {
      return handleResponse(
        res,
        false,
        "Location must be between 1 and 100 characters long!",
        422
      );
    }

    // Year of exp validation
    if (totalExperienceYears < 0) {
      return handleResponse(
        res,
        false,
        "Total experience years cannot be negative!",
        422
      );
    }

    //  Validate experience
    if (experience) {
      for (const exp of experience) {
        // Validate company name
        if (
          exp.company &&
          !validator.isLength(exp.company, { min: 1, max: 100 })
        ) {
          return handleResponse(
            res,
            false,
            "Company name must be between 1 and 100 characters long!",
            422
          );
        }
        // Validate job title
        if (
          exp.jobTitle &&
          !validator.isLength(exp.jobTitle, { min: 1, max: 100 })
        ) {
          return handleResponse(
            res,
            false,
            "Job title must be between 1 and 100 characters long!",
            422
          );
        }
        // Validate start date
        if (exp.startDate && new Date(exp.startDate) > new Date()) {
          return handleResponse(
            res,
            false,
            "Start date cannot be in the future",
            422
          );
        }
        // Validate end date
        if (exp.endDate && new Date(exp.endDate) < new Date(exp.startDate)) {
          return handleResponse(
            res,
            false,
            "End date cannot be before start date",
            422
          );
        }
      }
    }

    // Validate education
    if (education) {
      for (const edu of education) {
        // Validate institution name
        if (
          edu.institution &&
          !validator.isLength(edu.institution, { min: 1, max: 100 })
        ) {
          return handleResponse(
            res,
            false,
            "Institution name must be between 1 and 100 characters long!",
            422
          );
        }
        // Validate degree
        if (
          edu.degree &&
          !validator.isLength(edu.degree, { min: 1, max: 100 })
        ) {
          return handleResponse(
            res,
            false,
            "Degree must be between 1 and 100 characters long!",
            422
          );
        }
        // Validate start date
        if (edu.startDate && new Date(edu.startDate) > new Date()) {
          return handleResponse(
            res,
            false,
            "Start date cannot be in the future",
            422
          );
        }
        // Validate end date
        if (edu.endDate && new Date(edu.endDate) < new Date(edu.startDate)) {
          return handleResponse(
            res,
            false,
            "End date cannot be before start date",
            422
          );
        }
      }
    }

    // Update user profile details
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          phoneNumber,
          profilePhoto,
          bio,
          skills,
          location,
          resume,
          resumeName,
          totalExperienceYears,
          experience,
          education,
        },
      },
      { new: true }
    );

    // If no document was updated, return an error response
    if (!updatedUser) {
      return handleResponse(res, false, "Failed to update user details!", 500);
    }

    // Success res
    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
