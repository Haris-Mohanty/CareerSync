import { getUserApi } from "@/api/api";
import Hero from "@/components/Hero";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { clearUser, setUser } from "@/redux/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import JobCategory from "./JobCategory";
import PopularJobs from "@/components/PopularJobs";

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
      toast.error(err.message);
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
    </>
  );
};

export default Home;
