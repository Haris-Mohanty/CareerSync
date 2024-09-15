import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  MapPinIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { applyJobApi, getAllJobsApi } from "@/api/api";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { useEffect, useState } from "react";
import displayInr from "@/helper/IndianCurrency";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const cardVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const PopularJobs = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  // Fetch all jobs
  const fetchAllJobs = async () => {
    try {
      dispatch(showLoading());
      const res = await getAllJobsApi();
      if (res.success) {
        setJobs(res.data);
        dispatch(hideLoading());
      }
    } catch (err) {
      dispatch(hideLoading());
      showErrorToast(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  // Handle Apply Now click
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
        }
      } catch (err) {
        dispatch(hideLoading());
        showErrorToast(err?.response?.data?.message);
      }
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-gray-700 py-5 px-5 md:px-20">
      <div className="text-center mb-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
        >
          Popular <span className="text-indigo-600">Jobs</span>
        </motion.h2>
        <motion.p
          className="text-gray-500 dark:text-gray-200 mt-2 text-sm md:text-base"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          transition={{ delay: 0.2 }}
        >
          Check out featured jobs from top companies around the globe and apply
          now
        </motion.p>
      </div>

      <div className="space-y-6">
        {/* Job Card */}
        {jobs.slice(0, 4).map((job) => (
          <motion.div
            key={job?._id}
            className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 dark:from-gray-900 via-gray-100 dark:via-gray-800 to-gray-50 dark:to-gray-900 rounded-lg p-4 md:p-6 flex flex-col md:flex-row justify-between items-center shadow-md"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Avatar className="w-14 h-14">
                <AvatarImage
                  src={job?.company?.logo}
                  alt="Company Logo"
                  className="object-cover"
                />
                <AvatarFallback>LOGO</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-base md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {job?.title}
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-200 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-1">
                  <span className="flex items-center space-x-1">
                    <MapPinIcon className="h-4 w-4 text-indigo-700 dark:text-white" />
                    <span>{job?.workType} | IN</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4 text-indigo-700 dark:text-white" />
                    <span>8 Hours</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <CurrencyRupeeIcon className="h-4 w-4 text-indigo-700 dark:text-white" />
                    <span>{displayInr(job?.salary)} INR</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <RssIcon className="h-4 w-4 text-indigo-700 dark:text-white" />
                    <span>{job?.experienceLevel}-Level Experience</span>
                  </span>
                  <span className="bg-indigo-200 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-lg">
                    {job?.jobType}
                  </span>
                </div>
              </div>
            </div>
            <motion.button
              className="text-white text-sm px-3 md:px-5 py-2 md:py-3 text-base rounded-lg bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-colors font-raleway font-medium w-full md:w-auto"
              onClick={() => handleApplyNow(job?._id)}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
            >
              Apply Now
            </motion.button>
          </motion.div>
        ))}

        <div className="flex justify-center mt-8">
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            <Button
              onClick={() => navigate("/jobs")}
              className="text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:via-indigo-800 hover:to-indigo-900 transition duration-300 rounded-lg px-6 py-3"
            >
              See More →
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PopularJobs;
