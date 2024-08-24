import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
  BriefcaseIcon,
  MapPinIcon,
  DocumentIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { toast } from "sonner";
import { updateUserProfilePhotoApi } from "@/api/api";
import { useEffect, useState } from "react";
import uploadImage from "@/helper/UploadImage";
import moment from "moment";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");
  const [profileCompletion, setProfileCompletion] = useState(0);

  // Check if all required user details are available
  const isProfileComplete =
    user?.name &&
    user?.email &&
    user?.phoneNumber &&
    user?.location &&
    user?.resume &&
    user?.totalExperienceYears &&
    user?.skills?.length > 0 &&
    user?.experience?.length > 0 &&
    user?.education?.length > 0 &&
    profilePhoto;

  useEffect(() => {
    // Calculate the completion percentage based on filled fields
    let completedFields = 0;
    const totalFields = 10;

    if (user?.name) completedFields++;
    if (user?.email) completedFields++;
    if (user?.phoneNumber) completedFields++;
    if (user?.location) completedFields++;
    if (user?.resume) completedFields++;
    if (user?.totalExperienceYears) completedFields++;
    if (user?.skills?.length > 0) completedFields++;
    if (user?.experience?.length > 0) completedFields++;
    if (user?.education?.length > 0) completedFields++;
    if (profilePhoto) completedFields++;

    // Calculate the percentage
    const completionPercentage = Math.floor(
      (completedFields / totalFields) * 100
    );
    setProfileCompletion(completionPercentage);
  }, [user, profilePhoto]);

  // *********** HANDLE PROFILE PHOTO UPLOAD *******/
  const handleUploadProfilePhoto = async (e) => {
    const file = e.target.files[0];

    // Check if file exists
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    // Check if file size is under 300KB
    if (file.size > 300 * 1024) {
      toast.error("Please upload an image under 300KB.");
      return;
    }

    try {
      dispatch(showLoading());

      // Upload Image to Cloudinary
      const uploadImageCloudinary = await uploadImage(file);

      // Set the uploaded image URL to state
      setProfilePhoto(uploadImageCloudinary.secure_url);

      // Call API to update user profile photo
      const res = await updateUserProfilePhotoApi(
        uploadImageCloudinary.secure_url
      );
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message || "Failed to upload image.");
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-slate-100 dark:bg-gray-700 md:mt-16 px-4 md:px-0 py-4 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-7xl relative">
          {/* Edit or Update Profile Button */}
          <div className="flex justify-end p-4 absolute top-12 left-0 right-0">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-medium shadow-md transition">
              {isProfileComplete ? "Edit Profile" : "Update Profile"}
            </button>
          </div>

          {/* Profile Completion Progress Bar */}
          <div className="px-4 md:px-6">
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-4 mt-4">
              <div
                className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500 shadow-md"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-gray-500 dark:text-gray-400 mt-2">
              {profileCompletion}% Complete
            </p>
          </div>

          <div className="px-8 md:px-12 py-3 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
            {/* Avatar with edit button */}
            <div className="relative">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-4 ring-white dark:ring-gray-700 shadow-md">
                <AvatarImage src={profilePhoto} alt="Profile Image" />
                <AvatarFallback className="text-4xl text-indigo-700 font-bold">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 p-1 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition cursor-pointer">
                <PencilIcon className="h-5 w-5" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadProfilePhoto}
                />
              </label>
            </div>

            {/* User Information */}
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white font-merriweather">
                {user?.name}
              </h3>

              <p className="text-gray-500 text-sm md:text-base dark:text-gray-400 mt-2">
                {user?.bio || "Bio not provided"}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {/* Email and Phone */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <EnvelopeIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  <span>{user?.email || "Email not provided"}</span>
                </div>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <PhoneIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  <span>
                    {user?.phoneNumber || "Phone number not provided"}
                  </span>
                </div>

                {/* Location and Resume */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPinIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  <span>{user?.location || "Location not provided"}</span>
                </div>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <DocumentIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  {user?.resume ? (
                    <a
                      href={user.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 underline"
                    >
                      {user.resumeName || "Resume"}
                    </a>
                  ) : (
                    "Resume not provided"
                  )}
                </div>

                {/* Experience */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <BriefcaseIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  <span>
                    {user?.totalExperienceYears} year(s) of experience
                  </span>
                </div>

                {/* Role */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  {/* Replace the icon below with the appropriate one for role */}
                  <UserIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  <span className="capitalize">{user?.role}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Skills
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {user?.skills?.length > 0 ? (
                    user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No skills listed
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Experience
            </h4>
            <div className="mt-4 space-y-6">
              {user?.experience?.length > 0 ? (
                user.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-sm dark:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-semibold text-gray-900 dark:text-white">
                        {exp.jobTitle}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {moment(exp.startDate).format("MMM YYYY")} -{" "}
                        {exp.isCurrent
                          ? "Present"
                          : moment(exp.endDate).format("MMM YYYY")}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No experience added
                </p>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Education
            </h4>
            <div className="mt-4 space-y-6">
              {user?.education?.length > 0 ? (
                user.education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-sm dark:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-semibold text-gray-900 dark:text-white">
                        {edu.degree}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {moment(edu.startDate).format("MMM YYYY")} -{" "}
                        {edu.isCurrent
                          ? "Present"
                          : moment(edu.endDate).format("MMM YYYY")}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {edu.fieldOfStudy} at {edu.institution}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No education added
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
