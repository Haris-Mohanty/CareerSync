import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import {
  SunIcon,
  MoonIcon,
  ArrowLeftEndOnRectangleIcon,
  UserCircleIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const user = true;

  // State to manage dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  // Sync dark mode with local storage and initial load
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <>
      {/* component */}
      <nav className="bg-white dark:bg-gray-800 shadow shadow-gray-300 w-100 px-2 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* Logo */}
          <Link to={"/"} className="md:order-1">
            <img src={logo} className="w-32 h-10 md:w-48" alt="Career Sync" />
          </Link>
          <div className="text-gray-500 dark:text-gray-400 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              {/* Active Link = text-indigo-500
            Inactive Link = hover:text-indigo-500 */}
              <li className="md:px-4 md:py-2 text-indigo-400 dark:text-indigo-300">
                <Link to="/">Home</Link>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400 dark:hover:text-indigo-300">
                <Link to="/job">Jobs</Link>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400 dark:hover:text-indigo-300">
                <Link to="/about">About</Link>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400 dark:hover:text-indigo-300">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="order-2 md:order-3 flex items-center justify-between gap-3">
            {/* User */}
            {user ? (
              <>
                <BellIcon className="h-8 w-8 text-gray-500 dark:text-white cursor-pointer" />
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar>
                      {!user?.profilePic ? (
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          className="cursor-pointer"
                        />
                      ) : (
                        <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-white cursor-pointer" />
                      )}
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent>
                    Place content for the popover here.
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Link className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                {/* Heroicons - Login Solid */}
                <ArrowLeftEndOnRectangleIcon className="h-6 w-6" />
                <span>Login</span>
              </Link>
            )}

            {/* Dark Mode Toggle Button */}
            <button onClick={toggleDarkMode} className="text-gray-800">
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-gray-300 hover:text-gray-400" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
