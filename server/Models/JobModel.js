import mongoose from "mongoose";
import validator from "validator";

// Create schema
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required!"],
      minlength: [3, "Title must be at least 3 characters long."],
      maxlength: [100, "Title cannot exceed 100 characters."],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required!"],
      minlength: [10, "Description must be at least 10 characters long."],
      maxlength: [500, "Description cannot exceed 500 characters."],
    },
    requirements: {
      type: [String],
      required: [true, "Requirements is required!"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required!"],
      min: [0, "Salary must be a positive number."],
    },
    location: {
      type: String,
      required: [true, "Location is required!"],
      validate: [
        validator.isLength,
        "Location must be at least 2 characters long.",
      ],
    },
    jobType: {
      type: String,
      required: [true, "Job type is required!"],
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
    },
    numberOfVacancies: {
      type: Number,
      required: [true, "Number of vacancies is required!"],
      min: [1, "Number of vacancies must be at least 1."],
    },
    experienceLevel: {
      type: String,
      enum: ["Entry", "Mid", "Senior"],
      required: [true, "Experience level is required!"],
    },
    workType: {
      type: String,
      enum: ["Remote", "Onsite", "Hybrid"],
      required: [true, "Work type is required!"],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required!"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required!"],
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    deadline: {
      type: Date,
      required: [true, "Application deadline is required!"],
      validate: {
        validator: function (value) {
          return value > Date.now(); // Deadline must be in the future
        },
        message: "Application deadline must be in the future.",
      },
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "On Hold"],
      default: "Open",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Export
export default mongoose.model("Job", jobSchema);
