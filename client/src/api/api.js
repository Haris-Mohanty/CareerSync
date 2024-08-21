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
