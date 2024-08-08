import ApplicationModel from "../Models/ApplicationModel.js";
import JobModel from "../Models/JobModel.js";
import UserModel from "../Models/UserModel.js";

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
      date: new Date(),
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
