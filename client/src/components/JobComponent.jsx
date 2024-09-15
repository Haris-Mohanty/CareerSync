import PropTypes from "prop-types";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import moment from "moment";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { applyJobApi, saveJobForLaterApi } from "@/api/api";
import { setUser } from "@/redux/userSlice";

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const JobComponent = ({ job }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Job posted date
  const daysAgo = moment(job.createdAt).fromNow();

  // Check if job is already saved
  const isJobSaved = user?.savedJobs.some(
    (savedJob) => savedJob?._id === job?._id
  );

  // Check if job is already applied
  const hasApplied = user?.appliedJobs?.some(
    (appliedJob) => appliedJob?._id === job?._id
  );

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
    <div className="bg-white shadow-lg min-h-[15rem] px-6 pb-3 pt-2 rounded-lg space-y-2 relative dark:bg-gray-700 dark:shadow-2xl hover:shadow-xl">
      {/* Top Row: Days Ago and Save Later Icon */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-blue-500">{daysAgo}</span>
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          className="p-2 bg-indigo-100 rounded-full border border-indigo-300 cursor-pointer hover:bg-indigo-200 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 transition"
          onClick={() => saveJobForLater(job?._id)}
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
          <AvatarImage src={job.company.logo} alt={job.company.companyName} />
          <AvatarFallback>{job.company.companyName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {job.company.companyName}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {job.company.location}
          </p>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-1">
        <h3 className="text-lg font-semibold text-gray-900 font-merriweather dark:text-white">
          {job.title}
        </h3>
        <div className="flex items-center space-x-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {job.location}
          </p>
          <span className="text-indigo-500 font-semibold text-xs">
            ({job.workType})
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 text-ellipsis line-clamp-3 dark:text-white">
          {job.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex justify-center space-x-2 mt-4">
        <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-2 py-1 rounded-full">
          {job.jobType}
        </span>
        <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-full hidden md:block">
          Exp Level: {job.experienceLevel}
        </span>
        <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-full md:hidden">
          {job.experienceLevel}
        </span>
        <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
          {job.numberOfVacancies} Vacancies
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between space-x-4">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          className="mt-2 text-indigo-600 hover:text-indigo-800 focus:outline-none dark:text-white hover:underline"
          onClick={() => navigate(`/jobs/details/${job._id}`)}
        >
          View Details
        </motion.button>
        {hasApplied ? (
          <button
            disabled
            className="mt-2 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Applied
          </button>
        ) : (
          <motion.button
            onClick={() => handleApplyNow(job?._id)}
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
  );
};

export default JobComponent;

// PropTypes validation
JobComponent.propTypes = {
  job: PropTypes.shape({
    company: PropTypes.shape({
      companyName: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      logo: PropTypes.string,
    }).isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    numberOfVacancies: PropTypes.number.isRequired,
    workType: PropTypes.string.isRequired,
    experienceLevel: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};
