import heroImage from "@/assets/hero.png";
import {
  UserCircleIcon,
  BuildingOffice2Icon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Hero = () => {
  return (
    <>
      <section className="bg-slate-100 pt-16">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 md:px-8">
          {/* Right Section - Image */}
          <div className="lg:order-2 lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0">
            <img
              src={heroImage}
              alt="Hero"
              className="max-w-full h-auto lg:w-full lg:h-auto"
            />
          </div>

          {/* Left Section */}
          <div className="lg:order-1 lg:w-1/2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              {/* <AvatarGroup size="md"> */}
                <Avatar>
                  <AvatarImage src="https://avatar-url-1.png" alt="User 1" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://avatar-url-2.png" alt="User 2" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://avatar-url-3.png" alt="User 3" />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
              {/* </AvatarGroup> */}
              <p className="ml-2 text-gray-600 text-sm">45+ Regular Users</p>
            </div>

            <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Secure Your Career
              <br className="hidden lg:block" />
              Path. You’re Worth It.
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Empowering Ambitious Job Seekers with Comprehensive Tools and
              Resources to Discover, Apply, and Secure Their Dream.
            </p>

            {/* Search Bar */}
            <div className="flex items-center justify-center lg:justify-start bg-white rounded-full shadow-lg px-4 py-3 mb-10">
              <input
                type="text"
                placeholder="Job Title Keywords"
                className="flex-grow p-2 text-gray-600 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
                FIND JOBS
              </button>
            </div>

            {/* Popular Search Section */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-200">
                UI/UX
              </span>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-200">
                Web Development
              </span>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-200">
                Human Resources
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <div className="bg-slate-200 p-8 mx-auto flex flex-col md:flex-row justify-around text-center px-4 md:px-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-white rounded-full p-4 mr-1">
            <UserCircleIcon className="h-10 w-10 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">7000+</p>
            <p className="text-gray-600 text-sm">Active Workers</p>
          </div>
        </div>
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-white rounded-full p-4 mr-1">
            <BuildingOffice2Icon className="h-10 w-10 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">3000+</p>
            <p className="text-gray-600 text-sm">Companies</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-white rounded-full p-4 mr-1">
            <GlobeAsiaAustraliaIcon className="h-10 w-10 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">1500+</p>
            <p className="text-gray-600 text-sm">Cities</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
