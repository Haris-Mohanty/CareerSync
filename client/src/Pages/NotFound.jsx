import { Link } from "react-router-dom";
import error from "../assets/error.png";

const NotFound = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <img src={error} alt="404 Error" className="w-full mx-auto" />
          <p className="text-gray-600 dark:text-gray-300">
            Oops! page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
