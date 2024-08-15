import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SunIcon,
  MoonIcon,
  ArrowLeftEndOnRectangleIcon,
  UserCircleIcon,
  BellIcon,
  ArrowRightEndOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { logoutUserApi } from "@/api/api";
import { toast } from "sonner";
import { clearUser } from "@/redux/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  // Path for handle active links
  const location = useLocation();
  const currentPath = location.pathname;

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

  // Function to truncate bio text
  const truncateBio = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  // User logout
  const handleLogout = async () => {
    try {
      dispatch(showLoading());
      const data = await logoutUserApi();
      dispatch(hideLoading());
      if (data?.success) {
        toast.success("Logged out successfully!");
        dispatch(clearUser());
        navigate("/login");
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <nav className="bg-slate-100 dark:bg-gray-800 shadow-md dark:shadow dark:shadow-blue-300 shadow-gray-300 w-100 px-2 md:px-auto fixed top-0 right-0 left-0 z-50">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* Logo */}
          <Link to={"/"} className="md:order-1">
            <img src={logo} className="w-32 h-10 md:w-48" alt="Career Sync" />
          </Link>

          {/* Routes */}
          <div className="text-gray-500 dark:text-gray-400 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between font-raleway">
              <li
                className={`md:px-4 md:py-2 ${
                  currentPath === "/"
                    ? "text-indigo-500 dark:text-indigo-300"
                    : "hover:text-indigo-400 dark:hover:text-indigo-300"
                }`}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className={`md:px-4 md:py-2 ${
                  currentPath === "/job"
                    ? "text-indigo-500 dark:text-indigo-300"
                    : "hover:text-indigo-400 dark:hover:text-indigo-300"
                }`}
              >
                <Link to="/job">Jobs</Link>
              </li>
              <li
                className={`md:px-4 md:py-2 ${
                  currentPath === "/about"
                    ? "text-indigo-500 dark:text-indigo-300"
                    : "hover:text-indigo-400 dark:hover:text-indigo-300"
                }`}
              >
                <Link to="/about">About</Link>
              </li>
              <li
                className={`md:px-4 md:py-2 ${
                  currentPath === "/contact"
                    ? "text-indigo-500 dark:text-indigo-300"
                    : "hover:text-indigo-400 dark:hover:text-indigo-300"
                }`}
              >
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="order-2 md:order-3 flex items-center justify-between gap-3">
            {/* User */}
            {user ? (
              <>
                <Link to={"/notifications"} className="relative">
                  <BellIcon className="h-8 w-8 text-gray-500 dark:text-white" />
                  {user?.unSeenNotifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 text-xs h-5 w-5 flex items-center justify-center text-white bg-red-500 rounded-full"
                    >
                      {user?.unSeenNotifications.length}
                    </Badge>
                  )}
                </Link>
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="h-8 w-8">
                      {/* Add icon if no profile pic */}
                      {user?.profilePhoto ? (
                        <AvatarImage
                          src={user?.profilePhoto}
                          className="cursor-pointer object-cover"
                        />
                      ) : (
                        <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-white cursor-pointer" />
                      )}
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col items-center gap-3 w-auto p-4">
                    <Avatar className="h-10 w-10">
                      {/* Add icon if no profile pic */}
                      {!user?.profilePic ? (
                        <AvatarImage
                          src={user?.profilePhoto}
                          className="object-cover"
                        />
                      ) : (
                        <UserCircleIcon className="h-10 w-10 text-gray-500 dark:text-white" />
                      )}
                    </Avatar>
                    <div className="text-center">
                      <h4 className="font-medium">{user?.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {truncateBio(user?.bio, 35)}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-full">
                      <Button
                        variant="link"
                        className="flex items-center gap-2 w-full justify-center"
                        onClick={() => navigate("/view-profile")}
                      >
                        <UserIcon className="h-4 w-4" />
                        View Profile
                      </Button>
                      <Button
                        variant="link"
                        className="flex items-center gap-2 w-full justify-center"
                        onClick={handleLogout}
                      >
                        <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-xl flex items-center gap-2 font-merriweather"
              >
                <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
                <span>Login</span>
              </Button>
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
