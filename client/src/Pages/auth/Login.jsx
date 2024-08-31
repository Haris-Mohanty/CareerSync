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
import loginImage from "@/assets/login.jpg";
import { loginUserApi } from "@/api/api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/redux/spinnerSlice";
import { motion } from "framer-motion";
import { showErrorToast, showSuccessToast } from "@/helper/toastHelper";

// Form Validation
const formSchema = z.object({
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
  role: z.enum(["user", "recruiter"], {
    message: "Role must be either 'user' or 'recruiter'.",
  }),
});

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const imageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const formVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //********* FORM VALUE ************/
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });

  //********** FORM SUBMIT **********/
  async function onSubmit(values) {
    try {
      dispatch(showLoading());
      const data = await loginUserApi(values);
      dispatch(hideLoading());
      if (data.success) {
        showSuccessToast("Login Successfully");
        navigate("/");
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="w-[90%] md:w-[75%] flex justify-center items-center p-1 md:p-6"
          variants={imageVariants}
        >
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div className="md:w-1/2 p-1 md:p-4" variants={formVariants}>
          <div className="px-2 md:px-6 py-2 md:py-5 w-full max-w-lg mx-auto rounded-lg">
            <motion.h1
              className="text-2xl font-bold flex text-center justify-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.6 } }}
            >
              Welcome Back!
            </motion.h1>
            <motion.h2
              className="text-lg font-semibold text-gray-500 flex text-center justify-center mb-4"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.6, delay: 0.2 },
              }}
            >
              Login to your account
            </motion.h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Email*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@gmail.com"
                          {...field}
                          autoComplete="email"
                        />
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
                      <FormLabel>Enter Password*</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="******"
                          {...field}
                          autoComplete="current-password"
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
                      <FormLabel>Role*</FormLabel>
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
                  Login
                </Button>
              </form>
            </Form>

            {/***************** LOGIN ***********/}
            <div className="mt-3 text-center">
              <p className="text-gray-600 dark:text-white">
                Dont have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-indigo-500 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Login;
