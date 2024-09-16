import { getUserInfoById } from "@/api/api";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  //********* FETCH USER DEATILS BY ID ********/
  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserInfoById(id);
      dispatch(hideLoading());
      if (res.success) {
        console.log(res);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <div className="mt-16">UserDetails</div>
    </>
  );
};

export default UserDetails;
