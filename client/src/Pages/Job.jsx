import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { getAllJobsApi } from "@/api/api";
import JobComponent from "@/components/JobComponent";
import { motion } from "framer-motion";
import JobsCardSkeleton from "@/components/JobsCardSkeleton";
import { showErrorToast } from "@/helper/toastHelper";

const Job = () => {
  const dispatch = useDispatch();
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fetch all jobs
  const fetchAllJobs = async () => {
    try {
      dispatch(showLoading());
      setLoading(true);
      const res = await getAllJobsApi({ ...selectedFilters, searchTerm });
      if (res.success) {
        setJobs(res.data);
        setLoading(false);
        dispatch(hideLoading());
      }
    } catch (err) {
      dispatch(hideLoading());
      setLoading(false);
      showErrorToast(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, searchTerm]);

  // Toggle mobile filter section
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  // Filters
  const filters = [
    {
      id: "title",
      name: "Most Popular Searches",
      options: [
        { value: "Frontend Developer", label: "Frontend Developer" },
        { value: "Full Stack Developer", label: "Full Stack Developer" },
        { value: "Data Analyst", label: "Data Analyst" },
      ],
    },
    {
      id: "location",
      name: "Popular Locations",
      options: [
        { value: "Delhi, India", label: "Delhi, India" },
        { value: "Mumbai, India", label: "Mumbai, India" },
        { value: "Bengaluru, India", label: "Bengaluru, India" },
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
        { value: "0-100000", label: "0 - 1 lpa" },
        { value: "100000-300000", label: "1 lpa - 3 lpa" },
        { value: "300001-1000000", label: "3 lpa - 10 lpa" },
        { value: "1000001-2000000", label: "10 lpa - 20 lpa" },
        { value: "2000001+", label: "20 lpa+" },
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

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-100 dark:bg-gray-800 mt-0 md:mt-12 pb-6">
      <main className="mx-auto px-6 md:px-12">
        <div className="pt-8 md:grid md:grid-cols-5 md:gap-x-8 relative">
          {/* Mobile Filter Drawer */}
          <div
            className={`md:hidden fixed inset-0 z-50 transform ${
              isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 bg-gray-900 bg-opacity-50`}
          >
            <div className="w-3/5 bg-white dark:bg-gray-800 h-full shadow-lg max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center p-4 bg-indigo-600 text-white">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={toggleMobileFilter}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                {filters.map((section, sectionIdx) => (
                  <div
                    key={section.id}
                    className={sectionIdx === 0 ? null : "pt-10"}
                  >
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900 flex justify-between items-center dark:text-white">
                        {section.name}
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
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
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
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:text-white dark:border-gray-700"
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600 cursor-pointer dark:text-white"
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
              </div>
            </div>
          </div>

          {/* Filter for desktop */}
          <motion.aside
            className="bg-white dark:bg-gray-700 pl-8 pr-2 py-7 rounded-lg shadow-lg hidden md:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h2 className="text-4xl mb-6 ml-10 text-indigo-700 font-semibold font-playfair dark:text-white">
              Filters
            </h2>
            <form className="space-y-8 divide-y divide-gray-200 max-h-[32rem] overflow-y-auto">
              {filters.map((section, sectionIdx) => (
                <div
                  key={section.id}
                  className={sectionIdx === 0 ? null : "pt-10"}
                >
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900 flex justify-between items-center font-medium font-merriweather dark:text-white">
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:text-white dark:border-gray-700"
                            />
                            <label
                              htmlFor={`${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600 cursor-pointer dark:text-white"
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
          </motion.aside>
          {/* Job Cards Section */}
          <div className="md:col-span-4">
            <div className="mb-4 flex items-center justify-between">
              {/* Mobile Filter Button */}
              <button
                className="md:hidden p-2 bg-indigo-600 text-white rounded-lg focus:outline-none shadow-md"
                onClick={toggleMobileFilter}
              >
                <FunnelIcon title="Filter" className="h-6 w-6" />
              </button>
              <h2 className="text-sm md:text-lg font-semibold font-merriweather text-gray-700 dark:text-white">
                Search Results: {filteredJobs.length}
              </h2>
              {/* Search Bar */}
              <motion.input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search jobs by title..."
                className="text-xs md:text-base p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-gray-800 dark:bg-gray-700 dark:text-white transition-shadow duration-300 shadow-sm hover:shadow-md"
                initial={{ width: "0%" }}
                animate={{ width: "43%" }}
                transition={{ delay: 0.1, duration: 0.7, ease: "easeInOut" }}
              />
            </div>

            {/* Job Listings */}
            <div>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 max-h-[36rem] overflow-y-auto">
                  {/* Display skeletons while loading */}
                  {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <JobsCardSkeleton key={index} />
                  ))}
                </div>
              ) : filteredJobs.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 max-h-[36rem] overflow-y-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    staggerChildren: 0.2,
                  }}
                >
                  {filteredJobs.map((job, index) => (
                    <JobComponent key={index} job={job} />
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 mt-0 md:mt-20 dark:bg-gray-800">
                  <MagnifyingGlassIcon className="h-20 w-20 text-indigo-600 mb-6 dark:text-indigo-900" />
                  <p className="text-2xl font-semibold text-gray-700 mb-4 font-openSans dark:text-white">
                    No jobs found!
                  </p>
                  <p className="text-gray-500 mb-6 text-center font-poppins dark:text-white">
                    We could not find any jobs matching your criteria. Try
                    adjusting your search or filter settings.
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
