const AppliedJobs = ({ jobs }) => {
  console.log(jobs);
  return (
    <>
      <div>
        {jobs.map((job, index) => (
          <div>{job.title}</div>
        ))}
      </div>
    </>
  );
};

export default AppliedJobs;
