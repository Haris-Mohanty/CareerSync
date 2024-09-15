import ApplicationModel from "../Models/ApplicationModel.js";
import JobModel from "../Models/JobModel.js";
import UserModel from "../Models/UserModel.js";
import moment from "moment";

//*********** CREATE A NEW APPLICATION (APPLY JOB) *****/
export const applyJobController = async (req, res) => {
  try {
    // Get User id
    const userId = req.user;

    // Get job id
    const { id } = req.params;

    const { source } = req.body;

    // Check if job exists
    const jobExists = await JobModel.findById(id);
    if (!jobExists || jobExists.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }

    // Check if the job deadline has passed
    if (moment().isAfter(moment(jobExists.deadline))) {
      return res.status(400).json({
        success: false,
        message: "The application deadline for this job has passed!",
      });
    }

    // Check if user exists
    const userExists = await UserModel.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found!",
      });
    }

    // Check if the user has already applied for the job
    const existingApplication = await ApplicationModel.findOne({
      job: id,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job!",
      });
    }

    // Check if user profile is complete
    const requiredFields = [
      "resume",
      "resumeName",
      "totalExperienceYears",
      "skills",
      "location",
    ];
    let missingFields = requiredFields.filter(
      (field) => !userExists[field] || userExists[field].length === 0
    );
    if (missingFields.length > 0) {
      return res.status(422).json({
        success: false,
        message: `Please complete your profile by filling out the following fields: ${missingFields.join(
          ", "
        )}.`,
      });
    }

    // Create new application
    const newApplication = new ApplicationModel({
      job: id,
      applicant: userId,
      source,
    });
    const savedApplication = await newApplication.save();

    // Add job ID to user's appliedJobs array
    userExists.appliedJobs.push(id);
    await userExists.save();

    // Add application ID to job's applications array
    jobExists.applications.push(savedApplication._id);
    await jobExists.save();

    // Get the recruiter (Creator of this job)
    const recruiterId = jobExists.createdBy;
    const recruiter = await UserModel.findById(recruiterId);

    // Push Notifications
    const notification = {
      type: "newApplication",
      message: `A new application has been submitted for your job: ${jobExists.title}.`,
      createdAt: new Date(),
      onClickPath: `recruiter/view-job-details/${jobExists._id}`,
    };
    recruiter.unSeenNotifications.push(notification);
    await recruiter.save();

    // Success res
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      data: savedApplication,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** GET ALL APPLICATIONS OF A JOB **************/
export const getAllApplicationsOfAJob = async (req, res) => {
  try {
    // Extract Job id from params
    const jobId = req.params.id;

    // Check if the job exists
    const job = await JobModel.findById(jobId);
    if (!job || job.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Job not found or has been deleted",
      });
    }

    // Fetch all applications related to the job and populate applicant details
    const applications = await ApplicationModel.find({ job: jobId }).populate({
      path: "applicant",
      model: "User",
      select:
        "-password -appliedJobs -savedJobs -seenNotifications -unSeenNotifications",
    });

    // Check if applications exist for this job
    if (!applications || applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applications found for this job",
      });
    }

    // Respond with job applications data
    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: applications,
    });
  } catch (err) {
    // Handle server error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//**** UPDATE APPLICATION STATUS (ACCEPTED | REJECTED) *****/
export const updateApplicationStatus = async (req, res) => {
  try {
    //Extract application id from params
    const applicationId = req.params.id;

    // Extract status from body
    const { status } = req.body;

    // Validate status
    if (!status || !["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Status must be 'accepted' or 'rejected'.",
      });
    }

    // Get application
    const application = await ApplicationModel.findById(applicationId)
      .populate("applicant")
      .populate("job");
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found!",
      });
    }

    // Check if the logged-in user is the creator of the job
    const currentUserId = req.user;
    if (application.job.createdBy.toString() !== currentUserId.toString()) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to update the status of this application.",
      });
    }

    // Check if the status is already set
    if (application.status === status) {
      return res.status(400).json({
        success: false,
        message: `Application status is already '${status}'. No update required.`,
      });
    }

    // Update application status
    application.status = status;
    await application.save();

    // Get the user (applicant)
    const applicant = application.applicant;
    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found!",
      });
    }

    // Push Notification
    const notification = {
      type: "application-status",
      message: `Your application for the job ${application.job.title} has been ${status}.`,
      createdAt: new Date(),
      onClickPath: "view-profile",
    };

    applicant.unSeenNotifications.push(notification);
    await applicant.save();

    // Success res
    return res.status(200).json({
      success: true,
      message: "Application status updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
