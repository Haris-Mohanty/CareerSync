import { getUserApi } from "@/api/api";
import Hero from "@/components/Hero";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { clearUser, setUser } from "@/redux/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCategory from "./JobCategory";
import PopularJobs from "@/components/PopularJobs";
import AuthSection from "@/components/AuthSection";

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
      <Hero />
      <JobCategory />
      <PopularJobs />
      <AuthSection />
    </>
  );
};

export default Home;
