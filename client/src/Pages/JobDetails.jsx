import { getJobDetailsApi } from "@/api/api";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [jobDetails, setJobDetails] = useState("");

  // FETCH JOB DETAILS BY JOB ID
  const fetchJobDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getJobDetailsApi(id);
      if (res.success) {
        setJobDetails(res.data);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  console.log(jobDetails);

  return (
    <>
      <div className="mt-16">Job Details</div>
    </>
  );
};

export default JobDetails;
