import PropTypes from "prop-types";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import moment from "moment";

const JobComponent = ({ job }) => {
  const daysAgo = moment(job.createdAt).fromNow();

  return (
    <div className="bg-white shadow-lg min-h-[15rem] px-6 py-4 rounded-lg space-y-2 relative">
      {/* Top Row: Days Ago and Save Later Icon */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-blue-500">{daysAgo}</span>
        <BookmarkIcon className="h-6 w-6 text-indigo-700 cursor-pointer hover:text-indigo-800" />
      </div>

      {/* Company Logo and Info */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={job.company.logo} alt={job.company.companyName} />
          <AvatarFallback>{job.company.companyName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {job.company.companyName}
          </h3>
          <p className="text-xs text-gray-500">{job.company.location}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-1">
        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        <p className="text-xs text-gray-500">{job.location}</p>
        <p className="text-sm text-gray-600 mt-2">{job.description}</p>
      </div>

      {/* Badges */}
      <div className="flex justify-center space-x-2 mt-4">
        <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-2 py-1 rounded-full">
          {job.jobType}
        </span>
        <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-full">
          {job.workType}
        </span>
        <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
          {job.numberOfVacancies} Vacancies
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between space-x-4">
        <button className="mt-2 text-indigo-600 hover:text-indigo-800 focus:outline-none">
          View Details
        </button>
        <button className="mt-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded focus:outline-none">
          Apply Now
        </button>
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
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    numberOfVacancies: PropTypes.number.isRequired,
    workType: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};
