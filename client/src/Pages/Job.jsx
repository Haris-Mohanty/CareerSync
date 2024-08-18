import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { toast } from "sonner";
import { getAllJobsApi } from "@/api/api";
import JobComponent from "@/components/JobComponent";

const Job = () => {
  const dispatch = useDispatch();
  const [activeFilters, setActiveFilters] = useState({}); // Manage which filters are open
  const [selectedFilters, setSelectedFilters] = useState({}); // Manage selected radio buttons
  const [jobs, setJobs] = useState([]);

  const toggleFilter = (id) => {
    setActiveFilters((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleRadioChange = (sectionId, value) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [sectionId]: value,
    }));
  };

  const clearFilter = (sectionId) => {
    setSelectedFilters((prevState) => {
      const newFilters = { ...prevState };
      delete newFilters[sectionId];
      return newFilters;
    });
  };

  //***************** FETCH ALL JOBS ***************/
  const fetchAllJobs = async () => {
    try {
      dispatch(showLoading());
      const res = await getAllJobsApi(selectedFilters);
      if (res.success) {
        setJobs(res.data);
        dispatch(hideLoading());
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, [selectedFilters]);

  // Filters
  const filters = [
    {
      id: "title",
      name: "Most Popular Searches",
      options: [
        { value: "Frontend Development", label: "Frontend Development" },
        { value: "Full Stack Development", label: "Full Stack Development" },
        { value: "Digital Marketing", label: "Digital Marketing" },
      ],
    },
    {
      id: "location",
      name: "Popular Locations",
      options: [
        { value: "Delhi, India", label: "Delhi, India" },
        { value: "Mumbai, India", label: "Mumbai, India" },
        { value: "Bhubaneswar, India", label: "Bhubaneswar, India" },
      ],
    },
    {
      id: "jobType",
      name: "Job Type",
      options: [
        { value: "Full-time", label: "Full Time" },
        { value: "Part-time", label: "Part Time" },
        { value: "Contract", label: "Contract" },
        { value: "Internship", label: "Internship" },
      ],
    },
    {
      id: "experienceLevel",
      name: "Experience Level",
      options: [
        { value: "Entry", label: "Entry" },
        { value: "Mid", label: "Mid" },
        { value: "Senior", label: "Senior" },
      ],
    },
    {
      id: "salary",
      name: "Salary (LPA)",
      options: [
        { value: "0-100000", label: "0 - 100K" },
        { value: "100000-300000", label: "100k-300k" },
        { value: "300000+", label: "300k+" },
      ],
    },
    {
      id: "workType",
      name: "Work Type",
      options: [
        { value: "Remote", label: "Remote" },
        { value: "Onsite", label: "On-site" },
        { value: "Hybrid", label: "Hybrid" },
      ],
    },
  ];

  return (
    <div className="bg-slate-100 mt-0 md:mt-12 pb-6">
      <main className="mx-auto px-8 md:px-12">
        <div className="pt-8 md:grid md:grid-cols-5 md:gap-x-8">
          <aside className="bg-white pl-8 pr-2 py-7 rounded-lg shadow-lg hidden md:block">
            <h2 className="text-4xl mb-6 ml-10 text-indigo-700 font-medium">
              Filters
            </h2>
            <form className="space-y-8 divide-y divide-gray-200 max-h-[32rem] overflow-y-auto">
              {filters.map((section, sectionIdx) => (
                <div
                  key={section.id}
                  className={sectionIdx === 0 ? null : "pt-10"}
                >
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900 flex justify-between items-center">
                      {section.name}
                      <div className="flex items-center space-x-2 ml-1">
                        {selectedFilters[section.id] && (
                          <button
                            type="button"
                            onClick={() => clearFilter(section.id)}
                            className="focus:outline-none"
                          >
                            <XMarkIcon className="h-6 w-6 text-red-600 hover:text-red-800" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleFilter(section.id)}
                          className="focus:outline-none"
                        >
                          {activeFilters[section.id] ? (
                            <ChevronUpIcon className="h-6 w-6 text-indigo-500 hover:text-indigo-700" />
                          ) : (
                            <ChevronDownIcon className="h-6 w-6 text-indigo-500 hover:text-indigo-700" />
                          )}
                        </button>
                      </div>
                    </legend>
                    <div
                      className={`${
                        activeFilters[section.id]
                          ? "max-h-[20rem] transition-max-height duration-500 ease-in-out"
                          : "max-h-0 overflow-hidden transition-max-height duration-500 ease-in-out"
                      }`}
                    >
                      <div className="space-y-3 pt-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`${section.id}-${optionIdx}`}
                              name={section.id}
                              value={option.value}
                              type="radio"
                              checked={
                                selectedFilters[section.id] === option.value
                              }
                              onChange={() =>
                                handleRadioChange(section.id, option.value)
                              }
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600 cursor-pointer"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </fieldset>
                </div>
              ))}
            </form>
          </aside>

          {/* Job Cards Section */}
          <div className="mt-1 md:mt-5 md:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4">
              {jobs.length > 0 ? (
                jobs.map((job, index) => <JobComponent key={index} job={job} />)
              ) : (
                <div className="flex flex-col items-center justify-center h-96">
                  <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-2xl text-gray-700 mb-4">No jobs found.</p>
                  <p className="text-gray-500">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Job;
