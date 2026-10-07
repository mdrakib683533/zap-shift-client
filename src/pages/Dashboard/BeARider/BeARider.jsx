import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BeARider = () => {
  const serviceCenters = useLoaderData();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedRegion, setSelectedRegion] = useState("");
  const axiosSecure = useAxiosSecure();

  // Get unique regions
  const regions = [...new Set(serviceCenters.map((item) => item.region))];

  // Get districts according to selected region
  const districts = serviceCenters
    .filter((item) => item.region === selectedRegion)
    .map((item) => item.district);

  // Remove duplicate districts
  const uniqueDistricts = [...new Set(districts)];

  const handleRiderApplication = async (data) => {
    const riderApplication = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
      appliedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/riders", riderApplication);

      console.log("Rider application saved:", res.data);

      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Your rider application has been submitted successfully.",
        confirmButtonText: "Okay",
      });

      reset();
      setSelectedRegion("");
    } catch (error) {
      console.error("Failed to submit rider application:", error);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Be a Rider</h1>

        <p className="text-gray-500 mt-2">
          Join our rider team and start earning with Zap Shift
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="bg-base-200 p-6 md:p-8 rounded-2xl shadow"
      >
        {/* Personal Information */}
        <h2 className="text-2xl font-semibold mb-5">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Name</span>
            </label>

            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Age */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Age</span>
            </label>

            <input
              type="number"
              placeholder="Enter your age"
              className="input input-bordered w-full"
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 18,
                  message: "You must be at least 18 years old",
                },
              })}
            />

            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Phone Number</span>
            </label>

            <input
              type="tel"
              placeholder="Enter phone number"
              className="input input-bordered w-full"
              {...register("phone", {
                required: "Phone number is required",
              })}
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* NID */}
          <div>
            <label className="label">
              <span className="label-text font-medium">
                National ID Card Number
              </span>
            </label>

            <input
              type="text"
              placeholder="Enter NID number"
              className="input input-bordered w-full"
              {...register("nid", {
                required: "NID number is required",
              })}
            />

            {errors.nid && (
              <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>
            )}
          </div>

          {/* Region */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Region</span>
            </label>

            <select
              className="select select-bordered w-full"
              value={selectedRegion}
              {...register("region", {
                required: "Region is required",
              })}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
              }}
            >
              <option value="">Select region</option>

              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            {errors.region && (
              <p className="text-red-500 text-sm mt-1">
                {errors.region.message}
              </p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="label">
              <span className="label-text font-medium">District</span>
            </label>

            <select
              className="select select-bordered w-full"
              disabled={!selectedRegion}
              {...register("district", {
                required: "District is required",
              })}
            >
              <option value="">Select district</option>

              {uniqueDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            {errors.district && (
              <p className="text-red-500 text-sm mt-1">
                {errors.district.message}
              </p>
            )}
          </div>
        </div>

        {/* Bike Information */}
        <h2 className="text-2xl font-semibold mt-10 mb-5">Bike Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Bike Brand */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Bike Brand</span>
            </label>

            <input
              type="text"
              placeholder="e.g. Honda, Yamaha"
              className="input input-bordered w-full"
              {...register("bikeBrand", {
                required: "Bike brand is required",
              })}
            />

            {errors.bikeBrand && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bikeBrand.message}
              </p>
            )}
          </div>

          {/* Registration Number */}
          <div>
            <label className="label">
              <span className="label-text font-medium">
                Bike Registration Number
              </span>
            </label>

            <input
              type="text"
              placeholder="Enter registration number"
              className="input input-bordered w-full"
              {...register("bikeRegistrationNumber", {
                required: "Bike registration number is required",
              })}
            />

            {errors.bikeRegistrationNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bikeRegistrationNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-5">
          <label className="label">
            <span className="label-text font-medium">
              Additional Information
            </span>
          </label>

          <textarea
            placeholder="Tell us about your riding experience or anything else relevant..."
            className="textarea textarea-bordered w-full h-32"
            {...register("additionalInfo")}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-[#CAEB66] text-black font-bold w-full mt-8 
             hover:bg-[#A8CC45]"
        >
          Apply as Rider
        </button>
      </form>
    </div>
  );
};

export default BeARider;
