import PropTypes from "prop-types";

const JobComponent = ({ job }) => {
  return (
    <>
      <div className="bg-white shadow-lg min-h-[15rem] p-4 rounded-lg">
        <h3 className="text-xl font-semibold">{job.title}</h3>
        <h3 className="text-sm font-semibold">{job.jobType}</h3>
        <h3 className="text-sm font-semibold">{job.salary}</h3>
        <h3 className="text-sm font-semibold">{job.experienceLevel}</h3>
        <button className="mt-2 text-indigo-600">View Details</button>
      </div>
    </>
  );
};

export default JobComponent;

// PropTypes validation
JobComponent.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    experienceLevel: PropTypes.string.isRequired,
  }).isRequired,
};
