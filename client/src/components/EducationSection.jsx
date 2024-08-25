import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Switch } from "./ui/switch";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const EducationSection = ({
  education,
  handleChange,
  handleDateChange,
  handleAddEducation,
  handleRemoveEducation,
}) => {
  // Get today's date
  const today = new Date();

  const handleStartDateChange = (index, date) => {
    handleDateChange(index, "startDate", date, "education");
  };

  const handleEndDateChange = (index, date) => {
    handleDateChange(index, "endDate", date, "education");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-xl font-semibold font-lato text-gray-700 dark:text-gray-300">Education</h3>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleAddEducation}
            className="inline-flex items-center px-2 md:px-4 py-1 md:py-2 border border-transparent text-xs md:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
            <span className="ml-1">Add Education</span>
          </button>
        </div>
      </div>
      {education.map((edu, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-700"
        >
          {/* Institution */}
          <div className="space-y-2">
            <label
              htmlFor={`institute-${index}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Institute Name
            </label>
            <input
              type="text"
              id={`institute-${index}`}
              name={`institute-${index}`}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
              value={edu.institution}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "education",
                    value: education.map((item, i) =>
                      i === index
                        ? { ...item, institution: e.target.value }
                        : item
                    ),
                  },
                })
              }
              placeholder="Enter institute name"
              required
              maxLength="100"
            />
          </div>

          {/* Degree */}
          <div className="space-y-2">
            <label
              htmlFor={`degree-${index}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Degree
            </label>
            <input
              type="text"
              id={`degree-${index}`}
              name={`degree-${index}`}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
              value={edu.degree}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "education",
                    value: education.map((item, i) =>
                      i === index ? { ...item, degree: e.target.value } : item
                    ),
                  },
                })
              }
              placeholder="Enter degree"
              required
              maxLength="100"
            />
          </div>

          {/* Field of Study */}
          <div className="space-y-2">
            <label
              htmlFor={`fieldOfStudy-${index}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Field of Study
            </label>
            <input
              type="text"
              id={`fieldOfStudy-${index}`}
              name={`fieldOfStudy-${index}`}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
              value={edu.fieldOfStudy}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "education",
                    value: education.map((item, i) =>
                      i === index
                        ? { ...item, fieldOfStudy: e.target.value }
                        : item
                    ),
                  },
                })
              }
              placeholder="Enter field of study"
              maxLength="100"
              required
            />
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
              selected={edu.startDate}
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
              selected={edu.endDate}
              onChange={(date) => handleEndDateChange(index, date)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
              dateFormat="MM/yyyy"
              showMonthYearPicker
              minDate={edu.startDate} // Prevent dates before start date
              maxDate={today} // Prevent future dates
              required={!edu.isCurrent} // Only required if not currently studying
              disabled={edu.isCurrent} // Disable if currently studying
            />
          </div>

          {/* Is Current */}
          <div className="flex items-center space-x-4">
            <label
              htmlFor={`isCurrent-${index}`}
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Currently Studying
            </label>
            <Switch
              id={`isCurrent-${index}`}
              checked={edu.isCurrent}
              onCheckedChange={(checked) =>
                handleChange({
                  target: {
                    name: "education",
                    value: education.map((item, i) =>
                      i === index ? { ...item, isCurrent: checked } : item
                    ),
                  },
                })
              }
              className="block"
            />
          </div>

          {/* Remove Button */}
          <div className="flex items-center justify-end md:justify-start">
            <button
              type="button"
              onClick={() => handleRemoveEducation(index)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
              <span className="ml-1">Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

EducationSection.propTypes = {
  education: PropTypes.arrayOf(
    PropTypes.shape({
      institution: PropTypes.string.isRequired,
      degree: PropTypes.string.isRequired,
      fieldOfStudy: PropTypes.string,
      startDate: PropTypes.instanceOf(Date).isRequired,
      endDate: PropTypes.instanceOf(Date),
      isCurrent: PropTypes.bool.isRequired,
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleAddEducation: PropTypes.func.isRequired,
  handleRemoveEducation: PropTypes.func.isRequired,
};

export default EducationSection;
