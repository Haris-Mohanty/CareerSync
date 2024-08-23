import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { toast } from "sonner";
import { updateUserProfilePhotoApi } from "@/api/api";
import { useState } from "react";
import uploadImage from "@/helper/UploadImage";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");

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
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-5xl">
          <div className="p-6 md:p-8 flex items-center space-x-6">
            {/* Avatar with edit button */}
            <div className="relative">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-4 ring-white dark:ring-gray-800 shadow-lg">
                <AvatarImage src={profilePhoto} alt="Profile Image" />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
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

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </h3>

              <div className="mt-2 space-y-1">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <PhoneIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  <span>{user?.phoneNumber}</span>
                </div>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <EnvelopeIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
