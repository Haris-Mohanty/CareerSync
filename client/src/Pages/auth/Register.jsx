import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import uploadImage from "@/helper/UploadImage";
import registerImage from "@/assets/register.jpg";
import { registerUserApi } from "@/api/api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";

// Form Validation
const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(40, {
      message: "Name must not exceed 40 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(18, {
      message: "Password must not exceed 18 characters.",
    }),
  phoneNumber: z.string().regex(/^\+91\d{10}$/, {
    message:
      "Phone number must be a valid 10-digit Indian number, starting with +91.",
  }),

  profilePhoto: z.any().optional(),
  role: z.enum(["user", "recruiter"], {
    message: "Role must be either 'user' or 'recruiter'.",
  }),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //********* FORM VALUE ************/
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      profilePhoto: null,
      role: "user",
    },
  });

  // **************** PROFILE PHOTO UPLOAD *****************/
  const handleUploadProfilePhoto = async (e) => {
    const file = e.target.files[0];

    // Check if file size is under 75KB
    if (file.size > 300 * 1024) {
      showErrorToast("Please upload an image under 300KB.");
      return;
    }
    try {
      dispatch(showLoading());
      // Upload Image Cloudinary
      const uploadImageCloudinary = await uploadImage(file);
      dispatch(hideLoading());
      form.setValue("profilePhoto", uploadImageCloudinary.secure_url);
    } catch (err) {
      showErrorToast(err.message);
      dispatch(hideLoading());
    }
  };

  //********** FORM SUBMIT **********/
  async function onSubmit(values) {
    try {
      dispatch(showLoading());
      const user = await registerUserApi(values);
      dispatch(hideLoading());
      if (user.success) {
        showSuccessToast("User Registered Successfully!");
        navigate("/login");
      }
    } catch (err) {
      dispatch(hideLoading());
      showErrorToast(err.response.data.message);
    }
  }

  return (
    <>
      <motion.div
        className="flex flex-col md:flex-row mt-4 md:mt-12 justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-[90%] md:w-[75%] flex justify-center items-center p-1 md:p-6 dark:p-1 dark:md:p-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img
            src={registerImage}
            alt="Register"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2 p-1 md:p-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="px-2 md:px-6 py-2 md:py-5 w-full max-w-lg mx-auto rounded-lg">
            <h1 className="text-xl font-bold flex text-center justify-center mb-4">
              Create account
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Your Full Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Enter Your Email*</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Set Password*</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Your Phone Number*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234567890"
                          {...field}
                          onChange={(e) => {
                            // Ensure that the value starts with +91
                            let value = e.target.value;
                            if (!value.startsWith("+91")) {
                              value = "+91" + value.replace(/^\+?91/, "");
                            }
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profilePhoto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose Your Profile Photo</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadProfilePhoto}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <div className="flex gap-6">
                          <label className="flex items-center space-x-1 cursor-pointer">
                            <input
                              type="radio"
                              value="user"
                              checked={field.value === "user"}
                              onChange={() => field.onChange("user")}
                            />
                            <span>User</span>
                          </label>
                          <label className="flex items-center space-x-1 cursor-pointer">
                            <input
                              type="radio"
                              value="recruiter"
                              checked={field.value === "recruiter"}
                              onChange={() => field.onChange("recruiter")}
                            />
                            <span>Recruiter</span>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="flex w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 transition-colors font-merriweather dark:text-white"
                  type="submit"
                >
                  Register
                </Button>
              </form>
            </Form>

            {/***************** LOGIN ***********/}
            <div className="mt-3 text-center">
              <p className="text-gray-600 dark:text-white">
                Already have an account?{" "}
                <Link to={"/login"} className="text-indigo-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Register;
