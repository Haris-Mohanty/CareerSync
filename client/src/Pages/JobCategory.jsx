import { motion } from "framer-motion";
import {
  ComputerDesktopIcon,
  FilmIcon,
  ChartBarIcon,
  CodeBracketSquareIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
  HeartIcon,
  BanknotesIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../components/ui/button";

const categories = [
  { title: "UI/UX Designer", icon: ComputerDesktopIcon, positions: 56 },
  { title: "Website Development", icon: CodeBracketSquareIcon, positions: 59 },
  { title: "Digital Marketing", icon: VideoCameraIcon, positions: 56 },
  { title: "Health & Care", icon: HeartIcon, positions: 56 },
  { title: "Cyber Security", icon: ShieldCheckIcon, positions: 56 },
  { title: "Content Writing", icon: PencilSquareIcon, positions: 56 },
  { title: "Bank Job", icon: BanknotesIcon, positions: 56 },
  { title: "Sales", icon: ChartBarIcon, positions: 56 },
  { title: "Video & Animation", icon: FilmIcon, positions: 56 },
];

const hoverEffect = {
  hidden: { opacity: 0, y: 100, rotate: 0 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6 } },
  hover: { scale: 1.05, rotate: 2, transition: { duration: 0.3 } },
};

const headerAnimation = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const buttonHoverEffect = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};

const JobCategory = () => {
  return (
    <div className="bg-slate-100 dark:bg-gray-700">
      <section className="container mx-auto py-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-[#4C40F8] mb-4"
          variants={headerAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          Job <span className="text-black dark:text-white">Category</span>
        </motion.h2>
        <motion.p
          className="text-center text-gray-500 dark:text-gray-300 mb-8"
          variants={headerAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          Get the most exciting jobs and grow your career fast with others.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 flex items-center gap-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer hover:bg-indigo-700 group"
              variants={hoverEffect}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="p-2 rounded-full bg-blue-50">
                <category.icon className="h-8 w-8 text-indigo-700" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold mb-1 group-hover:text-white">
                  {category.title}
                </h3>
                <p className="text-xs md:text-sm text-indigo-500 group-hover:text-white">
                  {category.positions} Open Positions
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <motion.div
            variants={buttonHoverEffect}
            initial="initial"
            whileHover="hover"
          >
            <Button className="text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:via-indigo-800 hover:to-indigo-900 transition duration-300 rounded-lg px-6 py-3">
              See More →
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default JobCategory;
