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
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import uploadImage from "@/helper/UploadImage";
import { useState } from "react";
import { TrashIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { createCompanyApi, updateCompanyDetailsApi } from "@/api/api";

// Form Validation Schema
const formSchema = z.object({
  companyName: z
    .string()
    .min(3, "Company name must be at least 3 characters long")
    .max(100, "Company name must be at most 100 characters long"),
  description: z
    .string()
    .optional()
    .refine((value) => !value || (value.length >= 10 && value.length <= 500), {
      message: "Description must be between 10 and 500 characters long",
    }),
  location: z
    .string()
    .optional()
    .refine((value) => !value || (value.length >= 2 && value.length <= 100), {
      message: "Location must be between 2 and 100 characters long",
    }),
  logo: z.string().url().optional(),
  website: z.string().url("Please provide a valid URL for the website"),
  email: z.string().email("Please provide a valid email address"),
  industry: z.enum([
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Other",
  ]),
  companySize: z.enum([
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1001+",
  ]),
});

const CompanyForm = ({ setShowForm, onRefresh, company, buttonName }) => {
  const dispatch = useDispatch();
  const [logoPreview, setLogoPreview] = useState(company?.logo || "");

  // Form values and validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: company || {
      companyName: "",
      description: "",
      location: "",
      logo: "",
      website: "",
      email: "",
      industry: "",
      companySize: "1-10",
    },
  });

  //****** Upload logo image ******/
  const handleUploadLogo = async (e) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (!file) {
      showErrorToast("No file selected. Please choose a file to upload.");
      return;
    }

    if (file.size > 300 * 1024) {
      showErrorToast("Please upload an image under 300KB.");
      return;
    }
    try {
      dispatch(showLoading());
      const uploadImageCloudinary = await uploadImage(file);
      dispatch(hideLoading());
      const imageUrl = uploadImageCloudinary.secure_url;
      form.setValue("logo", imageUrl);
      setLogoPreview(imageUrl);
    } catch (err) {
      showErrorToast(err.message);
      dispatch(hideLoading());
    }
  };

  // Delete logo image
  const handleDeleteLogo = () => {
    form.setValue("logo", "");
    setLogoPreview("");
  };

  //************** CREATE || UPDATE COMPANY */
  const onSubmit = async (data) => {
    try {
      dispatch(showLoading());
      const res = company
        ? await updateCompanyDetailsApi(company?._id, data)
        : await createCompanyApi(data);
      dispatch(hideLoading());

      if (res.success) {
        showSuccessToast(
          `Company ${company ? "details updated" : "created"} successfully!`
        );
        onRefresh();
        setShowForm(false);
      } else {
        showErrorToast(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      showErrorToast(err?.response?.data?.message || "An error occurred.");
      console.log(err);
    }
  };

  return (
    <div className="space-y-6 bg-white shadow-md rounded-lg p-8 dark:bg-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-indigo-500">
          {buttonName || "Create or Update Company"}
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
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief company description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={() => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <div className="mt-2 flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-600 hover:bg-gray-100 dark:border-gray-500 dark:hover:border-gray-600 dark:hover:bg-gray-700"
                      >
                        {logoPreview ? (
                          <div className="relative w-full h-full">
                            <img
                              src={logoPreview}
                              alt="Logo Preview"
                              className="object-contain w-full h-full"
                            />
                            <button
                              type="button"
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                              onClick={handleDeleteLogo}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <CloudArrowUpIcon className="h-10 w-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 300KB)
                            </p>
                          </div>
                        )}
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={handleUploadLogo}
                        />
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL*</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="contact@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry*</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Company Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10</SelectItem>
                          <SelectItem value="11-50">11-50</SelectItem>
                          <SelectItem value="51-200">51-200</SelectItem>
                          <SelectItem value="201-500">201-500</SelectItem>
                          <SelectItem value="501-1000">501-1000</SelectItem>
                          <SelectItem value="1001+">1001+</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} />
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

CompanyForm.propTypes = {
  setShowForm: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  company: PropTypes.object,
  buttonName: PropTypes.string,
};

export default CompanyForm;
