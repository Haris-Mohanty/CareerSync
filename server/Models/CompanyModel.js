import mongoose from "mongoose";
import validator from "validator";

// Create Schema
const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: [true, "Company Name is required!"],
      minlength: [3, "TiCompany Nametle must be at least 3 characters long."],
      maxlength: [100, "Company Name cannot exceed 100 characters."],
    },
    description: {
      type: String,
      trim: true,
      minlength: [10, "Description must be at least 10 characters long."],
      maxlength: [500, "Description cannot exceed 500 characters."],
    },
    location: {
      type: String,
      minlength: [2, "Description must be at least 2 characters long."],
      maxlength: [100, "Description cannot exceed 100 characters."],
    },
    logo: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      required: [true, "Company website is required!"],
    },
    email: {
      type: String,
      required: [true, "Company email is required!"],
      validate: [validator.isEmail, "Please enter a valid email address."],
    },
    industry: {
      type: String,
      enum: ["Technology", "Finance", "Healthcare", "Education", "Other"],
      required: [true, "Industry type is required!"],
    },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001+"],
      default: "1-10",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner id is required!"],
    },
    openJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    closedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Export
export default mongoose.model("Company", companySchema);
