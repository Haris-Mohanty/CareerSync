import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_APP_CLOUD_NAME_CLOUDINARY
}/upload`;

const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_APP_UPLOAD_PRESET_CLOUDINARY
    );

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw new Error("Error uploading image");
  }
};

// Export
export default uploadImage;
