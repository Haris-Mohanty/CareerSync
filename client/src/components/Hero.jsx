import heroImage from "@/assets/hero.png";
import {
  UserCircleIcon,
  BuildingOffice2Icon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import user1 from "@/assets/user1.jpg";
import user2 from "@/assets/user2.jpg";
import user3 from "@/assets/user3.jpg";
import { useState } from "react";
import { motion } from "framer-motion";

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handlePopularSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <section className="bg-slate-100 pt-8 md:p-1 dark:bg-gray-700">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-10">
          {/* Right Section - Image */}
          <motion.div
            className="order-1 md:order-2 md:w-3/4 flex justify-center md:justify-end mb-1 md:mb-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img
              src={heroImage}
              alt="Hero"
              className="max-w-full h-auto md:w-full md:h-auto"
            />
          </motion.div>

          {/* Left Section */}
          <motion.div
            className="md:order-1 md:w-1/2 md:text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center ml-4 md:ml-0 md:justify-start mb-2">
              <Avatar className="-mr-1">
                <AvatarImage src={user1} alt="User 1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="-mr-1">
                <AvatarImage src={user2} alt="User 2" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src={user3} alt="User 3" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
              <p className="ml-1 text-gray-600 text-sm font-bold font-poppins dark:text-gray-300">
                100+ Regular Users
              </p>
            </div>

            <h1 className="text-xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight font-raleway ml-4 md:ml-0">
              Secure Your Career
              <br className="hidden lg:block" />
              Path. You’re Worth It.
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-xs md:text-base mb-4 font-lato ml-4 md:ml-0">
              Empowering Ambitious Job Seekers with Comprehensive Tools and
              Resources to Discover, Apply, and Secure Their Dream.
            </p>

            {/* Search Bar */}
            <div className="flex items-center justify-center lg:justify-start bg-white dark:bg-gray-600 rounded-full shadow-lg px-4 py-1 md:py-3 mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job Title Keywords"
                className="flex-grow text-xs md:text-base p-2 text-gray-600 dark:text-gray-200 dark:bg-gray-600 focus:outline-none font-poppins"
              />
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-xs md:text-base text-white px-2 md:px-4 py-1 md:py-2 rounded-full hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-colors font-merriweather duration-300"
              >
                FIND JOBS
              </motion.button>
            </div>

            {/* Popular Search Section */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start font-poppins font-medium text-xs md:text-base mb-4 md:mb-0">
              <span
                onClick={() => handlePopularSearch("UI/UX")}
                className="bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-100 px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-700"
              >
                UI/UX
              </span>
              <span
                onClick={() => handlePopularSearch("Web Development")}
                className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-100 px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-700"
              >
                Web Development
              </span>
              <span
                onClick={() => handlePopularSearch("Human Resources")}
                className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-100 px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-700"
              >
                Human Resources
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <div className="bg-slate-200 dark:bg-gray-800 p-4 md:p-6 mx-auto flex justify-around text-center px-4 md:px-4">
        <motion.div
          className="flex items-center w-full md:w-auto"
          initial="hidden"
          animate="visible"
          variants={statVariants}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="bg-white dark:bg-gray-400 rounded-full p-1 md:p-4 mr-1">
            <UserCircleIcon className="h-5 w-5 md:h-10 md:w-10 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm md:text-2xl font-bold text-gray-800 dark:text-white font-openSans">
              7000+
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm font-merriweather">
              Workers
            </p>
          </div>
        </motion.div>
        <motion.div
          className="flex items-center w-full md:w-auto"
          initial="hidden"
          animate="visible"
          variants={statVariants}
          transition={{ duration: 1, delay: 1.7 }}
        >
          <div className="bg-white dark:bg-gray-400 rounded-full p-1 md:p-4 mr-1">
            <BuildingOffice2Icon className="h-5 w-5 md:h-10 md:w-10 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm md:text-2xl font-bold text-gray-800 dark:text-white font-openSans">
              3000+
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm font-merriweather">
              Companies
            </p>
          </div>
        </motion.div>
        <motion.div
          className="flex items-center w-full md:w-auto"
          initial="hidden"
          animate="visible"
          variants={statVariants}
          transition={{ duration: 1, delay: 1.9 }}
        >
          <div className="bg-white dark:bg-gray-400 rounded-full p-1 md:p-4 mr-1">
            <GlobeAsiaAustraliaIcon className="h-5 w-5 md:h-10 md:w-10 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm md:text-2xl font-bold text-gray-800 dark:text-white font-openSans">
              1500+
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm font-merriweather">
              Cities
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;
