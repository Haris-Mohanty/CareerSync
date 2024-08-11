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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

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
  const [profilePicPreview, setProfilePicPreview] = useState(null);

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

  // **************** CONVERT IMAGE TO BASE 64 *************/
  const imageTobase64 = async (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    return data;
  };

  // **************** PROFILE PHOTO UPLOAD *****************/
  //   // Check if file type is either JPG or PNG
  //   if (file.type !== "image/jpeg" && file.type !== "image/png") {
  //     toast.error("Please upload a JPG or PNG image.");
  //     return;
  //   }

  const handleUploadProfilePhoto = async (e) => {
    const file = e.target.files[0];

    // Check if file size is under 75KB
    if (file.size > 75 * 1024) {
      toast.error("Please upload an image under 75KB.");
      return;
    }

    const imagePic = await imageTobase64(file);
    setProfilePicPreview(imagePic);

    form.setValue("profilePhoto", imagePic);
  };

  //********** FORM SUBMIT **********/
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <>
      <div className="container mx-auto py-4 px-2 mt-28 md:mt-14">
        <div className="bg-white shadow-md dark:bg-gray-800 px-6 py-5 w-full max-w-lg mx-auto rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                      <Input type="password" placeholder="******" {...field} />
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
                        onChange={(e) => field.onChange(e.target.files[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
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
                      {profilePicPreview && (
                        <img
                          src={profilePicPreview}
                          alt="Profile Preview"
                          className="mt-2 h-20 w-20 rounded-full object-cover"
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

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

              <Button className="flex w-full" type="submit">
                Submit
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
      </div>
    </>
  );
};

export default Register;
