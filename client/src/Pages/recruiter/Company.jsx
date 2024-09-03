import { getCompanyDetailsByRecruiterApi } from "@/api/api";
import { showErrorToast } from "@/helper/toastHelper";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import CompanyComponent from "@/components/CompanyComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@/components/ui/avatar";
import CompanyForm from "@/components/CompanyForm";

const Company = () => {
  const dispatch = useDispatch();
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchCompanyDetails = async () => {
    try {
      dispatch(showLoading());
      setLoading(true);
      const res = await getCompanyDetailsByRecruiterApi();
      dispatch(hideLoading());
      setLoading(false);
      if (res.success) {
        setCompany(res.data);
      } else {
        setCompany([]); // Handle unexpected API response
        showErrorToast("Unexpected response format from server.");
      }
    } catch (err) {
      setLoading(false);
      dispatch(hideLoading());
      showErrorToast(err?.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  // Handle the form display
  const handleAddOrEditAddress = (company = null) => {
    setSelectedCompany(company);
    setShowForm(true);
  };

  return (
    <>
      <div className="bg-slate-100 dark:bg-gray-800 mt-0 md:mt-16 pb-6">
        {showForm ? (
          <div className="p-4 md:p-8">
            <CompanyForm
              setShowForm={setShowForm}
              onRefresh={fetchCompanyDetails}
              company={selectedCompany}
              buttonName={selectedCompany ? "Update Company" : "Add Company"}
            />
          </div>
        ) : (
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                Companies
              </h1>
              {/* Add New Company Button */}
              <button
                className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-colors flex items-center text-sm md:text-base text-white px-2 md:px-4 py-2 rounded-lg shadow-md"
                onClick={() => handleAddOrEditAddress()}
              >
                <PlusIcon className="h-5 w-5" />
                Add New Company
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
                {/* Display skeletons while loading */}
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div key={index}>
                    <div className="bg-gradient-to-r from-white to-gray-100 shadow-xl min-h-[20rem] px-8 py-6 rounded-xl space-y-6 dark:from-gray-800 dark:to-gray-900 dark:shadow-2xl hover:shadow-2xl transition-shadow duration-300 animate-pulse">
                      {/* Top Row: Days Ago */}
                      <div className="flex justify-between items-center">
                        <span className="bg-blue-200 dark:bg-blue-700 rounded w-12 h-4 block"></span>
                      </div>

                      {/* Company Logo and Info */}
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16 shadow-md">
                          <Skeleton className="h-16 w-16 rounded-full" />
                        </Avatar>
                        <div>
                          <div className="bg-gray-200 dark:bg-gray-600 rounded w-36 h-6 mb-2"></div>
                          <div className="bg-gray-200 dark:bg-gray-600 rounded w-24 h-4"></div>
                        </div>
                      </div>

                      {/* Company Description */}
                      <div className="mt-2">
                        <div className="bg-gray-200 dark:bg-gray-600 rounded w-full h-4 mb-2"></div>
                        <div className="bg-gray-200 dark:bg-gray-600 rounded w-full h-4 mb-2"></div>
                        <div className="bg-gray-200 dark:bg-gray-600 rounded w-3/4 h-4"></div>
                      </div>

                      {/* Additional Company Details */}
                      <div className="flex mt-4 justify-between items-center">
                        <div className="bg-teal-200 dark:bg-teal-700 rounded-full w-20 h-6"></div>
                        <div className="bg-purple-200 dark:bg-purple-700 rounded-full w-16 h-6"></div>
                      </div>

                      {/* Website Link */}
                      <div>
                        <div className="bg-indigo-200 dark:bg-indigo-700 rounded w-24 h-4"></div>
                      </div>

                      {/* View Full Details Button */}
                      <div className="mt-6 flex justify-center">
                        <div className="bg-indigo-200 dark:bg-indigo-700 rounded-full w-32 h-8"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : company.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  staggerChildren: 0.2,
                }}
              >
                {company.map((comp, index) => (
                  <CompanyComponent
                    key={index}
                    company={comp}
                    onEdit={() => handleAddOrEditAddress(comp)}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 mt-0 md:mt-20 dark:bg-gray-800">
                <MagnifyingGlassIcon className="h-20 w-20 text-indigo-600 mb-6 dark:text-indigo-900" />
                <p className="text-2xl font-semibold text-gray-700 mb-4 font-openSans dark:text-white">
                  No companies found!
                </p>
                <p className="text-gray-500 mb-6 text-center font-poppins dark:text-white">
                  We could not find any companies! Please add a new company for
                  posting jobs.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Company;
