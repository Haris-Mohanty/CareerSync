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
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required!"],
      validate: {
        validator: (value) =>
          validator.isMobilePhone(value, undefined, { strictMode: true }),
        message: "Please enter a valid phone number",
      },
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "recruiter"],
      required: [true, "Role is required!"],
    },
    bio: {
      type: String,
      default: "",
      maxlength: [200, "Bio cannot be longer than 500 characters"],
    },
    skills: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
    appliedJobs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Job",
      default: [],
    },
    resume: {
      type: String,
      default: null,
    },
    resumeName: {
      type: String,
      default: null,
    },
    savedJobs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Job",
      default: [],
    },
    totalExperienceYears: {
      type: Number,
      default: 0,
      min: [0, "Experience years cannot be negative"],
    },
    experience: [
      {
        company: {
          type: String,
          required: [true, "Company name is required"],
          maxlength: [100, "Company name cannot be longer than 100 characters"],
        },
        jobTitle: {
          type: String,
          required: [true, "Job title is required"],
          maxlength: [100, "Job title cannot be longer than 100 characters"],
        },
        startDate: {
          type: Date,
          required: [true, "Start date is required"],
          validate: {
            validator: function (value) {
              return value <= new Date();
            },
            message: "Start date cannot be in the future",
          },
        },
        endDate: {
          type: Date,
          validate: {
            validator: function (value) {
              return !value || value >= this.startDate;
            },
            message: "End date cannot be before start date",
          },
        },
        isCurrent: {
          type: Boolean,
          default: false,
        },
        employmentType: {
          type: String,
          enum: ["Full-time", "Part-time", "Contract", "Internship"],
          required: [true, "Employment type is required"],
        },
      },
    ],
    education: [
      {
        institution: {
          type: String,
          required: [true, "Institution name is required"],
          maxlength: [
            100,
            "Institution name cannot be longer than 100 characters",
          ],
        },
        degree: {
          type: String,
          required: [true, "Degree is required"],
          maxlength: [100, "Degree cannot be longer than 100 characters"],
        },
        fieldOfStudy: {
          type: String,
          maxlength: [
            100,
            "Field of study cannot be longer than 100 characters",
          ],
        },
        startDate: {
          type: Date,
          required: [true, "Start date is required"],
        },
        endDate: {
          type: Date,
          validate: {
            validator: function (value) {
              return !value || value >= this.startDate;
            },
            message: "End date cannot be before start date",
          },
        },
        isCurrent: {
          type: Boolean,
          default: false,
        },
      },
    ],
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
