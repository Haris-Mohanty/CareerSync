import image from "@/assets/man.png";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const imageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const jobVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } },
};

const buttonHover = {
  scale: 1.1,
  transition: { duration: 0.3 },
};

const AuthSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 pb-8 md:pb-0 md:px-52 bg-slate-100">
      <motion.div
        className="flex flex-col items-center md:items-start md:w-2/4"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
      >
        <img
          src={image}
          alt="Man working on a computer"
          className="w-full h-auto"
        />
      </motion.div>

      <motion.div
        className="text-center md:text-left md:mt-0 md:w-1/2"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
      >
        <h1 className="text-3xl md:text-6xl font-bold text-gray-800 px-4 md:px-0">
          Step To <span className="text-indigo-600">Your Future</span> Start
          Here
        </h1>
        <p className="text-gray-500 mt-4 text-sm md:text-base">
          Discover the perfect job for your skills and aspirations. Start your
          journey today with opportunities tailored just for you.
        </p>

        <motion.div
          className="flex space-x-4 mt-8 justify-center md:justify-start"
          variants={jobVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
        >
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="h-6 w-6 text-indigo-600" />
            <span className="text-gray-800 font-medium text-sm md:text-base">
              Perfect Job Match
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <StarIcon className="h-6 w-6 text-yellow-500" />
            <span className="text-gray-800 font-medium text-sm md:text-base">
              Popular Job
            </span>
          </div>
        </motion.div>

        <motion.div
          className="flex space-x-6 mt-6 justify-center md:justify-start"
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
        >
          <motion.button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-colors text-white px-8 py-3 rounded-lg shadow-lg"
            whileHover={buttonHover}
          >
            Register
          </motion.button>
          <motion.button
            onClick={() => navigate("/login")}
            className="border border-indigo-600 text-indigo-600 px-8 py-3 bg-white rounded-lg shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
            whileHover={buttonHover}
          >
            Login
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthSection;
