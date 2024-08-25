import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Switch } from "./ui/switch";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const ExperienceSection = ({
  experience,
  handleChange,
  handleDateChange,
  handleAddExperience,
  handleRemoveExperience,
}) => {
  // Get today's date
  const today = new Date();

  const handleStartDateChange = (index, date) => {
    handleDateChange(index, "startDate", date, "experience");
  };

  const handleEndDateChange = (index, date) => {
    handleDateChange(index, "endDate", date, "experience");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-xl font-semibold font-lato text-gray-700 dark:text-gray-300">
          Experience
        </h3>
        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center px-2 md:px-4 py-1 md:py-2 border border-transparent text-xs md:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
          Add Experience
        </button>
      </div>
      {experience.map((exp, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-700"
        >
          {/* Company */}
          <div className="space-y-2">
            <label
              htmlFor={`company-${index}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Company
            </label>
            <input
              type="text"
              id={`company-${index}`}
              name={`company-${index}`}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
              value={exp.company}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "experience",
                    value: experience.map((item, i) =>
                      i === index ? { ...item, company: e.target.value } : item
                    ),
                  },
                })
              }
              placeholder="Enter company name"
              required
              maxLength="100"
            />
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <label
              htmlFor={`jobTitle-${index}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Job Title
            </label>
            <input
              type="text"
              id={`jobTitle-${index}`}
              name={`jobTitle-${index}`}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
              value={exp.jobTitle}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "experience",
                    value: experience.map((item, i) =>
                      i === index ? { ...item, jobTitle: e.target.value } : item
                    ),
                  },
                })
              }
              placeholder="Enter job title"
              required
              maxLength="100"
            />
          </div>

          {/* Employment Type */}
          <div className="space-y-2">
            <label
              htmlFor={`employmentType-${index}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Employment Type
            </label>
            <select
              id={`employmentType-${index}`}
              name={`employmentType-${index}`}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
              value={exp.employmentType}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "experience",
                    value: experience.map((item, i) =>
                      i === index
                        ? { ...item, employmentType: e.target.value }
                        : item
                    ),
                  },
                })
              }
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label
              htmlFor={`startDate-${index}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Start Date
            </label>
            <DatePicker
              id={`startDate-${index}`}
              selected={exp.startDate}
              onChange={(date) => handleStartDateChange(index, date)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
              dateFormat="MM/yyyy"
              showMonthYearPicker
              maxDate={today} // Prevent future dates
              required
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label
              htmlFor={`endDate-${index}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              End Date
            </label>
            <DatePicker
              id={`endDate-${index}`}
              selected={exp.endDate}
              onChange={(date) => handleEndDateChange(index, date)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
              dateFormat="MM/yyyy"
              showMonthYearPicker
              minDate={exp.startDate} // Prevent dates before start date
              maxDate={today} // Prevent future dates
              required={!exp.isCurrent} // Only required if not currently working
              disabled={exp.isCurrent} // Disable if currently working
            />
          </div>

          {/* Is Current */}
          <div className="flex items-center space-x-4">
            <label
              htmlFor={`isCurrent-${index}`}
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Currently Working
            </label>
            <Switch
              id={`isCurrent-${index}`}
              checked={exp.isCurrent}
              onCheckedChange={(checked) =>
                handleChange({
                  target: {
                    name: "experience",
                    value: experience.map((item, i) =>
                      i === index ? { ...item, isCurrent: checked } : item
                    ),
                  },
                })
              }
              className="block"
            />
          </div>

          {/* Remove Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => handleRemoveExperience(index)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

ExperienceSection.propTypes = {
  experience: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      startDate: PropTypes.instanceOf(Date).isRequired,
      endDate: PropTypes.instanceOf(Date),
      employmentType: PropTypes.oneOf([
        "Full-time",
        "Part-time",
        "Contract",
        "Internship",
      ]).isRequired,
      isCurrent: PropTypes.bool.isRequired,
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleAddExperience: PropTypes.func.isRequired,
  handleRemoveExperience: PropTypes.func.isRequired,
};

export default ExperienceSection;
