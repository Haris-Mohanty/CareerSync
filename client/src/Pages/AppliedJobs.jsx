import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";

const AppliedJobs = ({ jobs }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <TableCaption className="text-sm mt-8 text-gray-600 dark:text-gray-400">
            A list of your applied jobs.
          </TableCaption>
          <TableHeader className="bg-gray-100 dark:bg-gray-700">
            <TableRow>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                #
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Job Title
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Job Location
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Job Type
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Company Name
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Application Date
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, index) =>
              job.applications.map((application) => (
                <TableRow
                  key={application._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {job.title}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {job.location}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {job.jobType}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {job.company.companyName}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {moment(application.applicationDate).format("LL")}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        application.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : application.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
