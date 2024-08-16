import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import Job from "./Pages/Job";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
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
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/job"
          element={
            <ProtectedRoute>
              <Job />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
