import { getUserInfoById } from "@/api/api";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import moment from "moment";
import {
  EnvelopeIcon,
  PhoneIcon,
  DocumentIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Skeleton } from "@/components/ui/skeleton";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { isCreator, status } = location.state || {};

  // Fetch user details by ID
  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserInfoById(id);
      dispatch(hideLoading());
      if (res.success) {
        setUser(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 mt-0 md:mt-16 shadow-lg rounded-lg bg-gray-50 dark:bg-gray-900">
        {/* User Profile Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Skeleton className="h-32 w-32 md:h-44 md:w-44 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="text-center md:text-left mt-4 md:mt-0">
              <Skeleton className="h-8 w-48 md:w-72 bg-gray-300 dark:bg-gray-700 mb-2" />
              <Skeleton className="h-4 w-32 md:w-48 bg-gray-300 dark:bg-gray-700 mb-2" />
              <Skeleton className="h-4 w-32 md:w-48 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-4 w-48 md:w-64 bg-gray-300 dark:bg-gray-700 mt-2" />
            </div>
          </div>

          {/* Accept and Reject Buttons Skeleton */}
          <div className="flex gap-4 mt-4 md:mt-20">
            <Skeleton className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg" />
            <Skeleton className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>

        {/* Contact Info & Resume Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              <Skeleton className="h-6 w-32 bg-gray-300 dark:bg-gray-700" />
            </h2>
            <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-700 mb-2" />
            <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-700" />
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              <Skeleton className="h-6 w-24 bg-gray-300 dark:bg-gray-700" />
            </h2>
            <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>

        {/* Skills Section Skeleton */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            <Skeleton className="h-6 w-24 bg-gray-300 dark:bg-gray-700" />
          </h2>
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-8 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-full w-24"
              />
            ))}
          </div>
        </div>

        {/* Experience Section Skeleton */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            <Skeleton className="h-6 w-32 bg-gray-300 dark:bg-gray-700" />
          </h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <Skeleton className="h-6 w-48 bg-gray-300 dark:bg-gray-700 mb-2" />
                <Skeleton className="h-4 w-32 bg-gray-300 dark:bg-gray-700 mb-2" />
                <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Education Section Skeleton */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            <Skeleton className="h-6 w-32 bg-gray-300 dark:bg-gray-700" />
          </h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <Skeleton className="h-6 w-48 bg-gray-300 dark:bg-gray-700 mb-2" />
                <Skeleton className="h-4 w-32 bg-gray-300 dark:bg-gray-700 mb-2" />
                <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 mt-0 md:mt-16 shadow-lg rounded-lg bg-gray-50 dark:bg-gray-900">
      {/* User Profile Header with Accept/Reject buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Avatar className="h-32 w-32 md:h-44 md:w-44 border-4 border-gray-300 dark:border-gray-600 transition-transform transform hover:scale-105">
            <AvatarImage
              src={user.profilePhoto}
              alt={user.name}
              className="object-cover rounded-lg"
            />
            <AvatarFallback className="text-7xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left mt-4 md:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              {user.bio}
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 flex justify-center md:justify-start items-center mt-2">
              <MapPinIcon className="h-5 w-5 mr-1" />
              {user.location}
            </p>
            {/* Total Experience Years */}
            <p className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 mt-2 flex justify-center md:justify-start items-center">
              <BriefcaseIcon className="h-5 w-5 mr-1" />
              {user.totalExperienceYears} year(s) of experience
            </p>
          </div>
        </div>

        {/* Application Status Message */}
        {isCreator && (
          <div className="flex gap-4 mt-4 md:mt-20">
            {status === "accepted" ? (
              <div className="px-4 py-2 bg-green-500 text-white rounded-lg">
                <p className="text-lg font-semibold">Application Accepted</p>
                <p className="text-sm">
                  You have accepted this candidates application.
                </p>
              </div>
            ) : status === "rejected" ? (
              <div className="px-4 py-2 bg-red-500 text-white rounded-lg">
                <p className="text-lg font-semibold">Application Rejected</p>
                <p className="text-sm">
                  You have rejected this candidates application.
                </p>
              </div>
            ) : status === "processing" ? (
              <div className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
                <p className="text-lg font-semibold">Application Processing</p>
                <p className="text-sm">
                  This candidates application is currently under review.
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Contact Info & Resume */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Info
          </h2>
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
            <EnvelopeIcon className="h-5 w-5 mr-2" />
            <strong>Email: </strong> {user.email}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <PhoneIcon className="h-5 w-5 mr-2" />
            <strong>Phone: </strong> {user.phoneNumber || "Not Provided"}
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Resume
          </h2>
          <a
            href={user.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400"
          >
            <DocumentIcon className="h-5 w-5 mr-2" />
            {user.resumeName}
          </a>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Experience
        </h2>
        <div className="space-y-4">
          {user.experience
            .slice()
            .reverse()
            .map((exp) => (
              <div
                key={exp._id}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                  {exp.jobTitle} at {exp.company}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {exp.employmentType}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {moment(exp.startDate).format("MMM YYYY")} -{" "}
                  {exp.isCurrent
                    ? "Present"
                    : moment(exp.endDate).format("MMM YYYY")}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Education
        </h2>
        <div className="space-y-4">
          {user.education
            .slice()
            .reverse()
            .map((edu) => (
              <div
                key={edu._id}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                  {edu.degree} in {edu.fieldOfStudy}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {edu.institution}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {moment(edu.startDate).format("MMM YYYY")} -{" "}
                  {edu.isCurrent
                    ? "Present"
                    : moment(edu.endDate).format("MMM YYYY")}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
