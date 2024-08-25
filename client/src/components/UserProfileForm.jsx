import PropTypes from "prop-types";

const UserProfileForm = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      {/* Name and Phone Number Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm md:text-base font-semibold font-lato text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="phoneNumber"
            className="block text-sm md:text-base font-semibold font-lato text-gray-700 dark:text-gray-300"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
      </div>

      {/* Bio Field */}
      <div className="space-y-2">
        <label
          htmlFor="bio"
          className="block text-sm md:text-base font-semibold font-lato text-gray-700 dark:text-gray-300"
        >
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          maxLength={200}
          placeholder="Write a short bio"
          required
        />
      </div>

      {/* Skills Field */}
      <div className="space-y-2">
        <label
          htmlFor="skills"
          className="block text-sm md:text-base font-semibold font-lato text-gray-700 dark:text-gray-300"
        >
          Skills
        </label>
        <input
          type="text"
          id="skills"
          name="skills"
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
          value={formData.skills.join(", ")}
          onChange={(e) =>
            handleChange({
              target: { name: "skills", value: e.target.value.split(", ") },
            })
          }
          placeholder="Enter your skills, separated by commas (React, Bootstrap, Css)"
          required
        />
      </div>

      {/* Location and Total Experience Years Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm md:text-base font-semibold font-lato text-gray-700 dark:text-gray-300"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="totalExperienceYears"
            className="block text-sm md:text-base font-semibold font-lato text-gray-700 dark:text-gray-300"
          >
            Total Experience Years
          </label>
          <input
            type="number"
            id="totalExperienceYears"
            name="totalExperienceYears"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm px-3 py-2"
            value={formData.totalExperienceYears}
            onChange={handleChange}
            placeholder="Enter your total experience in years"
            required
          />
        </div>
      </div>
    </div>
  );
};

UserProfileForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default UserProfileForm;
