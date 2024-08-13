import { getUserApi } from "@/api/api";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { clearUser, setUser } from "@/redux/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
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
      <div>Home</div>
    </>
  );
};

export default Home;
