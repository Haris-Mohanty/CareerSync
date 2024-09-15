import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";
import { createJobAPi, updateJobDetailsApi } from "@/api/api";

// Form Validation Schema
const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must be at most 500 characters long"),
  salary: z.number().min(0, "Salary must be a positive number"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters long")
    .max(100, "Location must be at most 100 characters long"),
  jobType: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
  numberOfVacancies: z
    .number()
    .min(1, "Number of vacancies must be at least 1"),
  experienceLevel: z.enum(["Entry", "Mid", "Senior"]),
  workType: z.enum(["Remote", "Onsite", "Hybrid"]),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "Deadline must be a future date",
  }),
  company: z.string().nonempty("Company is required"),
});

const JobForm = ({ setShowForm, onRefresh, job, buttonName, company }) => {
  const dispatch = useDispatch();

  // Requirement
  const [requirementsList, setRequirementsList] = useState(
    job?.requirements || []
  );
  const [requirementInput, setRequirementInput] = useState("");

  // Form values and validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: job || {
      title: "",
      description: "",
      requirements: [],
      salary: 0,
      location: "",
      jobType: "",
      numberOfVacancies: 1,
      experienceLevel: "",
      workType: "",
      deadline: new Date(),
      company: "",
      status: "Open",
    },
  });

  // Requirement Handle (ADD)
  const handleAddRequirement = () => {
    if (requirementInput.trim()) {
      setRequirementsList([...requirementsList, requirementInput.trim()]);
      setRequirementInput("");
    }
  };

  // Requirement Handle (REMOVE)
  const handleRemoveRequirement = (index) => {
    setRequirementsList(requirementsList.filter((_, i) => i !== index));
  };

  //*********** HANDLE FORM SUBMISSION (CREATE || UPDATE) JOB ***********/
  const onSubmit = async (data) => {
    data.requirements = requirementsList; // Update requirements list
    data.salary = parseFloat(data.salary); // Convert salary to number
    data.numberOfVacancies = parseInt(data.numberOfVacancies, 10); // Convert vacancies
    data.deadline = new Date(data.deadline); // Convert deadline

    try {
      dispatch(showLoading());
      const res = job
        ? await updateJobDetailsApi(job?._id, data)
        : await createJobAPi(data);
      dispatch(hideLoading());

      if (res.success) {
        showSuccessToast(
          `Job ${job ? "details updated" : "posted"} successfully!`
        );
        onRefresh();
        setShowForm(false);
      }
    } catch (err) {
      dispatch(hideLoading());
      showErrorToast(err?.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="space-y-6 bg-white shadow-md rounded-lg p-8 dark:bg-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-indigo-500">
          {buttonName || "Create or Update Job"}
        </h1>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-red-500 hover:text-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="Job Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Desc */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief job description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Requirements */}
              <FormItem>
                <FormLabel>Requirements*</FormLabel>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input
                      value={requirementInput}
                      onChange={(e) => setRequirementInput(e.target.value)}
                      placeholder="Enter a requirement"
                    />
                  </FormControl>
                  <Button type="button" onClick={handleAddRequirement}>
                    Add
                  </Button>
                </div>
                <FormMessage />
              </FormItem>

              {requirementsList.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Added Requirements:
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {requirementsList.map((req, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-start bg-gray-100 dark:bg-gray-600 p-3 rounded-lg"
                      >
                        <span className="text-sm leading-tight text-gray-800 dark:text-gray-200 break-words">
                          {req}
                        </span>
                        <button
                          type="button"
                          className="ml-4 text-red-600 hover:text-red-800 transition"
                          onClick={() => handleRemoveRequirement(index)}
                        >
                          <TrashIcon className="h-6 w-6" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Salary */}
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Per Year*</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Salary in INR"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location*</FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Job Type */}
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type*</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Job Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Vacancies */}
              <FormField
                control={form.control}
                name="numberOfVacancies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Vacancies*</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Number of Vacancies"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Exp */}
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level*</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Experience Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entry">Entry</SelectItem>
                          <SelectItem value="Mid">Mid</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Work Type */}
              <FormField
                control={form.control}
                name="workType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Type*</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Work Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Remote">Remote</SelectItem>
                          <SelectItem value="Onsite">Onsite</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Deadline */}
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Deadline*</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company*</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Company" />
                        </SelectTrigger>
                        <SelectContent>
                          {company.map((comp) => (
                            <SelectItem key={comp._id} value={comp._id}>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={comp.logo}
                                    alt={comp.companyName}
                                  />
                                  <AvatarFallback>
                                    {comp.companyName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{comp.companyName}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition-all"
          >
            {buttonName || "Submit"}
          </button>
        </form>
      </Form>
    </div>
  );
};

JobForm.propTypes = {
  setShowForm: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  job: PropTypes.object,
  buttonName: PropTypes.string,
  company: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default JobForm;
