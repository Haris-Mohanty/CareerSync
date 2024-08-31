import { Skeleton } from "@/components/ui/skeleton";
import { BookmarkIcon } from "@heroicons/react/24/outline";

const JobDetailsSkeleton = () => {
  return (
    <>
      {/* Skeleton for Job Card */}
      <div className="w-full md:w-[30%] mx-auto bg-white shadow-lg dark:bg-gray-800 rounded-lg p-6 border border-gray-200 relative order-1 md:order-1 dark:border-gray-700">
        {/* Save Late Icon Skeleton */}
        <div className="flex justify-end items-center absolute top-2 right-4">
          <div className="p-2 bg-indigo-100 rounded-full border border-indigo-300 cursor-pointer hover:bg-indigo-200 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 transition">
            <BookmarkIcon className="h-5 w-5 text-indigo-700 dark:text-white" />
          </div>
        </div>

        {/* Company Logo and Info Skeleton */}
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Job Title And Review Skeleton */}
        <Skeleton className="h-4 w-32 mt-3" />
        <div className="flex items-center mt-1">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-3 w-16 ml-2" />
        </div>

        {/* Additional Info Skeleton */}
        <div className="flex flex-col mt-4 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Dates and Numbers Skeleton */}
        <div className="mt-4 flex space-x-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Apply Now Button Skeleton */}
        <div className="flex justify-end items-center mt-4">
          <Skeleton className="h-8 w-32 rounded" />
        </div>
      </div>

      {/* Skeleton for Job Full Details */}
      <div className="w-full md:w-[70%] mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700 mt-4 md:mt-0 md:ml-4 max-h-[40rem] overflow-y-auto order-2 md:order-2">
        {/* Job Description Section Skeleton */}
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-3 w-full mb-2" />

        {/* Job Details Section Skeleton */}
        <div className="space-y-4 border-t border-gray-300 dark:border-gray-600 pt-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>

        {/* Requirements Section Skeleton */}
        <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-full mb-2" />
        </div>

        {/* Deadline Section Skeleton */}
        <div className="flex justify-end space-x-2 border-t border-gray-300 dark:border-gray-600 pt-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Company and Recruiter Details Section Skeleton */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 mt-6">
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailsSkeleton;
