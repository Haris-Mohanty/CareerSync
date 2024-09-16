import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import {
  getAllApplicationsOfAJobApi,
  updateApplicationStatusApi,
} from "@/api/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "@/redux/spinnerSlice";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EyeIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";

const ReceivedApplications = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all applications of a job
  const fetchApplications = async () => {
    try {
      dispatch(showLoading());
      const res = await getAllApplicationsOfAJobApi(jobId);
      dispatch(hideLoading());
      if (res.success) {
        setApplications(res.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  //****** HANDLE UPDATE STATUS (ACCEPT || REJECT) ******/
  const handleUpdateStatus = async (id, status) => {
    try {
      dispatch(showLoading());
      const res = await updateApplicationStatusApi(id, status);
      dispatch(hideLoading());
      if (res.success) {
        showSuccessToast(res.message);
        fetchApplications();
      }
    } catch (err) {
      dispatch(hideLoading());
      showErrorToast(err?.response?.data?.message);
    }
  };

  // Show skeleton if loading
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            className="h-12 rounded-md w-full animate-pulse bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-400">
        No applications received yet.
      </p>
    );
  }

  return (
    <div className="mt-2">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-6">
        Received Applications
      </h2>

      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Sl No
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Applicant
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Location
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Experience
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Applied On
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {applications.map((application, index) => (
              <TableRow
                key={application._id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
              >
                <TableCell className="px-6 py-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                  {index + 1}
                </TableCell>

                {/* Applicant Info */}
                <TableCell className="px-6 py-4">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 border-2 border-gray-300 dark:border-gray-600">
                      <AvatarImage
                        src={application.applicant.profilePhoto}
                        alt={application.applicant.name}
                      />
                      <AvatarFallback>
                        {application.applicant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                        {application.applicant.name}
                      </h3>
                      {/* Email */}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {application.applicant.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Location */}
                <TableCell className="px-6 py-4 text-gray-900 dark:text-gray-300">
                  {application.applicant.location}
                </TableCell>

                {/* Experience Years */}
                <TableCell className="px-6 py-4 text-gray-900 dark:text-gray-300">
                  {application.applicant.totalExperienceYears || 0} Years
                </TableCell>

                {/* Applied On */}
                <TableCell className="px-6 py-4 text-gray-900 dark:text-gray-300">
                  {moment(application.createdAt).format("DD/MM/YYYY")}
                </TableCell>

                {/* Status */}
                <TableCell className="px-6 py-4 text-gray-900 dark:text-gray-300 capitalize">
                  {application.status}
                </TableCell>

                {/* Actions */}
                <TableCell className="px-6 py-4 text-center">
                  <div className="flex justify-center space-x-2">
                    {/* Always show the View button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(
                          `/view-user-details/${application.applicant._id}`,
                          {
                            state: {
                              isCreator: true,
                              status: application.status,
                            },
                          }
                        )
                      }
                    >
                      <EyeIcon
                        className="h-5 w-5 text-gray-600 dark:text-gray-300"
                        title="View Profile"
                      />
                    </Button>

                    {/* Accept and Reject buttons are always shown */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(application._id, "rejected")
                      } // Handle reject logic
                      disabled={application.status === "rejected"}
                      className={`${
                        application.status === "rejected"
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer text-red-500"
                      }`}
                    >
                      <XCircleIcon
                        className="h-5 w-5 text-red-500"
                        title="Reject"
                      />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(application._id, "accepted")
                      } // Handle accept logic
                      disabled={application.status === "accepted"}
                      className={`${
                        application.status === "accepted"
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      <CheckCircleIcon
                        className="h-5 w-5 text-green-500"
                        title="Accept"
                      />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Define propTypes for validation
ReceivedApplications.propTypes = {
  jobId: PropTypes.string.isRequired,
};

export default ReceivedApplications;
