import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import {
  FaTruck,
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import authImage from "../../../assets/authImage.png";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();

  const [profilePic, setProfilePic] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  // Upload profile picture to ImgBB
  const handleImageUpload = async (e) => {
    const image = e.target.files?.[0];

    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      setIsUploading(true);

      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

      const res = await axios.post(imageUploadUrl, formData);

      setProfilePic(res.data.data.url);

      Swal.fire({
        icon: "success",
        title: "Image Uploaded!",
        text: "Your profile picture is ready.",
        confirmButtonColor: "#03373D",
      });
    } catch (error) {
      console.error("Image upload failed:", error);

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Could not upload your profile picture. Please try again.",
        confirmButtonColor: "#03373D",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Register user and save user information
  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);

      // Save user information in the existing backend
      const userInfo = {
        email: data.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      const userRes = await axiosInstance.post("/users", userInfo);
      console.log("User saved:", userRes.data);

      // Update Firebase user profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });

      await Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: `Welcome to Zap Shift, ${data.name}!`,
        confirmButtonColor: "#03373D",
      });

      navigate(from);
    } catch (error) {
      console.error("Registration failed:", error);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error.code === "auth/email-already-in-use"
            ? "This email is already registered. Please log in."
            : error.code === "auth/weak-password"
              ? "Please choose a stronger password."
              : error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#03373D",
      });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F4FAF8] via-white to-[#F0F8E8] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#00BF83]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#B8D469]/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1500px] items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 xl:gap-16">
        {/* Left side: Delivery image */}
        <div className="relative mx-auto flex w-full max-w-[650px] items-center justify-center">
          <div className="absolute inset-8 rounded-[40px] bg-gradient-to-br from-[#00BF83]/10 via-white/40 to-[#B8D469]/20 blur-2xl sm:inset-12" />

          <img
            src={authImage}
            alt="Zap Shift parcel delivery"
            className="relative mx-auto h-auto max-h-[620px] w-full object-contain drop-shadow-xl"
          />
        </div>

        {/* Right side: Registration form */}
        <div className="mx-auto w-full max-w-[620px]">
          <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-2xl shadow-[#03373D]/10 sm:rounded-[32px]">
            {/* Brand accent */}
            <div className="h-1.5 bg-gradient-to-r from-[#03373D] via-[#00BF83] to-[#B8D469]" />

            <div className="p-6 sm:p-9 lg:p-10">
              {/* Header */}
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00BF83]/10 text-[#009966] ring-1 ring-[#00BF83]/10">
                  <FaTruck className="text-2xl" />
                </div>

                <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#009966]">
                  JOIN ZAP SHIFT
                </p>

                <h1 className="text-3xl font-extrabold tracking-tight text-[#03373D] sm:text-4xl">
                  Create Account<span className="text-[#00BF83]">.</span>
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                  Create your account and make parcel delivery easier.
                </p>
              </div>

              {/* Registration form */}
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="register-name"
                      className="mb-2 block text-sm font-bold text-[#03373D]"
                    >
                      Full name
                    </label>

                    <div className="relative">
                      <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                      <input
                        id="register-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        {...register("name", {
                          required: "Your name is required.",
                        })}
                        className={`h-[52px] w-full rounded-xl border bg-[#F8FAF9] pl-11 pr-4 text-sm text-[#03373D] outline-none transition-all placeholder:text-gray-400 focus:border-[#00BF83] focus:bg-white focus:ring-4 focus:ring-[#00BF83]/10 ${
                          errors.name ? "border-red-400" : "border-gray-200"
                        }`}
                      />
                    </div>

                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Profile picture */}
                  <div>
                    <label
                      htmlFor="register-image"
                      className="mb-2 block text-sm font-bold text-[#03373D]"
                    >
                      Profile picture
                      <span className="ml-1 font-normal text-gray-400">
                        (Optional)
                      </span>
                    </label>

                    <label
                      htmlFor="register-image"
                      className="flex min-h-[60px] cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-[#F8FAF9] px-4 py-3 transition-colors hover:border-[#00BF83] hover:bg-[#00BF83]/5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#00BF83]/10 text-[#009966]">
                        {profilePic ? (
                          <img
                            src={profilePic}
                            alt="Profile preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FaImage className="text-lg" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#03373D]">
                          {isUploading
                            ? "Uploading image..."
                            : profilePic
                              ? "Profile picture uploaded"
                              : "Choose a profile picture"}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {profilePic
                            ? "Click to change your picture"
                            : "Select an image from your device"}
                        </p>
                      </div>
                    </label>

                    <input
                      id="register-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="register-email"
                      className="mb-2 block text-sm font-bold text-[#03373D]"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                      <input
                        id="register-email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        {...register("email", {
                          required: "Email address is required.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address.",
                          },
                        })}
                        className={`h-[52px] w-full rounded-xl border bg-[#F8FAF9] pl-11 pr-4 text-sm text-[#03373D] outline-none transition-all placeholder:text-gray-400 focus:border-[#00BF83] focus:bg-white focus:ring-4 focus:ring-[#00BF83]/10 ${
                          errors.email ? "border-red-400" : "border-gray-200"
                        }`}
                      />
                    </div>

                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="register-password"
                      className="mb-2 block text-sm font-bold text-[#03373D]"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                      <input
                        id="register-password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="At least 6 characters"
                        {...register("password", {
                          required: "Password is required.",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters.",
                          },
                        })}
                        className={`h-[52px] w-full rounded-xl border bg-[#F8FAF9] pl-11 pr-4 text-sm text-[#03373D] outline-none transition-all placeholder:text-gray-400 focus:border-[#00BF83] focus:bg-white focus:ring-4 focus:ring-[#00BF83]/10 ${
                          errors.password ? "border-red-400" : "border-gray-200"
                        }`}
                      />
                    </div>

                    {errors.password && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Register button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="group mt-2 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#03373D] px-5 text-sm font-bold text-white transition-all duration-200 hover:bg-[#00A873] focus:outline-none focus:ring-4 focus:ring-[#00BF83]/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Creating account..."
                      : isUploading
                        ? "Uploading image..."
                        : "Create Account"}

                    {!isSubmitting && !isUploading && (
                      <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                    )}
                  </button>
                </div>

                {/* Login link */}
                <p className="mt-5 text-center text-sm text-gray-500">
                  Already have an account?
                  <Link
                    to="/login"
                    state={{ from }}
                    className="ml-1 font-extrabold text-[#009966] transition-colors hover:text-[#03373D]"
                  >
                    Sign in
                  </Link>
                </p>
              </form>

              {/* Google login */}
              <div className="mt-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-200" />

                  <span className="text-[10px] font-bold tracking-[0.15em] text-gray-400 sm:text-xs">
                    OR CONTINUE WITH
                  </span>

                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <SocialLogin />
              </div>

              {/* Security note */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <FaLock className="text-[#00A873]" />
                Your account is protected with secure authentication.
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-gray-400">
            Your delivery journey starts here.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
