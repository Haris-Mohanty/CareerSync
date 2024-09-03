import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CompanyComponent = ({ company }) => {
  const navigate = useNavigate();

  // Calculate how many days ago the company was created
  const daysAgo = moment(company.createdAt).fromNow();

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 shadow-xl min-h-[20rem] px-8 py-6 rounded-xl space-y-6 dark:from-gray-800 dark:to-gray-900 dark:shadow-2xl hover:shadow-2xl transition-shadow duration-300">
      {/* Top Row: Days Ago */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-blue-500 dark:text-blue-300">
          {daysAgo}
        </span>
      </div>

      {/* Company Logo and Info */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16 shadow-md">
          <AvatarImage src={company.logo} alt={company.companyName} />
          <AvatarFallback>{company.companyName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {company.companyName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {company.location}
          </p>
        </div>
      </div>

      {/* Company Description */}
      <div className="mt-2">
        <p className="text-base text-gray-600 dark:text-gray-300 line-clamp-3">
          {company.description}
        </p>
      </div>

      {/* Additional Company Details */}
      <div className="flex mt-4 justify-between items-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Industry:{" "}
          <span className="px-2 py-1 rounded-full bg-teal-500 text-white dark:bg-teal-700">
            {company.industry}
          </span>
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Size:{" "}
          <span className="ml-1 px-2 py-1 rounded-full bg-purple-500 text-white dark:bg-purple-700">
            {company.companySize}
          </span>
        </p>
      </div>

      {/* Website Link */}
      <div>
        <p className="text-sm text-indigo-600 dark:text-indigo-400 underline">
          <a href={company.website} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </p>
      </div>

      {/* View Full Details Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() =>
            navigate(`/view-company-details/${company._id}`)
          }
          className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-colors text-white text-sm px-5 py-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-transform transform hover:-translate-y-1 duration-300"
        >
          View Full Details
        </button>
      </div>
    </div>
  );
};

export default CompanyComponent;

// PropTypes validation
CompanyComponent.propTypes = {
  company: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    industry: PropTypes.string.isRequired,
    companySize: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};
