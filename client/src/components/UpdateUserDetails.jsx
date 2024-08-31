import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PropTypes from "prop-types";
import UserProfileForm from "./UserProfileForm";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import ResumeUpload from "./ResumeUpload";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { updatedUserProfileDetailsApi } from "@/api/api";
import { setUser } from "@/redux/userSlice";
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";

const UpdateUserDetails = ({
  user,
  isProfileComplete,
  openDialog,
  setOpenDialog,
}) => {
  const dispatch = useDispatch();

  // Initialize Experience
  const initializeExperience = (experienceData) => {
    return experienceData.map((exp) => ({
      ...exp,
      startDate: exp.startDate ? new Date(exp.startDate) : null,
      endDate: exp.endDate ? new Date(exp.endDate) : null,
    }));
  };

  // Initialize Education
  const initializeEducation = (educationData) => {
    return educationData.map((edu) => ({
      ...edu,
      startDate: edu.startDate ? new Date(edu.startDate) : null,
      endDate: edu.endDate ? new Date(edu.endDate) : null,
    }));
  };

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
    skills: user?.skills || [],
    location: user?.location || "",
    resume: user?.resume || null,
    resumeName: user?.resumeName || "",
    totalExperienceYears: user?.totalExperienceYears || "",
    experience: initializeExperience(user?.experience || []),
    education: initializeEducation(user?.education || []),
  });

  // Handle all input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Resume file on change
  const handleFileChange = (file, fileName) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: file,
      resumeName: fileName,
    }));
  };

  // Handle Experience
  const handleAddExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        {
          company: "",
          jobTitle: "",
          startDate: new Date(),
          endDate: new Date(),
          isCurrent: false,
          employmentType: "Full-time",
        },
      ],
    }));
  };

  // Handle add eduction
  const handleAddEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: new Date(),
          endDate: new Date(),
          isCurrent: false,
        },
      ],
    }));
  };

  // Handle Remove Education Field
  const handleRemoveEducation = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== index),
    }));
  };

  // Handle Remove Experience Field
  const handleRemoveExperience = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      experience: prevData.experience.filter((_, i) => i !== index),
    }));
  };

  // Handle Dates
  const handleDateChange = (index, field, value, type) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[type][index][field] = value;
      return updatedData;
    });
  };

  // Form Submit || Update user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await updatedUserProfileDetailsApi(formData);
      if (res.success) {
        dispatch(hideLoading());
        showSuccessToast(res.message);
        dispatch(setUser(res.user));
        setOpenDialog(false);
      }
    } catch (err) {
      dispatch(hideLoading());
      showErrorToast(err?.response?.data?.message);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-medium shadow-md transition">
          {isProfileComplete ? "Edit Profile" : "Update Profile"}
        </button>
      </DialogTrigger>
      <DialogContent className="w-[95%] md:w-[80%] lg:w-[60%] max-w-4xl mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-semibold font-merriweather border-b mb-2 md:mb-4 p-2">
            Edit Profile Details
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-h-[30rem] md:max-h-[35rem] overflow-y-auto px-2"
        >
          {/* User Profile (name, phone number, bio, skills, location, total year of exp) */}
          <UserProfileForm formData={formData} handleChange={handleChange} />

          {/* Resume Upload Field */}
          <ResumeUpload
            resume={formData.resume}
            resumeName={formData.resumeName}
            handleFileChange={handleFileChange}
          />

          {/* Experience Section */}
          <ExperienceSection
            experience={formData.experience}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleAddExperience={handleAddExperience}
            handleRemoveExperience={handleRemoveExperience}
          />

          {/* Education Section */}
          <EducationSection
            education={formData.education}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleAddEducation={handleAddEducation}
            handleRemoveEducation={handleRemoveEducation}
          />

          {/* Submit Button */}
          <div className="pt-5">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-md transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDetails;

UpdateUserDetails.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    bio: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    resume: PropTypes.string,
    resumeName: PropTypes.string,
    totalExperienceYears: PropTypes.number,
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        company: PropTypes.string,
        role: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
      })
    ),
    education: PropTypes.arrayOf(
      PropTypes.shape({
        degree: PropTypes.string,
        institution: PropTypes.string,
        graduationDate: PropTypes.string,
      })
    ),
  }),
  isProfileComplete: PropTypes.string,
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
};
