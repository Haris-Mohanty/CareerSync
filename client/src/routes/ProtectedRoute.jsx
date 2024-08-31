import { getUserApi } from "@/api/api";
import { showErrorToast } from "@/helper/toastHelper";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { clearUser, setUser } from "@/redux/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  //******** FETCH USER INFO ******/
  const fetchUserInfo = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserApi();
      dispatch(hideLoading());
      if (res.success) {
        dispatch(setUser(res.data));
      } else {
        setRedirect(true);
        dispatch(clearUser());
      }
    } catch (err) {
      dispatch(hideLoading());
      setRedirect(true);
      dispatch(clearUser());
      showErrorToast("Please login first to access this page");
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserInfo();
    }
  }, [user, dispatch]);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return user ? children : null;
};

export default ProtectedRoute;
