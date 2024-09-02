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
import { motion } from "framer-motion";
import displayInr from "@/helper/IndianCurrency";

const cardVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const SavedJobs = ({ jobs }) => {
  return (
    <>
      <motion.div
        className="overflow-x-auto"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
      >
        <Table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <TableCaption className="text-sm mt-8 text-gray-600 dark:text-gray-400">
            A list of your saved jobs.
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
                Company Name
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Job Location
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Job Type
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Salary
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Created Date
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Deadline
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Job Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, index) => {
              const isDeadlinePassed = moment().isAfter(moment(job.deadline));
              const jobStatus = isDeadlinePassed ? "Closed" : job.status;

              return (
                <TableRow
                  key={job._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {job.title}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {job.company.companyName}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {job?.workType === "Remote"
                      ? "Remote"
                      : job?.workType === "Hybrid"
                      ? `${job?.location || "Location not specified"} (Hybrid)`
                      : job?.location || "India"}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {job.jobType}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {displayInr(job.salary)}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {moment(job.applicationDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    {moment(job.deadline).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-gray-900 dark:text-gray-300 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        jobStatus === "Open"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {jobStatus}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>
    </>
  );
};

export default SavedJobs;

SavedJobs.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ),
};
