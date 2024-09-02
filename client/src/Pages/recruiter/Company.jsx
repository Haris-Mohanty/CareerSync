import { getCompanyDetailsByRecruiterApi } from "@/api/api";
import { showErrorToast } from "@/helper/toastHelper";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import CompanyComponent from "@/components/CompanyComponent";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <div className="bg-slate-100 dark:bg-gray-800 mt-0 md:mt-16 pb-6">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg md:text-2xl font-bold text-indigo-600 dark:text-indigo-300">
              Company Details
            </h1>
            {/* Add New Company Button */}
            <button
              className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-colors flex items-center text-sm md:text-base text-white px-2 md:px-4 py-2 rounded-lg shadow-md"
              onClick={() => navigate("/add-company")}
            >
              <PlusIcon className="h-5 w-5" />
              Add New Company
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
              {/* Display skeletons while loading */}
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md animate-pulse"
                >
                  Skeleton
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
              {company.map((company, index) => (
                <CompanyComponent key={index} company={company} />
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
      </div>
    </>
  );
};

export default Company;
