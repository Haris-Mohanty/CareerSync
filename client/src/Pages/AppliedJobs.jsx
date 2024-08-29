import PropTypes from "prop-types";

const AppliedJobs = ({ jobs }) => {
  console.log(jobs);
  return (
    <>
      <div>
        {jobs.map((job) => (
          <div key={job._id}>{job.title}</div>
        ))}
      </div>
    </>
  );
};

export default AppliedJobs;

AppliedJobs.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ),
};
