import { applyJobApi, getJobDetailsApi, saveJobForLaterApi } from "@/api/api";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  BriefcaseIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import displayInr from "@/helper/IndianCurrency";
import JobDetailsSkeleton from "@/components/JobDetailsSkeleton";
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";
import { setUser } from "@/redux/userSlice";

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const JobDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { status } = location.state || {};

  // FETCH JOB DETAILS BY JOB ID
  const fetchJobDetails = async () => {
    try {
      dispatch(showLoading());
      setLoading(true);
      const res = await getJobDetailsApi(id);
      if (res.success) {
        setJobDetails(res.data);
      }
      dispatch(hideLoading());
      setLoading(false);
    } catch (err) {
      dispatch(hideLoading());
      showErrorToast(err?.response?.data?.message);
      setLoading(false);
    }
  };

  // Check if job is already saved
  const isJobSaved = user?.savedJobs.some(
    (savedJob) => savedJob?._id === jobDetails?._id
  );

  // Check if job is already applied
  const hasApplied = user?.appliedJobs?.some(
    (appliedJob) => appliedJob?._id === jobDetails?._id
  );

  // Job Status change (using deadline)
  const isDeadlinePassed = moment().isAfter(moment(jobDetails?.deadline));
  const jobStatus = isDeadlinePassed ? "Closed" : jobDetails?.status;

  // SAVE JOB FOR LATER
  const saveJobForLater = async (id) => {
    try {
      dispatch(showLoading());
      const res = await saveJobForLaterApi(id);
      if (res.success) {
        dispatch(hideLoading());
        showSuccessToast(res.message);
        dispatch(setUser(res.data));
        window.location.reload();
      }
    } catch (err) {
      dispatch(hideLoading());
      showErrorToast(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  // Handle Apply Now click
  const handleApplyNow = async (id) => {
    if (!user) {
      showErrorToast("Please login to apply for the job");
      navigate("/login");
    } else {
      try {
        dispatch(showLoading());
        const res = await applyJobApi(id);
        dispatch(hideLoading());
        if (res.success) {
          showSuccessToast(res.message);
          window.location.reload();
        }
      } catch (err) {
        dispatch(hideLoading());
        showErrorToast(err?.response?.data?.message);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="bg-slate-100 dark:bg-gray-700 md:mt-16 px-4 md:px-16 md:gap-20 py-4 flex flex-col md:flex-row items-center justify-center">
          <JobDetailsSkeleton />
        </div>
      ) : (
        <div className="bg-slate-100 dark:bg-gray-700 md:mt-16 px-4 md:px-16 md:gap-20 py-4 flex flex-col md:flex-row items-center justify-center">
          {/* Job Card */}
          <div className="w-full md:w-[32%] mx-auto bg-white shadow-lg dark:bg-gray-800 rounded-lg p-6 border border-gray-200 relative order-1 md:order-1 dark:border-gray-700">
            {/* Save Late Icon */}
            <div className="flex justify-end items-center absolute top-2 right-4">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                className="p-2 bg-indigo-100 rounded-full border border-indigo-300 cursor-pointer hover:bg-indigo-200 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 transition"
                onClick={() => saveJobForLater(jobDetails?._id)}
              >
                {isJobSaved ? (
                  <BookmarkSolidIcon
                    title="Saved"
                    className="h-5 w-5 text-indigo-700 dark:text-white"
                  />
                ) : (
                  <BookmarkIcon
                    title="Save Later"
                    className="h-5 w-5 text-indigo-700 dark:text-white"
                  />
                )}
              </motion.div>
            </div>

            {/* Company Logo and Info */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={jobDetails?.company.logo}
                  alt={jobDetails?.company.companyName}
                />
                <AvatarFallback>
                  {jobDetails?.company.companyName.charAt(0) || "C"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {jobDetails?.company.companyName || "Company Name"}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {jobDetails?.company.location || "Company Location"}
                </p>
              </div>
            </div>

            {/* Job Title And Review */}
            <h3 className="text-lg font-semibold text-gray-900 font-merriweather dark:text-white mt-3">
              {jobDetails?.title}
            </h3>
            <div className="flex items-center text-yellow-500 mt-1 text-sm">
              <StarIcon className="h-5 w-5 text-yellow-500" />
              <span className="ml-1 text-gray-600 dark:text-gray-300">
                {jobDetails?.rating || "3.4"} | {jobDetails?.reviews || "33"}{" "}
                Reviews
              </span>
            </div>

            <div className="flex flex-col mt-4 text-sm md:text-base space-y-2 text-gray-600 dark:text-gray-300">
              <span className="flex items-center">
                <BriefcaseIcon className="h-5 w-5 text-gray-500 dark:text-gray-200" />
                Exp:
                <span className="font-semibold text-xs md:text-sm text-indigo-800 dark:text-white ml-2">
                  {jobDetails?.experienceLevel} Level
                </span>
              </span>
              <span className="mr-4 flex items-center">
                <CurrencyRupeeIcon className="h-5 w-5 text-gray-500 dark:text-gray-200" />
                Salary:
                <span className="font-semibold text-xs md:text-sm text-indigo-800 dark:text-white ml-2">
                  {displayInr(jobDetails?.salary) || "Not Disclosed"} INR
                </span>
              </span>
              <span className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-200" />
                Location:
                <span className="font-semibold text-xs md:text-sm text-indigo-800 dark:text-white ml-2">
                  {jobDetails?.workType === "Remote"
                    ? "Remote"
                    : jobDetails?.workType === "Hybrid"
                    ? `${
                        jobDetails?.location || "Location not specified"
                      } (Hybrid)`
                    : jobDetails?.location || "India"}
                </span>
              </span>
            </div>

            <div className="mt-4 flex text-gray-400 dark:text-gray-400 text-xs md:text-sm">
              <div>
                Posted:
                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 md:mx-1">
                  {moment(jobDetails?.createdAt).fromNow()}
                </span>
                |{" "}
              </div>
              <div>
                Openings:
                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 mx-1">
                  {jobDetails?.numberOfVacancies || "1"}
                </span>
                |
              </div>
              <div>
                Applicants:
                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 mx-1">
                  {jobDetails?.applications.length}
                </span>
              </div>
            </div>

            <div className="border border-b mt-3"></div>
            <div className="flex justify-end items-center mt-4">
              {hasApplied ? (
                <button
                  disabled
                  className="mt-2 bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Already Applied
                </button>
              ) : (
                <motion.button
                  onClick={() => handleApplyNow(jobDetails?._id)}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  className="mt-2 text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-colors px-4 py-2 rounded focus:outline-none"
                >
                  Apply Now
                </motion.button>
              )}
            </div>
          </div>

          {/************* Job Full Details *************/}
          <div className="w-full md:w-[68%] mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700 mt-4 md:mt-0 md:ml-4 max-h-[40rem] overflow-y-auto order-2 md:order-2">
            {/* Job Description Section */}
            <section className="mb-4">
              <div className="flex flex-col md:flex-row justify-between">
                <h4 className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-white dark:border-gray-600 mt-2">
                  Job Description
                </h4>
                <div>
                  {/* Application Status Message */}
                  {status && (
                    <div className="mb-4">
                      {status === "accepted" ? (
                        <div className="px-4 py-2 bg-green-500 text-white rounded-lg">
                          <p className="text-lg font-semibold">
                            Application Accepted
                          </p>
                          <p className="text-sm">
                            We are excited to work with you!
                          </p>
                        </div>
                      ) : status === "rejected" ? (
                        <div className="px-4 py-2 bg-red-500 text-white rounded-lg">
                          <p className="text-lg font-semibold">
                            Application Rejected
                          </p>
                          <p className="text-sm">
                            Thank you for your interest.
                          </p>
                        </div>
                      ) : status === "processing" ? (
                        <div className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
                          <p className="text-lg font-semibold">
                            Application Processing
                          </p>
                          <p className="text-sm">
                            Your application is under review.
                          </p>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 ml-4">
                {jobDetails?.description || "No description available."}
              </p>
            </section>

            {/* Job Details Section */}
            <div className="space-y-4 border-t border-gray-300 dark:border-gray-600 pt-6">
              <section className="space-y-2 px-4">
                <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-400">
                  <span className="font-semibold">Job Role:</span>
                  <span>{jobDetails?.title || "Not specified"}</span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-400">
                  <span className="font-semibold">Industry Type:</span>
                  <span>
                    {jobDetails?.company?.industry || "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-400">
                  <span className="font-semibold">Job Location:</span>
                  <span>
                    {jobDetails?.workType === "Remote"
                      ? "Remote"
                      : jobDetails?.workType === "Hybrid"
                      ? `${
                          jobDetails?.location || "Location not specified"
                        } (Hybrid)`
                      : jobDetails?.location || "India"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-400">
                  <span className="font-semibold">Employment Type:</span>
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                    {jobDetails?.jobType || "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-400">
                  <span className="font-semibold">Experience Level:</span>
                  <span>
                    {jobDetails?.experienceLevel || "Not specified"} Level
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-400">
                  <span className="font-semibold">Salary:</span>
                  <span>
                    {displayInr(jobDetails?.salary) || "Not specified"} INR
                  </span>
                </div>
              </section>

              {/* Requirements Section */}
              <section className="border-t border-gray-300 dark:border-gray-600 pt-4">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white pb-2">
                  Requirements
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  {jobDetails?.requirements?.length > 0 ? (
                    jobDetails.requirements.map((requirement, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 dark:text-gray-300"
                      >
                        {requirement}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-600 dark:text-gray-300">
                      No requirements listed.
                    </li>
                  )}
                </ul>
              </section>

              {/* Deadline Section */}
              <section className="flex justify-end text-xs md:text-sm text-gray-700 dark:text-gray-400 border-t border-gray-300 dark:border-gray-600 pt-6">
                <span className="font-semibold">Last Date to Apply:</span>
                <span className="ml-2 text-indigo-500 font-bold">
                  {jobDetails?.deadline
                    ? moment(jobDetails.deadline).format("MMMM Do, YYYY")
                    : "Not specified"}{" "}
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${
                      jobStatus === "Open"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {jobStatus}
                  </span>
                </span>
              </section>
            </div>

            <div className="px-4 md:px-6 py-4 md:py-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mt-6">
              <div className="md:flex md:gap-8 md:space-y-0">
                {/* Company Details Section */}
                <div className="flex-1 md:border-r border-gray-200 dark:border-gray-700 md:border-r md:pr-8">
                  <h2 className="text-lg md:text-xl font-bold font-openSans text-gray-900 dark:text-white mb-3">
                    Company Details
                  </h2>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 md:h-20 w-12 md:w-20">
                      <AvatarImage
                        src={jobDetails?.company?.logo}
                        alt={jobDetails?.company?.companyName}
                      />
                      <AvatarFallback className="text-2xl">
                        {jobDetails?.company?.companyName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                        {jobDetails?.company?.companyName || "Company Name"}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        {jobDetails?.company?.location ||
                          "Location not specified"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2">
                        {jobDetails?.company?.description ||
                          "No description available."}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <span className="font-semibold">Email:</span>{" "}
                        {jobDetails?.company?.email || "Not specified"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4 md:mb-0">
                        <span className="font-semibold">Company Size:</span>{" "}
                        {jobDetails?.company?.companySize || "Not specified"}
                      </p>
                      <div className="flex justify-end">
                        {jobDetails?.company && (
                          <button
                            onClick={() =>
                              navigate(
                                `/view-company-details/${jobDetails?.company?._id}`
                              )
                            }
                            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-lg shadow-md transition"
                          >
                            View Company
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recruiter Details Section */}
                <div className="flex-1 md:pl-8">
                  <h2 className="text-lg md:text-xl font-bold font-openSans text-gray-900 dark:text-white mb-3">
                    Recruiter Details
                  </h2>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 md:h-20 w-12 md:w-20">
                      <AvatarImage
                        src={jobDetails?.createdBy?.profilePhoto}
                        alt={jobDetails?.createdBy?.name}
                      />
                      <AvatarFallback className="text-2xl">
                        {jobDetails?.createdBy?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                        {jobDetails?.createdBy?.name || "Recruiter Name"}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        {jobDetails?.createdBy?.location ||
                          "Location not specified"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2">
                        {jobDetails?.createdBy?.bio || "No bio available."}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <span className="font-semibold">Email:</span>{" "}
                        {jobDetails?.createdBy?.email || "Not specified"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="font-semibold">Phone:</span>{" "}
                        {jobDetails?.createdBy?.phoneNumber || "Not specified"}
                      </p>
                      <div className="flex justify-end">
                        {jobDetails?.createdBy && (
                          <button
                            onClick={() =>
                              navigate(
                                `/view-user-details/${jobDetails?.createdBy?._id}`
                              )
                            }
                            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-lg shadow-md transition"
                          >
                            View Recruiter
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetails;
