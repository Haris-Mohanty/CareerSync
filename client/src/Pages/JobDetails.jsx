import { getJobDetailsApi } from "@/api/api";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  BriefcaseIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const JobDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [jobDetails, setJobDetails] = useState(null);

  // FETCH JOB DETAILS BY JOB ID
  const fetchJobDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getJobDetailsApi(id);
      if (res.success) {
        setJobDetails(res.data);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  console.log("Job Details", jobDetails);

  return (
    <>
      <div className="bg-slate-100 dark:bg-gray-700 md:mt-16 px-4 md:px-16 md:gap-20 py-4 flex flex-col md:flex-row items-center justify-center">
        {/* Job Card */}
        <div className="md:w-[30%] mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 relative order-1 md:order-1">
          {/* Save Late Icon */}
          <div className="flex justify-end items-center absolute top-2 right-4">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              className="p-2 bg-indigo-100 rounded-full border border-indigo-300 cursor-pointer hover:bg-indigo-200 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 transition"
            >
              <BookmarkIcon
                title="Save Later"
                className="h-5 w-5 text-indigo-700 dark:text-white"
              />
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
                {jobDetails?.company.companyName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {jobDetails?.company.companyName}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {jobDetails?.company.location}
              </p>
            </div>
          </div>

          {/* Job Title And Review */}
          <h3 className="text-lg font-semibold text-gray-900 font-merriweather dark:text-white mt-3">
            {jobDetails?.title}
          </h3>
          <div className="flex items-center text-yellow-500 mt-1 text-sm">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <span className="ml-1 text-gray-600">
              {jobDetails?.rating || "3.4"} | {jobDetails?.reviews || "33"}{" "}
              Reviews
            </span>
          </div>

          <div className="flex flex-col mt-4 text-sm md:text-base space-y-2 text-gray-600">
            <span className="flex items-center">
              <BriefcaseIcon className="h-5 w-5 text-gray-500" />
              Exp:
              <span className="font-semibold text-xs md:text-sm text-indigo-800 ml-2">
                {jobDetails?.experienceLevel} Level
              </span>
            </span>
            <span className="mr-4 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 text-gray-500" />
              Salary:
              <span className="font-semibold text-xs md:text-sm text-indigo-800 ml-2">
                {jobDetails?.salary || "Not Disclosed"}
              </span>
            </span>
            <span className="flex items-center">
              <MapPinIcon className="h-5 w-5 text-gray-500" />
              Location:
              <span className="font-semibold text-xs md:text-sm text-indigo-800 ml-2">
                {jobDetails?.workType === "Remote"
                  ? "Remote"
                  : jobDetails?.location || "India"}
              </span>
            </span>
          </div>

          <div className="mt-4 flex text-gray-400 text-xs md:text-sm">
            <div>
              Posted:
              <span className="font-semibold text-sm text-gray-800 md:mx-1">
                {moment(jobDetails?.createdAt).fromNow()}
              </span>
              |{" "}
            </div>
            <div>
              Openings:
              <span className="font-semibold text-sm text-gray-800 mx-1">
                {jobDetails?.numberOfVacancies || "1"}
              </span>
              |
            </div>
            <div>
              Applicants:
              <span className="font-semibold text-sm text-gray-800 mx-1">
                {jobDetails?.applications.length}
              </span>
            </div>
          </div>

          <div className="border border-b mt-3"></div>
          <div className="flex justify-end items-center mt-4">
            <motion.button
              //   onClick={handleApplyNow}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              className="mt-2 text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-colors px-4 py-2 rounded focus:outline-none"
            >
              Apply Now
            </motion.button>
          </div>
        </div>

        {/* Job Description */}
        <div className="md:w-[70%] mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 mt-4 md:mt-0 md:ml-4 max-h-[40rem] overflow-y-auto order-2 md:order-2">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
            Job Description
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {jobDetails?.description || "No description available."}
          </p>

          {/* Repeated content removed for brevity */}
        </div>
      </div>
    </>
  );
};

export default JobDetails;
