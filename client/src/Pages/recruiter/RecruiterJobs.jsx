import {
  getAllJobsOfLoggedInRecruiter,
  getCompanyDetailsByRecruiterApi,
} from "@/api/api";
import displayInr from "@/helper/IndianCurrency";
import { showErrorToast } from "@/helper/toastHelper";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import JobForm from "@/components/JobForm";

const RecruiterJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(null);
  const [company, setCompany] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch all jobs of logged-in recruiter
  const fetchAllJobsOfLoggedInRecruiter = async () => {
    try {
      dispatch(showLoading());
      const res = await getAllJobsOfLoggedInRecruiter();
      dispatch(hideLoading());
      if (res.success) {
        setJobs(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

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
    }
  };

  useEffect(() => {
    fetchAllJobsOfLoggedInRecruiter();
    fetchCompanyDetails();
  }, []);

  // Handle the form of post job and update job
  const handleAddOrEditJob = (job = null) => {
    if (company.length === 0) {
      showErrorToast("Please create a company first.");
    } else {
      setSelectedJob(job);
      setShowForm(true);
    }
  };

  const handleViewDetails = (job) => {
    navigate(`/recruiter/view-job-details/${job._id}`);
  };

  return (
    <div className="bg-slate-100 dark:bg-gray-800 mt-0 md:mt-16 py-2 px-2 md:py-6">
      {showForm ? (
        <div className="px-4 md:px-8">
          <JobForm
            setShowForm={setShowForm}
            onRefresh={fetchAllJobsOfLoggedInRecruiter}
            job={selectedJob}
            buttonName={selectedJob ? "Update Job" : "Post Job"}
            company={company}
          />
        </div>
      ) : (
        <div className="mx-auto container px-4 md:px-8 py-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Your Jobs: {jobs?.length || "0"}
            </h1>
            <button
              onClick={() => handleAddOrEditJob()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Post Job
            </button>
          </div>

          {jobs?.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow transition-transform transform hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <Avatar className="w-12 h-12 mr-3">
                      <AvatarImage
                        src={job.company?.logo}
                        alt={job.company.companyName}
                      />
                      <AvatarFallback>
                        <BuildingOfficeIcon className="w-6 h-6 text-gray-400" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {job.company.companyName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <MapPinIcon className="inline w-4 h-4 mr-1" />
                        {job.company.location}
                      </p>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {job.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <BriefcaseIcon className="inline w-4 h-4 mr-1" />
                    {job.jobType} - {job.workType}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <CurrencyDollarIcon className="inline w-4 h-4 mr-1" />
                    Salary: {displayInr(job.salary)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                    {job.description}
                  </p>
                  <button
                    onClick={() => handleViewDetails(job)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
                  >
                    View Full Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <ExclamationCircleIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                No jobs available
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                It seems you have not posted any jobs yet.
              </p>
              <button
                onClick={() => handleAddOrEditJob()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Post Your First Job
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecruiterJobs;
