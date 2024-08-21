import { useSelector, useDispatch } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import moment from "moment"; // Import Moment.js
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const markAllAsSeen = () => {
    dispatch({ type: "MARK_ALL_AS_SEEN" });
  };

  const deleteSeenNotifications = () => {
    dispatch({ type: "DELETE_SEEN_NOTIFICATIONS" });
  };

  // Function to format the time difference
  const formatTimeDifference = (date) => {
    const now = moment();
    const createdAt = moment(date);
    const diffMinutes = now.diff(createdAt, "minutes");
    const diffDays = now.diff(createdAt, "days");

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffMinutes < 1440) return `${now.diff(createdAt, "hours")} hours ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`; // Show days ago
  };

  return (
    <div className="bg-slate-100 dark:bg-gray-800 min-h-screen pt-2 md:pt-16">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
          <Tabs defaultValue="unseen">
            <TabsList className="flex bg-gray-100 dark:bg-gray-800">
              <TabsTrigger
                value="unseen"
                className="w-1/2 text-center py-4 text-xs md:text-lg font-lato font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-transparent transition hover:bg-gray-200 hover:border-indigo-500 focus:bg-gray-200 focus:border-indigo-500 dark:hover:bg-gray-600 dark:focus:bg-gray-600"
              >
                Unseen Notifications
              </TabsTrigger>
              <TabsTrigger
                value="seen"
                className="w-1/2 text-center py-4 text-xs md:text-lg font-lato font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-transparent transition hover:bg-gray-200 hover:border-indigo-500 focus:bg-gray-200 focus:border-indigo-500 dark:hover:bg-gray-600 dark:focus:bg-gray-600"
              >
                Seen Notifications
              </TabsTrigger>
            </TabsList>

            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
              <TabsContent value="unseen">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={markAllAsSeen}
                    className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-colors text-white px-6 py-2 rounded-lg text-xs md:text-base"
                  >
                    Mark All as Seen
                  </button>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-600 max-h-[25rem] overflow-y-auto">
                  {user?.unSeenNotifications.length > 0 ? (
                    user.unSeenNotifications.map((notification, index) => {
                      const daysAgo = moment().diff(
                        moment(notification.createdAt),
                        "days"
                      );
                      const showNewBadge = daysAgo < 1; // Show "New" badge if less than 1 day old

                      return (
                        <li
                          key={index}
                          className="p-4 bg-white dark:bg-gray-600 shadow-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition flex items-center justify-between mb-2 cursor-pointer"
                          onClick={() =>
                            navigate(`/${notification.onClickPath}`)
                          }
                        >
                          <div>
                            <p className="text-gray-800 dark:text-gray-200 font-medium text-xs md:text-base">
                              {notification.message}
                            </p>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {formatTimeDifference(notification.createdAt)}
                            </span>
                          </div>
                          {showNewBadge && (
                            <span className="text-xs text-white bg-indigo-500 px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                        </li>
                      );
                    })
                  ) : (
                    <li className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No notifications found!
                    </li>
                  )}
                </ul>
              </TabsContent>

              <TabsContent value="seen">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={deleteSeenNotifications}
                    className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-colors text-white px-6 py-2 rounded-lg text-xs md:text-base"
                  >
                    Delete Seen Notifications
                  </button>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                  {user?.seenNotifications.length > 0 ? (
                    user.seenNotifications.map((notification, index) => (
                      <li
                        key={index}
                        className="p-4 bg-white dark:bg-gray-600 shadow-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <p className="text-gray-800 dark:text-gray-200 font-medium text-xs md:text-base">
                            {notification.message}
                          </p>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatTimeDifference(notification.createdAt)}
                          </span>
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-300 bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded-full">
                          Seen
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No seen notifications
                    </li>
                  )}
                </ul>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Notification;
