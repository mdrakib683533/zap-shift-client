
import { useForm } from "react-hook-form";

const regions = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

const serviceCenters = {
  Dhaka: ["Uttara", "Mirpur", "Dhanmondi", "Motijheel"],
  Chattogram: ["Agrabad", "Panchlaish", "Halishahar"],
  Rajshahi: ["Boalia", "Motihar", "Rajpara"],
  Khulna: ["Sonadanga", "Khalishpur", "Daulatpur"],
  Barishal: ["Kotwali", "Bakerganj"],
  Sylhet: ["Zindabazar", "Amberkhana"],
  Rangpur: ["Kotwali", "Mahiganj"],
  Mymensingh: ["Sadar", "Muktagacha"],
};

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: "document",
    },
  });

  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">
            Send Your Parcel
          </h1>

          <p className="mt-3 text-base-content/60">
            Enter parcel, sender and receiver information for
            door-to-door delivery.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* ================= PARCEL INFO ================= */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">

              <h2 className="card-title text-2xl mb-5">
                📦 Parcel Info
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Type */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Parcel Type
                    </span>
                  </label>

                  <select
                    className="select select-bordered w-full"
                    {...register("parcelType", {
                      required: "Parcel type is required",
                    })}
                  >
                    <option value="document">
                      Document
                    </option>

                    <option value="non-document">
                      Non-document
                    </option>
                  </select>

                  {errors.parcelType && (
                    <p className="text-error text-sm mt-1">
                      {errors.parcelType.message}
                    </p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Parcel Title
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter parcel title"
                    className="input input-bordered w-full"
                    {...register("parcelTitle", {
                      required: "Parcel title is required",
                    })}
                  />

                  {errors.parcelTitle && (
                    <p className="text-error text-sm mt-1">
                      {errors.parcelTitle.message}
                    </p>
                  )}
                </div>

                {/* Weight */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Weight (kg)
                    </span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Enter weight"
                    className="input input-bordered w-full"
                    {...register("weight", {
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Weight cannot be negative",
                      },
                      required:
                        parcelType === "non-document"
                          ? "Weight is required for non-document"
                          : false,
                    })}
                  />

                  {parcelType === "document" && (
                    <p className="text-xs text-base-content/50 mt-1">
                      Weight is not required for document.
                    </p>
                  )}

                  {errors.weight && (
                    <p className="text-error text-sm mt-1">
                      {errors.weight.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================= SENDER INFO ================= */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">

              <h2 className="card-title text-2xl mb-5">
                📤 Sender Info
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Name */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Name
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder="Sender name"
                    className="input input-bordered w-full"
                    {...register("senderName", {
                      required: "Sender name is required",
                    })}
                  />

                  {errors.senderName && (
                    <p className="text-error text-sm mt-1">
                      {errors.senderName.message}
                    </p>
                  )}
                </div>

                {/* Contact */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Contact
                    </span>
                  </label>

                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    className="input input-bordered w-full"
                    {...register("senderContact", {
                      required: "Sender contact is required",
                    })}
                  />

                  {errors.senderContact && (
                    <p className="text-error text-sm mt-1">
                      {errors.senderContact.message}
                    </p>
                  )}
                </div>

                {/* Region */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Select Region
                    </span>
                  </label>

                  <select
                    className="select select-bordered w-full"
                    {...register("senderRegion", {
                      required: "Sender region is required",
                    })}
                  >
                    <option value="">
                      Select Region
                    </option>

                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>

                  {errors.senderRegion && (
                    <p className="text-error text-sm mt-1">
                      {errors.senderRegion.message}
                    </p>
                  )}
                </div>

                {/* Service Center */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Select Service Center
                    </span>
                  </label>

                  <select
                    className="select select-bordered w-full"
                    disabled={!senderRegion}
                    {...register("senderServiceCenter", {
                      required: "Sender service center is required",
                    })}
                  >
                    <option value="">
                      {senderRegion
                        ? "Select Service Center"
                        : "Select region first"}
                    </option>

                    {senderRegion &&
                      serviceCenters[senderRegion]?.map((center) => (
                        <option key={center} value={center}>
                          {center}
                        </option>
                      ))}
                  </select>

                  {errors.senderServiceCenter && (
                    <p className="text-error text-sm mt-1">
                      {errors.senderServiceCenter.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Address
                    </span>
                  </label>

                  <textarea
                    rows="3"
                    placeholder="Enter pickup address"
                    className="textarea textarea-bordered w-full"
                    {...register("senderAddress", {
                      required: "Sender address is required",
                    })}
                  />

                  {errors.senderAddress && (
                    <p className="text-error text-sm mt-1">
                      {errors.senderAddress.message}
                    </p>
                  )}
                </div>

                {/* Pickup Instruction */}
                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Pick Up Instruction
                    </span>
                  </label>

                  <textarea
                    rows="2"
                    placeholder="Example: Call before pickup"
                    className="textarea textarea-bordered w-full"
                    {...register("pickupInstruction", {
                      required: "Pickup instruction is required",
                    })}
                  />

                  {errors.pickupInstruction && (
                    <p className="text-error text-sm mt-1">
                      {errors.pickupInstruction.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================= RECEIVER INFO ================= */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">

              <h2 className="card-title text-2xl mb-5">
                📥 Receiver Info
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Name */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Name
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder="Receiver name"
                    className="input input-bordered w-full"
                    {...register("receiverName", {
                      required: "Receiver name is required",
                    })}
                  />

                  {errors.receiverName && (
                    <p className="text-error text-sm mt-1">
                      {errors.receiverName.message}
                    </p>
                  )}
                </div>

                {/* Contact */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Contact
                    </span>
                  </label>

                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    className="input input-bordered w-full"
                    {...register("receiverContact", {
                      required: "Receiver contact is required",
                    })}
                  />

                  {errors.receiverContact && (
                    <p className="text-error text-sm mt-1">
                      {errors.receiverContact.message}
                    </p>
                  )}
                </div>

                {/* Region */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Select Region
                    </span>
                  </label>

                  <select
                    className="select select-bordered w-full"
                    {...register("receiverRegion", {
                      required: "Receiver region is required",
                    })}
                  >
                    <option value="">
                      Select Region
                    </option>

                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>

                  {errors.receiverRegion && (
                    <p className="text-error text-sm mt-1">
                      {errors.receiverRegion.message}
                    </p>
                  )}
                </div>

                {/* Service Center */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Select Service Center
                    </span>
                  </label>

                  <select
                    className="select select-bordered w-full"
                    disabled={!receiverRegion}
                    {...register("receiverServiceCenter", {
                      required: "Receiver service center is required",
                    })}
                  >
                    <option value="">
                      {receiverRegion
                        ? "Select Service Center"
                        : "Select region first"}
                    </option>

                    {receiverRegion &&
                      serviceCenters[receiverRegion]?.map((center) => (
                        <option key={center} value={center}>
                          {center}
                        </option>
                      ))}
                  </select>

                  {errors.receiverServiceCenter && (
                    <p className="text-error text-sm mt-1">
                      {errors.receiverServiceCenter.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Address
                    </span>
                  </label>

                  <textarea
                    rows="3"
                    placeholder="Enter delivery address"
                    className="textarea textarea-bordered w-full"
                    {...register("receiverAddress", {
                      required: "Receiver address is required",
                    })}
                  />

                  {errors.receiverAddress && (
                    <p className="text-error text-sm mt-1">
                      {errors.receiverAddress.message}
                    </p>
                  )}
                </div>

                {/* Delivery Instruction */}
                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Delivery Instruction
                    </span>
                  </label>

                  <textarea
                    rows="2"
                    placeholder="Example: Call before delivery"
                    className="textarea textarea-bordered w-full"
                    {...register("deliveryInstruction", {
                      required: "Delivery instruction is required",
                    })}
                  />

                  {errors.deliveryInstruction && (
                    <p className="text-error text-sm mt-1">
                      {errors.deliveryInstruction.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================= SUBMIT ================= */}
          <div className="flex justify-center pb-10">
            <button
              type="submit"
              className="btn btn-primary px-10"
            >
              Submit Parcel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SendParcel;
