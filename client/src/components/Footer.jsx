import logo from "../assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const leftSideVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};
const rightSideVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const lastVariants = {
  hidden: { opacity: 0, z: 100 },
  visible: { opacity: 1, z: 0, transition: { duration: 1.5 } },
};

const Footer = () => {
  return (
    <>
      <section className="pt-8 pb-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-24 pb-14 border-b-2 border-gray-200">
            {/* Left Side  */}
            <motion.div
              className="block w-full lg:max-w-full max-lg:mx-auto"
              variants={leftSideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.1 }}
            >
              <div className="flex flex-col gap-8 w-full lg:max-w-xs ">
                <img src={logo} alt="Career Sync" />
                <p className="text-base font-normal text-gray-600 max-[470px]:text-center dark:text-white">
                  Trusted in more than 50 companies &amp; 5 thousand customers.
                  Follow us on social media.
                </p>
                <div className="flex flex-col min-[470px]:flex-row max-[470px]:gap-4 items-center max-[470px]:justify-center">
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
                    <p className="text-gray-500 text-base font-normal ml-2 dark:text-white">
                      <span className="text-gray-900 font-medium dark:text-white">
                        1K+{" "}
                      </span>
                      Members Join
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side */}
            <motion.div
              className="w-full mx-auto flex flex-col min-[470px]:flex-row max-[470px]:items-center min-[470px]:justify-between gap-6 sm:gap-10 xl:gap-24"
              variants={rightSideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.1 }}
            >
              {/* Career Sync */}
              <div>
                <h6 className="text-lg font-medium text-gray-900 mb-7 max-[470px]:text-center dark:text-white">
                  CareerSync
                </h6>
                <ul className="flex flex-col max-[470px]:items-center gap-6">
                  <li>
                    <Link
                      to="/"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Products */}
              <div>
                <h6 className="text-lg font-medium text-gray-900 max-[470px]:text-center mb-7 dark:text-white">
                  Products
                </h6>
                <ul className="flex flex-col max-[470px]:items-center gap-6">
                  <li>
                    <Link
                      to="/job"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/job"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                    >
                      Add Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                    >
                      View Profile
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h6 className="text-lg font-medium text-gray-900 max-[470px]:text-center mb-7 dark:text-white">
                  Resources
                </h6>
                <ul className="flex flex-col max-[470px]:items-center gap-6">
                  <li>
                    <Link
                      to="/"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                    >
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                    >
                      Quick Start
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-indigo-600 focus-within:outline-0 focus-within:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                    >
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col-reverse gap-5 md:flex-row items-center first-letter:items-center justify-between pt-7"
            variants={lastVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            <p className="font-normal text-sm text-gray-500 dark:text-white">
              ©Career Sync 2024, All rights reserved.
            </p>
            <ul className="flex items-center gap-9">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0 dark:text-white dark:hover:text-indigo-700"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0 dark:text-white dark:hover:text-indigo-700"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0 dark:text-white dark:hover:text-indigo-700"
                >
                  Cookies
                </Link>
              </li>
            </ul>

            <div className="flex gap-5 items-center">
              <a
                href="https://www.github.com/Haris-Mohanty"
                className="text-gray-500 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.5c-5.22 0-9.5 4.28-9.5 9.5 0 4.23 2.73 7.82 6.51 9.1.48.09.66-.21.66-.48v-1.68c-2.68.58-3.24-1.29-3.24-1.29-.44-1.13-1.08-1.43-1.08-1.43-.89-.61.07-.6.07-.6 1.02.07 1.55 1.05 1.55 1.05.91 1.56 2.38 1.11 2.96.85.09-.66.35-1.11.64-1.36-2.22-.25-4.56-1.11-4.56-4.96 0-1.1.39-2.01 1.03-2.72-.1-.25-.45-1.27.1-2.63 0 0 .84-.27 2.74 1.02.8-.22 1.67-.33 2.53-.33.85 0 1.73.12 2.53.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.36.2 2.38.1 2.63.64.71 1.03 1.62 1.03 2.72 0 3.87-2.34 4.71-4.56 4.96.36.31.68.93.68 1.88v2.79c0 .27.18.58.66.48C19.77 19.82 22.5 16.23 22.5 12 22.5 6.78 18.22 2.5 12 2.5z" />
                </svg>
              </a>
              <a
                href="https://www.twitter.com/haris_mohanty"
                className="text-gray-500 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.54 10.54 0 0 1-3.04.83A5.17 5.17 0 0 0 22.4 1a10.37 10.37 0 0 1-3.2 1.23A5.2 5.2 0 0 0 16.95 3a5.27 5.27 0 0 0-5.27 5.27c0 .41.05.81.11 1.2A14.9 14.9 0 0 1 2.2 2.81 5.22 5.22 0 0 0 3.41 7.2a5.09 5.09 0 0 1-2.37-.65v.06a5.27 5.27 0 0 0 4.2 5.18A5.19 5.19 0 0 1 1 12.72v.07a5.26 5.26 0 0 0 5 5.08A10.61 10.61 0 0 1 .97 21a10.61 10.61 0 0 1-1.1-.06A14.95 14.95 0 0 0 8.64 23c10.37 0 16.03-8.6 16.03-16.03v-.73A11.43 11.43 0 0 0 24 4.29a10.55 10.55 0 0 1-2.81.77z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/harismohanty"
                className="text-gray-500 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.45 20.45H16.55v-5.54c0-1.33-.03-3.04-1.84-3.04-1.85 0-2.14 1.44-2.14 2.92v5.66h-3.88V8.09h3.72v1.89h.03c.52-1.03 1.8-2.11 3.72-2.11 3.98 0 4.71 2.61 4.71 6.01v5.67zm-15.03-11.3c-1.24 0-2.27 1.03-2.27 2.31 0 1.29 1.03 2.32 2.27 2.32s2.27-1.03 2.27-2.32-1.03-2.31-2.27-2.31zm1.84 11.3h-3.68v-10.2h3.68v10.2zm-11.53-10.8h-3.6v10.2h3.6v-10.2zm0-1.84h-3.6c-.98 0-1.8.79-1.8 1.77v11.43c0 .98.82 1.77 1.8 1.77h3.6c.98 0 1.8-.79 1.8-1.77v-11.43c0-.98-.82-1.77-1.8-1.77z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Footer;
