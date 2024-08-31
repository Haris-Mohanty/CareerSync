import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import uploadImage from "@/helper/UploadImage";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";

const ResumeUpload = ({ resume, resumeName, handleFileChange }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(resume ? null : resume); // Use `null` if `resume` prop is a URL
  const [fileName, setFileName] = useState(resumeName || "");
  const [fileUrl, setFileUrl] = useState(resume || null); // State to store the file URL

  // Effect to update file URL for newly uploaded files
  useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url); // Cleanup on unmount
    }
  }, [file]);

  const handleFileInputChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const isValidFileType = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(selectedFile.type);

      if (!isValidFileType) {
        showErrorToast("Please upload a valid file (.pdf, .doc, .docx)");
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);

      try {
        dispatch(showLoading());
        // Upload the selected resume to Cloudinary
        const uploadedFile = await uploadImage(selectedFile);
        dispatch(hideLoading());
        showSuccessToast("Resume uploaded successfully!");
        const jpgUrl = uploadedFile.secure_url.replace(/\.\w+$/, ".jpg"); // Convert to jpg
        handleFileChange(jpgUrl, selectedFile.name);
        setFileUrl(jpgUrl); // Update fileUrl with the uploaded URL
      } catch (err) {
        showErrorToast("Error uploading file: " + err.message);
        dispatch(hideLoading());
      }
    }
  };

  const handleNameChange = (e) => {
    const newFileName = e.target.value;
    setFileName(newFileName);
    handleFileChange(file, newFileName);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setFileUrl(null); // Clear the file URL
    handleFileChange(null, "");
  };

  const handleViewFile = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <div className="space-y-4">
      <label
        htmlFor="resume"
        className="block text-sm md:text-base font-semibold font-lato text-gray-700 dark:text-gray-300"
      >
        Upload Resume
      </label>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <input
          type="file"
          id="resume"
          name="resume"
          className="text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInputChange}
        />
        <div className="flex flex-col">
          <label
            htmlFor="resumeName"
            className="block text-sm md:text-base font-semibold font-lato text-gray-700 dark:text-gray-300"
          >
            Resume Name
          </label>
          <input
            type="text"
            id="resumeName"
            name="resumeName"
            value={fileName}
            onChange={handleNameChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
            placeholder="Enter resume name"
          />
        </div>
      </div>
      {(fileUrl || fileName) && (
        <div className="flex items-center mt-2 space-x-2">
          <button
            type="button"
            onClick={handleRemoveFile}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          {fileUrl && (
            <button
              type="button"
              onClick={handleViewFile}
              className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <EyeIcon className="h-4 w-4" aria-hidden="true" />
              <span className="ml-1">View File</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

ResumeUpload.propTypes = {
  resume: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(File),
    PropTypes.oneOf([null]),
  ]),
  resumeName: PropTypes.string,
  handleFileChange: PropTypes.func.isRequired,
};

export default ResumeUpload;
