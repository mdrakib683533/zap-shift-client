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

  const inputClass =
    "input input-bordered h-10 min-h-10 w-full rounded-lg border-base-300 bg-base-100 text-sm focus:border-[#00BF83] focus:outline-none focus:ring-1 focus:ring-[#00BF83]/20";

  const selectClass =
    "select select-bordered h-10 min-h-10 w-full rounded-lg border-base-300 bg-base-100 text-sm focus:border-[#00BF83] focus:outline-none focus:ring-1 focus:ring-[#00BF83]/20";

  const labelClass = "mb-1.5 block text-sm font-medium text-base-content/80";

  const errorClass = "mt-1 text-xs text-error";

  return (
    <div className="min-h-screen bg-base-200/40 px-3 py-5 sm:px-5 sm:py-7">
      <div className="mx-auto max-w-4xl">
        {/* Page heading */}
        <div className="mb-5 rounded-xl border border-base-300/70 bg-base-100 px-4 py-5 shadow-sm sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Become a <span className="text-[#00BF83]">Rider</span>
          </h1>
          <p className="mt-1.5 text-sm text-base-content/60">
            Join Zap Shift and start your rider journey.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRiderApplication)}
          className="space-y-4"
        >
          {/* Personal Information */}
          <section className="rounded-xl border border-base-300/70 bg-base-100 p-4 shadow-sm sm:p-5">
            <h2 className="mb-4 border-b border-base-300/70 pb-3 text-lg font-bold">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 gap-x-5 gap-y-3.5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label className={labelClass}>Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className={`${inputClass} bg-base-200/60`}
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className={`${inputClass} bg-base-200/60`}
                />
              </div>

              {/* Age */}
              <div>
                <label className={labelClass}>Age</label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  className={inputClass}
                  {...register("age", {
                    required: "Age is required",
                    min: {
                      value: 18,
                      message: "You must be at least 18 years old",
                    },
                  })}
                />
                {errors.age && (
                  <p className={errorClass}>{errors.age.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className={inputClass}
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone && (
                  <p className={errorClass}>{errors.phone.message}</p>
                )}
              </div>

              {/* NID */}
              <div>
                <label className={labelClass}>National ID Card Number</label>
                <input
                  type="text"
                  placeholder="Enter NID number"
                  className={inputClass}
                  {...register("nid", {
                    required: "NID number is required",
                  })}
                />
                {errors.nid && (
                  <p className={errorClass}>{errors.nid.message}</p>
                )}
              </div>

              {/* Region */}
              <div>
                <label className={labelClass}>Region</label>
                <select
                  className={selectClass}
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
                  <p className={errorClass}>{errors.region.message}</p>
                )}
              </div>

              {/* District */}
              <div>
                <label className={labelClass}>District</label>
                <select
                  className={selectClass}
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
                  <p className={errorClass}>{errors.district.message}</p>
                )}
              </div>
            </div>
          </section>

          {/* Bike Information */}
          <section className="rounded-xl border border-base-300/70 bg-base-100 p-4 shadow-sm sm:p-5">
            <h2 className="mb-4 border-b border-base-300/70 pb-3 text-lg font-bold">
              Bike Information
            </h2>

            <div className="grid grid-cols-1 gap-x-5 gap-y-3.5 sm:grid-cols-2">
              {/* Bike Brand */}
              <div>
                <label className={labelClass}>Bike Brand</label>
                <input
                  type="text"
                  placeholder="e.g. Honda, Yamaha"
                  className={inputClass}
                  {...register("bikeBrand", {
                    required: "Bike brand is required",
                  })}
                />
                {errors.bikeBrand && (
                  <p className={errorClass}>{errors.bikeBrand.message}</p>
                )}
              </div>

              {/* Registration Number */}
              <div>
                <label className={labelClass}>Bike Registration Number</label>
                <input
                  type="text"
                  placeholder="Enter registration number"
                  className={inputClass}
                  {...register("bikeRegistrationNumber", {
                    required: "Bike registration number is required",
                  })}
                />
                {errors.bikeRegistrationNumber && (
                  <p className={errorClass}>
                    {errors.bikeRegistrationNumber.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className="rounded-xl border border-base-300/70 bg-base-100 p-4 shadow-sm sm:p-5">
            <label className="mb-2 block text-base font-bold">
              Additional Information{" "}
              <span className="text-xs font-normal text-base-content/50">
                (Optional)
              </span>
            </label>

            <textarea
              placeholder="Your riding experience or other relevant details..."
              className="textarea textarea-bordered min-h-20 w-full rounded-lg border-base-300 bg-base-100 text-sm focus:border-[#00BF83] focus:outline-none focus:ring-1 focus:ring-[#00BF83]/20"
              {...register("additionalInfo")}
            />
          </section>

          {/* Submit */}
          <button
            type="submit"
            className="btn min-h-11 w-full rounded-lg border-none bg-[#00BF83] text-sm font-bold text-white hover:bg-[#009966]"
          >
            Apply as Rider
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeARider;
