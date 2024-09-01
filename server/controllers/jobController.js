import validator from "validator";
import CompanyModel from "../Models/CompanyModel.js";
import JobModel from "../Models/JobModel.js";
import UserModel from "../Models/UserModel.js";

//*************** CREATE JOB CONTROLLER  ***************/
export const createJobController = async (req, res) => {
  try {
    // Get user
    const userId = req.user;
    const user = await UserModel.findById(userId);

    // Check if user is a recruiter
    if (user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only recruiters can create jobs.",
      });
    }

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
      workType,
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
      !workType ||
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

    // Work type validation
    const validWorkTyps = ["Remote", "Onsite", "Hybrid"];
    if (!validWorkTyps.includes(workType)) {
      return res.status(422).json({
        success: false,
        message: "Invalid work type provided!",
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

    // Check if the user owns the company
    if (existingCompany.ownerId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You can only create jobs for your own company.",
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
      workType,
      company,
      createdBy: userId,
      deadline,
      status,
    });
    const savedJob = await newJob.save();

    // Add the job in the company's openJob array
    existingCompany.openJobs.push(savedJob._id);
    await existingCompany.save();

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
    const { title, location, jobType, experienceLevel, salary, workType } =
      req.query;

    // Query obj
    let query = { isDeleted: false }; //Excluding Deleted jobs

    // Title
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    // Location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Job Type
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

    // Exp Level
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

    // Salary Filtering
    if (salary) {
      if (salary.includes("+")) {
        // Handle open-ended maximum salary (e.g., "300000+")
        const minSalary = parseFloat(salary.replace("+", ""));
        if (isNaN(minSalary)) {
          return res.status(422).json({
            success: false,
            message: "Invalid minimum salary provided!",
          });
        }
        query.salary = { $gte: minSalary };
      } else {
        // Handle salary range (e.g., "100000-300000")
        const salaryRange = salary.split("-");
        if (salaryRange.length === 2) {
          const minSalary = parseFloat(salaryRange[0]);
          const maxSalary = parseFloat(salaryRange[1]);

          if (isNaN(minSalary) || isNaN(maxSalary)) {
            return res.status(422).json({
              success: false,
              message: "Invalid salary range provided!",
            });
          }

          query.salary = { $gte: minSalary, $lte: maxSalary };
        } else {
          return res.status(422).json({
            success: false,
            message: "Invalid salary format provided! Use 'min-max' or 'min+'.",
          });
        }
      }
    }

    // Work type valudation
    if (workType) {
      const validWorkTypes = ["Remote", "Onsite", "Hybrid"];
      if (!validWorkTypes.includes(workType)) {
        return res.status(422).json({
          success: false,
          message: "Invalid work type provided!",
        });
      }
      query.workType = workType;
    }

    // Get total count of jobs
    const totalJobs = await JobModel.countDocuments(query);

    // Get job
    const jobs = await JobModel.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No jobs found!",
        totalJobs: 0,
        data: [],
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      totalJobs: totalJobs,
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
    const user = await UserModel.findById(userId);

    // Check if user is a recruiter
    if (user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only recruiters can get jobs.",
      });
    }

    // Get jobs of logged in user (Recruiter)
    const jobs = await JobModel.find({ createdBy: userId, isDeleted: false })
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
    // const job = await JobModel.findById(id).populate("company");

    const job = await JobModel.findById(id)
      .populate({
        path: "company", // Name of which path(field) you want to populate
        model: "Company", // The name of the model
        select: "-ownerId -closedJobs -isDeleted", // Deselect
      })
      .populate({
        path: "createdBy",
        model: "User",
        select: "name email profilePhoto bio phoneNumber location",
      });

    // Check if job was found
    if (!job || job.isDeleted) {
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

//*************** UPDATE JOB DETAILS CONTROLLER  ***************/
export const updateJobDetailsController = async (req, res) => {
  try {
    // Get userId
    const userId = req.user;

    // Extract Job Id from params
    const { id } = req.params;

    // Check if job exist or not
    const job = await JobModel.findById(id);
    if (!job || job.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }

    // Check if the logged in user is the create of job
    if (job.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only update your own jobs.",
      });
    }

    // Extract update fields from body
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      numberOfVacancies,
      experienceLevel,
      workType,
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
      !workType ||
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

    // Work type validation
    const validWorkTyps = ["Remote", "Onsite", "Hybrid"];
    if (!validWorkTyps.includes(workType)) {
      return res.status(422).json({
        success: false,
        message: "Invalid work type provided!",
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

    // Update the job details
    const updatedJob = await JobModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        requirements,
        salary,
        location,
        jobType,
        numberOfVacancies,
        experienceLevel,
        workType,
        company,
        deadline,
        status,
      },
      { new: true }
    );

    // Success Response
    return res.status(200).json({
      success: true,
      message: "Job updated successfully!",
      data: updatedJob,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//*************** DELETE JOB CONTROLLER  ***************/
export const deleteJobController = async (req, res) => {
  try {
    // Get userId
    const userId = req.user;

    // Extract Job Id from params
    const { id } = req.params;

    // Check if job exist or not
    const job = await JobModel.findById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }

    // Check if the job is already deleted
    if (job.isDeleted) {
      return res.status(400).json({
        success: false,
        message: "This job has already been deleted.",
      });
    }

    // Check if the logged in user is the create of job
    if (job.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only delete your own jobs.",
      });
    }

    // Soft delete the job by setting isDeleted to true
    job.isDeleted = true;
    await job.save();

    // Remove the job from the company's openJobs or closedJobs array
    const company = await CompanyModel.findById(job.company);
    if (company) {
      company.openJobs = company.openJobs.filter(
        (jobId) => jobId.toString() !== id
      );
      company.closedJobs.push(id);
      await company.save();
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Job deleted successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//*************** JOB SAVE LATER CONTROLLER  ***************/
export const saveJobForLaterController = async (req, res) => {
  try {
    // Get userId
    const userId = req.user;

    // Extract Job Id from params
    const { id } = req.params;

    // Check if job exist or not
    const job = await JobModel.findById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }

    // Check if the job is already deleted
    if (job.isDeleted) {
      return res.status(400).json({
        success: false,
        message: "This job has been deleted.",
      });
    }

    // Find the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the job is already saved by the user
    if (user.savedJobs.includes(id)) {
      return res.status(400).json({
        success: false,
        message: "Job is already saved.",
      });
    }

    // Save job ID in the user's saved jobs list
    user.savedJobs.push(id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Job has been saved for later.",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
