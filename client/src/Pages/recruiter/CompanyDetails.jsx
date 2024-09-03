import { deleteCompanyApi, getCompanyDetailsByIdApi } from "@/api/api";
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import JobComponent from "@/components/JobComponent";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyForm from "@/components/CompanyForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";

const CompanyDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch Company Details by Company ID
  const fetchCompanyDetailsById = async () => {
    try {
      dispatch(showLoading());
      const res = await getCompanyDetailsByIdApi(id);
      dispatch(hideLoading());
      setLoading(false);
      if (res.success) {
        setCompany(res.data);
      }
    } catch (err) {
      setLoading(false);
      dispatch(hideLoading());
      showErrorToast(err?.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    fetchCompanyDetailsById();
  }, [id]);

  // Handle the form display (edit and update form)
  const handleAddOrEditCompany = (company = null) => {
    setSelectedCompany(company);
    setShowForm(true);
  };

  // ******* DELTE COMPANY *********/
  const handleDeleteCompany = async () => {
    try {
      dispatch(showLoading());
      const res = await deleteCompanyApi(id);
      dispatch(hideLoading());
      if (res.success) {
        showSuccessToast("Company deleted successfully.");
        setShowDeleteDialog(false);
        navigate("/recruiter/company");
      }
    } catch (err) {
      dispatch(hideLoading());
      showErrorToast(err?.response?.data?.message || "An error occurred.");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            {/* Company Header Skeleton */}
            <div className="p-8 flex flex-col md:flex-row">
              {/* Company Details Skeleton */}
              <div className="md:w-2/3 mb-6 md:mb-0">
                <Skeleton className="h-10 w-1/2 mb-4" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-4" />
              </div>

              {/* Company Logo Skeleton */}
              <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <Skeleton className="h-44 w-44 rounded-full" />
              </div>
            </div>

            {/* Owner Details Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 border-t border-gray-200 dark:border-gray-600">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                <Skeleton className="h-8 w-1/2" />
              </h2>
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 md:ml-20 flex justify-center mb-6 md:mb-0">
                  <Skeleton className="h-32 w-32 rounded-full" />
                </div>
                <div className="md:w-2/3">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>

            {/* Open Jobs Skeleton */}
            <div className="p-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                <Skeleton className="h-8 w-1/2" />
              </h2>
              <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-4 md:py-10 mt-0 md:mt-8">
      {showForm ? (
        <div className="px-4 md:px-8">
          <CompanyForm
            setShowForm={setShowForm}
            onRefresh={fetchCompanyDetailsById}
            company={selectedCompany}
            buttonName={selectedCompany ? "Update Company" : "Add Company"}
          />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg relative">
            {/* Edit and Delete Buttons */}
            {user?._id === company?.ownerId._id && (
              <div className="absolute top-4 right-2 flex space-x-2">
                <button
                  onClick={() => handleAddOrEditCompany(company)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-medium shadow-md transition"
                >
                  Edit Company
                </button>

                {/* Button to open the delete dialog */}
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-medium shadow-md transition"
                  onClick={() => setShowDeleteDialog(true)} // Open the dialog
                >
                  Delete Company
                </button>
              </div>
            )}

            {/* Dialog Component */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogOverlay />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Company</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this company? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transition"
                    onClick={() => setShowDeleteDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                    onClick={handleDeleteCompany}
                  >
                    Confirm Delete
                  </button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Company Header */}
            <div className="p-8 flex flex-col md:flex-row">
              {/* Company Details */}
              <div className="md:w-2/3 mb-6 mt-6 md:mt-0 md:mb-0">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                  {company?.companyName || "Company Name"}
                </h1>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mt-4">
                  {company?.description || "No description available."}
                </p>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-400">
                      Location:
                    </span>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      {company?.location || "Location not specified"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-400">
                      Website:
                    </span>
                    <a
                      href={company?.website}
                      className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company?.website || "Not specified"}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-400">
                      Email:
                    </span>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      {company?.email || "Not specified"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-400">
                      Industry:
                    </span>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      {company?.industry || "Not specified"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-400">
                      Company Size:
                    </span>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      {company?.companySize || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Logo */}
              <div className="md:w-1/3 flex justify-center md:mt-12">
                <Avatar className="h-44 w-44 border-4 border-gray-300 dark:border-gray-600 transition-transform transform hover:scale-105">
                  <AvatarImage
                    src={company?.logo}
                    alt={company?.companyName}
                    className="object-cover rounded-lg"
                  />
                  <AvatarFallback className="text-7xl">
                    {company?.companyName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Owner Details */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 border-t border-gray-200 dark:border-gray-600">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                Owner Details
              </h2>
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 md:ml-20 flex justify-center mb-6 md:mb-0">
                  <Avatar className="h-32 w-32 border-4 border-gray-300 dark:border-gray-600 transition-transform transform hover:scale-105">
                    <AvatarImage
                      src={company?.ownerId?.profilePhoto}
                      alt={company?.ownerId?.name}
                      className="object-cover rounded-full"
                    />
                    <AvatarFallback className="text-5xl">
                      {company?.ownerId?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                    {company?.ownerId?.name || "Owner Name"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {company?.ownerId?.bio || "No bio available"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    <span className="font-semibold">Email:</span>{" "}
                    {company?.ownerId?.email || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Open Jobs */}
            <div className="p-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                Open Jobs
              </h2>
              <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {company?.openJobs?.length > 0 ? (
                  company.openJobs.map((job) => (
                    <JobComponent key={job?._id} job={job} />
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">
                    No open jobs at the moment.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
