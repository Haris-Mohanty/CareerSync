/* eslint-disable no-useless-catch */
import axios from "axios";

//***************** REGISTER USER API ****************/
export const registerUserApi = async (data) => {
  try {
    const response = await axios.post("/user/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//***************** LOGIN USER API ****************/
export const loginUserApi = async (data) => {
  try {
    const response = await axios.post("/user/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//***************** GET USER API ****************/
export const getUserApi = async () => {
  try {
    const response = await axios.get("/user/get-user-info", {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//**************** USER LOGOUT API ****************/
export const logoutUserApi = async () => {
  try {
    const response = await axios.get("/user/logout", {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

//**************** GET ALL JOBS API ****************/
export const getAllJobsApi = async (filters = {}) => {
  try {
    const response = await axios.get("/job/get-all-jobs", {
      params: {
        title: filters.title,
        location: filters.location,
        jobType: filters.jobType,
        experienceLevel: filters.experienceLevel,
        salary: filters.salary,
        workType: filters.workType,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//*********** MARK ALL NOTIFICATIONS AS SEEN API **************/
export const markAllNotificationsAsSeenApi = async () => {
  try {
    const response = await axios.get("/user/mark-all-notifications-as-seen", {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//*********** DELETE ALL SEEN NOTIFICATIONS API **************/
export const deleteAllSeenNotificationsApi = async () => {
  try {
    const response = await axios.get("/user/delete-all-seen-notifications", {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//*********** UPDATE USER PROFILE PHOTO API **************/
export const updateUserProfilePhotoApi = async (profilePhoto) => {
  try {
    const response = await axios.put(
      "/user/update-profile-photo",
      { profilePhoto },
      { withCredentials: true }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//*********** UPDATE USER PROFILE DETAILS API **************/
export const updatedUserProfileDetailsApi = async (data) => {
  try {
    const response = await axios.put("/user/update-user-profile", data, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//*********** GET JOB DETAILS BY ID API **************/
export const getJobDetailsApi = async (id) => {
  try {
    const response = await axios.get(`/job/get-job-by-id/${id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//*********** SAVE JOB FOR LATER API **************/
export const saveJobForLaterApi = async (id) => {
  try {
    const response = await axios.post(
      `/job/save-job/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//*********** GET COMPANY DETAILS (RECRUITER) **************/
export const getCompanyDetailsByRecruiterApi = async () => {
  try {
    const response = await axios.get("/company/get-company-details", {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//*********** CREATE NEW COMPANY (RECRUITER) **************/
export const createCompanyApi = async (data) => {
  try {
    const response = await axios.post("/company/create-company", data, {
      withCredentials: true,
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//******** GET COMPANY DETAILS BY COMPANY ID (ALL) *************/
export const getCompanyDetailsByIdApi = async (id) => {
  try {
    const response = await axios.get(`/company/get-company-by-id/${id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//*************** UPDATE COMPANY DETAILS *****************/
export const updateCompanyDetailsApi = async (id, data) => {
  try {
    const response = await axios.put(
      `/company/update-company/${id}`,
      { ...data },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

//*************** DELETE COMPANY *****************/
export const deleteCompanyApi = async (id) => {
  try {
    const response = await axios.put(
      `/company/delete-company/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};
