import { useNavigate, useParams } from "react-router-dom";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  TagIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import displayInr from "@/helper/IndianCurrency";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import JobForm from "@/components/JobForm";
import {
  deleteJobApi,
  getCompanyDetailsByRecruiterApi,
  getJobDetailsApi,
} from "@/api/api";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";
import { Skeleton } from "@/components/ui/skeleton";
import ReceivedApplications from "@/components/ReceivedApplications";

const RecruiterJobsDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const [company, setCompany] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Job Status change (using deadline)
  const isDeadlinePassed = moment().isAfter(moment(job?.deadline));
  const jobStatus = isDeadlinePassed ? "Closed" : job?.status;

  //********** FETCH COMPANY OF RECRUITER *****/
  const fetchCompanyDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getCompanyDetailsByRecruiterApi();
      dispatch(hideLoading());
      if (res.success) {
        setCompany(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
      showErrorToast("Failed to fetch company details.");
    }
  };

  //********  Fetch Company Details by Company ID *****/
  const fetchJobDetailsById = async () => {
    try {
      dispatch(showLoading());
      const res = await getJobDetailsApi(id);
      dispatch(hideLoading());
      if (res.success) {
        setJob(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      showErrorToast(err?.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
    fetchJobDetailsById();
  }, []);

  // ******* DELTE JOB *********/
  const handleDeleteJob = async () => {
    try {
      dispatch(showLoading());
      const res = await deleteJobApi(id);
      dispatch(hideLoading());
      if (res.success) {
        showSuccessToast("Job deleted successfully.");
        setShowDeleteDialog(false);
        navigate("/recruiter/job");
      }
    } catch (err) {
      dispatch(hideLoading());
      showErrorToast(err?.response?.data?.message || "An error occurred.");
    }
  };

  // Handle the form of post job and update job
  const handleAddOrEditJob = (job = null) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  // Show Skeleton
  if (!job) {
    return (
      <div className="max-w-7xl mx-auto mt-8 md:mt-16">
        {/* Skeleton Container */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8">
          {/* Skeleton Avatar */}
          <div className="flex flex-col md:flex-row items-center md:items-start pb-3 relative">
            <Skeleton className="h-44 w-44 rounded-full mb-6 md:mb-0 md:mr-8" />

            <div>
              {/* Job Title Skeleton */}
              <Skeleton className="h-8 w-48 mb-4" />

              {/* Company Name Skeleton */}
              <Skeleton className="h-6 w-32 mb-4" />

              {/* Job Meta Info Skeleton (Location, Job Type, etc.) */}
              <div className="flex space-x-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </div>

          {/* Job Status Skeleton */}
          <div className="mt-4">
            <Skeleton className="h-6 w-24" />
          </div>

          {/* Job Description and Company Info Skeleton */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {/* Job Description Heading Skeleton */}
              <Skeleton className="h-6 w-40 mb-4" />
              {/* Job Description Text Skeleton */}
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />

              {/* Requirements Heading Skeleton */}
              <Skeleton className="h-6 w-40 mt-8 mb-4" />
              {/* Requirements List Skeleton */}
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div>
              {/* Company Info Heading Skeleton */}
              <Skeleton className="h-6 w-40 mb-4" />
              {/* Company Info Text Skeleton */}
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />

              {/* Job Details Heading Skeleton */}
              <Skeleton className="h-6 w-40 mt-8 mb-4" />
              {/* Job Details Text Skeleton */}
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto md:mt-16 px-4 md:px-8 py-4">
      {showForm ? (
        <div className="px-4 md:px-8">
          <JobForm
            setShowForm={setShowForm}
            onRefresh={fetchJobDetailsById}
            job={selectedJob}
            buttonName={selectedJob ? "Update Job" : "Post Job"}
            company={company}
          />
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start pb-3 relative">
              {/* Edit and Delete Buttons */}
              {user?._id === job?.createdBy?._id && (
                <div className="absolute -top-4 -right-3  flex space-x-2">
                  <button
                    onClick={() => handleAddOrEditJob(job)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-medium shadow-md transition"
                  >
                    Edit Job
                  </button>

                  {/* Button to open the delete dialog */}
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-medium shadow-md transition"
                    onClick={() => setShowDeleteDialog(true)} // Open the dialog
                  >
                    Delete Job
                  </button>
                </div>
              )}

              {/* Dialog Component for delete job */}
              <Dialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
              >
                <DialogOverlay />
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Job</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this job? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transition"
                      onClick={() => setShowDeleteDialog(false)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteJob}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                    >
                      Confirm Delete
                    </button>
                  </div>
                </DialogContent>
              </Dialog>

              <Avatar className="h-28 md:h-44 w-28 md:w-44 border-4 border-gray-300 dark:border-gray-600 transition-transform transform hover:scale-105 mr-8 mt-6 md:mt-0">
                <AvatarImage
                  src={job.company.logo}
                  alt={job.company.companyName}
                />
                <AvatarFallback className="text-5xl">
                  {job?.company?.companyName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="mt-4">
                <h1 className="text-lg md:text-3xl font-bold text-gray-900 dark:text-gray-200">
                  {job.title}
                </h1>
                <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 md:mt-2">
                  {job.company.companyName}
                </p>
                <div className="flex flex-wrap mt-4 space-x-4 text-xs md:text-base">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    <span>
                      {job?.workType === "Remote"
                        ? "Remote"
                        : job?.workType === "Hybrid"
                        ? `${
                            job?.location || "Location not specified"
                          } (Hybrid)`
                        : job?.location || "India"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <BriefcaseIcon className="w-5 h-5 mr-2" />
                    <span>{job.jobType}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                    <span>Salary: {displayInr(job.salary)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span>
                      Posted on: {moment(job.createdAt).format("MMMM Do, YYYY")}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      jobStatus === "Open"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {jobStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Job Desc */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-200 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
                  Job Description
                </h2>
                <p className="text-sm md:text-base mt-4 text-gray-700 dark:text-gray-300">
                  {job.description}
                </p>

                {/* Job Requirements */}
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-200 mt-8 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
                  Requirements
                </h2>
                <ul className="text-sm md:text-base mt-4 space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <TagIcon className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Info */}
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-200 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
                  Company Information
                </h2>
                <p className="text-sm md:text-base mt-4 text-gray-700 dark:text-gray-300">
                  {job.company.description}
                </p>
                <div className="text-sm md:text-base mt-4 space-y-2">
                  <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.company.location}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline"
                    >
                      {job.company.website}
                    </a>
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Email:</span>{" "}
                    {job.company.email}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Industry:</span>{" "}
                    {job.company.industry}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Company Size:</span>{" "}
                    {job.company.companySize}
                  </p>
                </div>

                {/* Job Info */}
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-200 mt-8 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
                  Job Details
                </h2>
                <div className="text-sm md:text-base mt-4 space-y-2">
                  <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Number of Vacancies:</span>{" "}
                    {job.numberOfVacancies}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Experience Level:</span>{" "}
                    {job.experienceLevel}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">Application Deadline:</span>{" "}
                    {job?.deadline
                      ? moment(job.deadline).format("MMMM Do, YYYY")
                      : "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Received Applications */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-2">
            <ReceivedApplications jobId={job?._id} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecruiterJobsDetails;
