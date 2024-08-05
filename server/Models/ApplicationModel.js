import mongoose from "mongoose";

// Create application schema
const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job is required!"],
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Applicant is required!"],
    },
    status: {
      type: String,
      enum: ["processing", "accepted", "rejected"],
      default: "processing",
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
      enum: ["Website", "Referral", "LinkedIn", "Other"],
      default: "Website",
    },
  },
  { timestamps: true }
);

// Export
export default mongoose.model("Application", applicationSchema);
