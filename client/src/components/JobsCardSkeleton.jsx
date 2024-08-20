import { Avatar } from "@radix-ui/react-avatar";
import { Skeleton } from "./ui/skeleton";

const SkeletonJobComponent = () => {
  return (
    <div className="bg-white shadow-lg min-h-[15rem] px-6 pb-3 pt-2 rounded-lg space-y-2 relative dark:bg-gray-700 dark:shadow-2xl">
      {/* Top Row: Days Ago and Save Later Icon */}
      <div className="flex justify-between items-center">
        <Skeleton className="w-20 h-4 bg-gray-200 dark:bg-gray-600" />
        <Skeleton className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full" />
      </div>

      {/* Company Logo and Info */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <Skeleton className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded-full" />
        </Avatar>
        <div>
          <Skeleton className="w-32 h-4 bg-gray-200 dark:bg-gray-600" />
          <Skeleton className="w-24 h-3 bg-gray-200 dark:bg-gray-600 mt-1" />
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-1">
        <Skeleton className="w-48 h-5 bg-gray-200 dark:bg-gray-600" />
        <div className="flex items-center space-x-2 mt-1">
          <Skeleton className="w-20 h-3 bg-gray-200 dark:bg-gray-600" />
          <Skeleton className="w-16 h-3 bg-gray-200 dark:bg-gray-600" />
        </div>
        <Skeleton className="w-full h-12 bg-gray-200 dark:bg-gray-600 mt-2" />
      </div>

      {/* Badges */}
      <div className="flex justify-center space-x-2 mt-4">
        <Skeleton className="w-24 h-6 bg-gray-200 dark:bg-gray-600 rounded-full" />
        <Skeleton className="w-24 h-6 bg-gray-200 dark:bg-gray-600 rounded-full hidden md:block" />
        <Skeleton className="w-24 h-6 bg-gray-200 dark:bg-gray-600 rounded-full md:hidden" />
        <Skeleton className="w-24 h-6 bg-gray-200 dark:bg-gray-600 rounded-full" />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between space-x-4">
        <Skeleton className="w-24 h-8 bg-gray-200 dark:bg-gray-600 rounded" />
        <Skeleton className="w-24 h-8 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 dark:bg-gray-600 rounded" />
      </div>
    </div>
  );
};

export default SkeletonJobComponent;
