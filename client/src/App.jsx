/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import Job from "./Pages/Job";
import About from "./Pages/About";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import { Toaster } from "@/components/ui/sonner";
import Spinner from "./components/Spinner";
import Footer from "./components/Footer";
import PublicRoute from "./routes/PublicRoute";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "./redux/spinnerSlice";
import { getUserApi } from "./api/api";
import { clearUser, setUser } from "./redux/userSlice";
import { useEffect } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePage from "./Pages/ProfilePage";
import Notification from "./Pages/Notification";
import JobDetails from "./Pages/JobDetails";
import Company from "./Pages/recruiter/Company";
import CompanyDetails from "./Pages/recruiter/CompanyDetails";
import RecruiterJobs from "./Pages/recruiter/RecruiterJobs";
import RecruiterJobsDetails from "./Pages/recruiter/RecruiterJobsDetails";
import UserDetails from "./Pages/UserDetails";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //******** Fetch User Info ****/
  const fetchUserInfo = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserApi();
      dispatch(hideLoading());
      if (res.success) {
        dispatch(setUser(res.data));
      } else {
        dispatch(clearUser());
      }
    } catch (err) {
      dispatch(hideLoading());
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserInfo();
    }
  }, [user, dispatch]);

  return (
    <>
      <Spinner />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/jobs/details/:id" element={<JobDetails />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/view-profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/company"
          element={
            <ProtectedRoute>
              <Company />
            </ProtectedRoute>
          }
        />
        <Route path="/view-company-details/:id" element={<CompanyDetails />} />
        <Route path="/view-user-details/:id" element={<UserDetails />} />
        <Route
          path="/recruiter/view-job-details/:id"
          element={
            <ProtectedRoute>
              <RecruiterJobsDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/job"
          element={
            <ProtectedRoute>
              <RecruiterJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
