import mongoose from "mongoose";
import validator from "validator";

// Create schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      minlength: [2, "Name must be at least 2 character long"],
      maxlength: [40, "Name cannot be longer than 40 character"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email is required!"],
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [6, "Password must be at least 6 characters long!"],
    },
    profilePhoto: {
      type: String,
      validate: [validator.isURL, "Please enter a valid URL"],
      default: null,
    },
    isRecruiter: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    phoneNumber: {
      type: String,
      validate: [validator.isMobilePhone, "Please enter a valid phone number"],
      default: null,
    },
    location: {
      type: String,
      default: "",
    },
    appliedJobs: {
      type: [String],
      default: [],
    },
    experience: {
      type: Number,
      default: 0,
    },
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    resume: {
      type: String,
      validate: [validator.isURL, "Please enter a valid URL"],
      default: null,
    },
    savedJobs: {
      type: [String],
      default: [],
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unSeenNotifications: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Export
export default mongoose.model("User", userSchema);
