import validator from "validator";
import CompanyModel from "../Models/CompanyModel.js";
import JobModel from "../Models/JobModel.js";
import UserModel from "../Models/UserModel.js";

//*************** CREATE JOB CONTROLLER  ***************/
export const createJobController = async (req, res) => {
  try {
    // Get user
    const userId = req.user;

    // Extract data from request body
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      numberOfVacancies,
      experienceLevel,
      remote,
      company,
      deadline,
      status,
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !numberOfVacancies ||
      !experienceLevel ||
      !company ||
      !deadline
    ) {
      return res.status(422).json({
        success: false,
        message: "Please provide all required fields!",
      });
    }

    // Title Validation
    if (!validator.isLength(title, { min: 3, max: 100 })) {
      return res.status(422).json({
        success: false,
        message: "Title must be between 3 and 100 characters long.",
      });
    }

    // Description Validation
    if (!validator.isLength(description, { min: 10, max: 500 })) {
      return res.status(422).json({
        success: false,
        message: "Description must be between 10 and 500 characters long.",
      });
    }

    // Requirements Validation
    if (!Array.isArray(requirements) || requirements.length === 0) {
      return res.status(422).json({
        success: false,
        message: "Requirements must be a non-empty array.",
      });
    }

    // Salary Validation
    if (typeof salary !== "number" || salary < 0) {
      return res.status(422).json({
        success: false,
        message: "Salary must be a positive number.",
      });
    }

    // Location Validation
    if (!validator.isLength(location, { min: 2, max: 100 })) {
      return res.status(422).json({
        success: false,
        message: "Location must be between 2 and 100 characters long.",
      });
    }

    // Job Type Validation
    const validJobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
    if (!validJobTypes.includes(jobType)) {
      return res.status(422).json({
        success: false,
        message:
          "Job type must be one of the following: Full-time, Part-time, Contract, Internship.",
      });
    }

    // Number of Vacancies Validation
    if (typeof numberOfVacancies !== "number" || numberOfVacancies < 1) {
      return res.status(422).json({
        success: false,
        message: "Number of vacancies must be at least 1.",
      });
    }

    // Experience Level Validation
    const validExperienceLevels = ["Entry", "Mid", "Senior"];
    if (!validExperienceLevels.includes(experienceLevel)) {
      return res.status(422).json({
        success: false,
        message:
          "Experience level must be one of the following: Entry, Mid, Senior.",
      });
    }

    // Deadline Validation
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime()) || deadlineDate <= Date.now()) {
      return res.status(422).json({
        success: false,
        message: "Application deadline must be a future date.",
      });
    }

    // Status Validation
    const validStatuses = ["Open", "Closed", "On Hold"];
    if (status && !validStatuses.includes(status)) {
      return res.status(422).json({
        success: false,
        message: "Status must be one of the following: Open, Closed, On Hold.",
      });
    }

    // Check if company exist or not
    const existingCompany = await CompanyModel.findById(company);
    if (!existingCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found!",
      });
    }

    // Create new job
    const newJob = new JobModel({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      numberOfVacancies,
      experienceLevel,
      remote,
      company,
      createdBy: userId,
      deadline,
      status,
    });
    const savedJob = await newJob.save();

    // Success Response
    return res.status(201).json({
      success: true,
      message: "Job Created Successfully!",
      data: savedJob,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************ GET ALL JOB CONTROLLER  ***************/
export const getAllJobsController = async (req, res) => {
  try {
    // Extarct query parameter for sorting and filtering
    const { title, location, jobType, experienceLevel, status, remote } =
      req.query;

    // Query obj
    let query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      const validJobTypes = [
        "Full-time",
        "Part-time",
        "Contract",
        "Internship",
      ];
      if (!validJobTypes.includes(jobType)) {
        return res.status(422).json({
          success: false,
          message: "Invalid job type provided!",
        });
      }
      query.jobType = jobType;
    }

    if (experienceLevel) {
      const validExperienceLevels = ["Entry", "Mid", "Senior"];
      if (!validExperienceLevels.includes(experienceLevel)) {
        return res.status(422).json({
          success: false,
          message: "Invalid experience level provided!",
        });
      }
      query.experienceLevel = experienceLevel;
    }

    if (status) {
      const validStatuses = ["Open", "Closed", "On Hold"];
      if (!validStatuses.includes(status)) {
        return res.status(422).json({
          success: false,
          message: "Invalid status provided!",
        });
      }
      query.status = status;
    }

    if (remote) {
      query.remote = remote === "true";
    }

    // Get job
    const jobs = await JobModel.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No jobs found!",
        totalJobs: 0,
        data: [],
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      totalJobs: jobs.length,
      data: jobs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********* GET ALL JOBS OF LOGGED IN USER (RECRUITER) CONTROLLER  *******/
export const getAllJobsOfLoggedInUser = async (req, res) => {
  try {
    // Get user (Recruiter)
    const userId = req.user;

    // Get jobs of logged in user (Recruiter)
    const jobs = await JobModel.find({ createdBy: userId })
      .populate("company")
      .sort({ createdAt: -1 });

    // Check if any jobs were found
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found for this user.",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      totalJobs: jobs.length,
      data: jobs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********** GET JOB BY ID (JOB ID) CONTROLLER  ***********/
export const getJobsByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    // Get Job
    const job = await JobModel.findById(id).populate("company");

    // Check if job was found
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // Success Response
    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
