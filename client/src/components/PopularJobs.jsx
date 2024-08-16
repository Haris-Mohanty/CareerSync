import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  MapPinIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const cardVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const PopularJobs = () => {
  return (
    <div className="bg-slate-100 py-5 px-5 md:px-20">
      <div className="text-center mb-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
        >
          Popular <span className="text-indigo-600">Jobs</span>
        </motion.h2>
        <motion.p
          className="text-gray-500 mt-2 text-sm md:text-base"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          transition={{ delay: 0.2 }}
        >
          Check out featured jobs from top companies around the globe and apply
          now
        </motion.p>
      </div>

      <div className="space-y-6">
        {/* Job Card */}
        <motion.div
          className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 rounded-lg p-4 md:p-6 flex flex-col md:flex-row justify-between items-center shadow-md"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="w-14 h-14">
              <AvatarImage
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdTNT-Q0TD9o3z_Ii0EiGkadVFPYnWYSVnig&s"
                alt="Company Logo"
                className="object-cover"
              />
              <AvatarFallback>LOGO</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-base md:text-xl font-semibold text-gray-800">
                Junior Graphic Designer
              </h3>
              <div className="text-sm text-gray-500 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-1">
                <span className="flex items-center space-x-1">
                  <MapPinIcon className="h-4 w-4 text-indigo-700" />
                  <span>Remote | IN</span>
                </span>
                <span className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4 text-indigo-700" />
                  <span>8 Hours</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CurrencyRupeeIcon className="h-4 w-4 text-indigo-700" />
                  <span>3,00,000 INR</span>
                </span>
                <span className="flex items-center space-x-1">
                  <RssIcon className="h-4 w-4 text-indigo-700" />
                  <span>Mid-Level Experience</span>
                </span>
                <span className="bg-indigo-200 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-lg">
                  Full Time
                </span>
              </div>
            </div>
          </div>
          <motion.button
            className="text-white text-sm px-3 md:px-5 py-2 md:py-3 text-base rounded-lg bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-colors font-raleway font-medium w-full md:w-auto"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            Apply Now
          </motion.button>
        </motion.div>

        <div className="flex justify-center mt-8">
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            <Button className="text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:via-indigo-800 hover:to-indigo-900 transition duration-300 rounded-lg px-6 py-3">
              See More →
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PopularJobs;
