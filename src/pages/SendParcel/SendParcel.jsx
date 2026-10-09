import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCreditCard } from "react-icons/fa";

const generateTrackingId = () => {
  const date = new Date();
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `ZP-${datePart}-${randomPart}`;
};

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const navigate = useNavigate();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [parcelType, setParcelType] = useState("document");
  const [weight, setWeight] = useState("");

  const [senderRegion, setSenderRegion] = useState("");
  const [senderDistrict, setSenderDistrict] = useState("");

  const [receiverRegion, setReceiverRegion] = useState("");
  const [receiverDistrict, setReceiverDistrict] = useState("");

  // Get unique regions
  const regions = [...new Set(serviceCenters.map((item) => item.region))];

  // Sender districts based on selected region
  const senderDistricts = serviceCenters.filter(
    (item) => item.region === senderRegion,
  );

  // Receiver districts based on selected region
  const receiverDistricts = serviceCenters.filter(
    (item) => item.region === receiverRegion,
  );

  // Calculate delivery cost
  const calculateCost = () => {
    if (!senderDistrict || !receiverDistrict) return 0;

    const sameDistrict = senderDistrict === receiverDistrict;

    // Document pricing
    if (parcelType === "document") {
      return sameDistrict ? 60 : 80;
    }

    // Non-document
    if (!weight) return 0;

    let cost = sameDistrict ? 110 : 150;

    // Extra charge for weight above 3kg
    if (Number(weight) > 3) {
      cost += Math.ceil(Number(weight) - 3) * 40;
    }

    return cost;
  };

  const deliveryCost = calculateCost();

  // Submit parcel
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const parcelData = {
      parcelType,

      parcelName: form.parcelName.value,

      weight: parcelType === "non-document" ? Number(weight) : null,
      payment_status: "unpaid",
      delivery_status: "not_collected",
      createdBy: user.email,
      createdAt: new Date().toISOString(),
      trackingId: generateTrackingId(),

      sender: {
        name: form.senderName.value,
        contact: form.senderContact.value,
        region: senderRegion,
        district: senderDistrict,
        address: form.senderAddress.value,
        pickupInstruction: form.pickupInstruction.value,
      },

      receiver: {
        name: form.receiverName.value,
        contact: form.receiverContact.value,
        region: receiverRegion,
        district: receiverDistrict,
        address: form.receiverAddress.value,
        deliveryInstruction: form.deliveryInstruction.value,
      },

      deliveryCost,
    };

    // Large confirmation toast
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } bg-base-100 shadow-2xl rounded-2xl p-6 w-[380px] border border-base-300`}
      >
        <h3 className="text-xl font-bold mb-2">Confirm Your Parcel</h3>

        <p className="text-gray-500 mb-2">Your calculated delivery cost is:</p>

        <p className="text-3xl font-bold text-primary mb-6">
          {deliveryCost} tk
        </p>

        <div className="flex gap-3">

          {/* Confirm Button */}
          <button
            type="button"
            onClick={() => {
              toast.dismiss(t.id);

              console.log("Confirmed Parcel:", parcelData);

              // save data to the server
              axiosSecure.post("/parcels", parcelData).then((res) => {
                console.log(res.data);

                if (res.data.insertedId) {
                  toast.success("Redirecting to payment...", {
                    icon: "✅",
                    duration: 3000,
                  });
                  navigate('/dashboard/myParcels')
                }
              });
            }}
            className="btn btn-primary flex-1"
          >
            <FaCreditCard />
            Proceed to Payment
          </button>
          {/* Edit Button */}
          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-outline flex-1"
          >
            Edit
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Send Your Parcel</h1>

        <p className="text-gray-500 mt-2">
          Send your parcel safely and quickly.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Parcel Information */}
        <div className="card bg-base-200 p-6 shadow mb-8">
          <h2 className="text-2xl font-bold mb-5">Parcel Info</h2>

          {/* Parcel Type */}
          <div className="flex gap-6 mb-5">
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="parcelType"
                value="document"
                checked={parcelType === "document"}
                onChange={(e) => setParcelType(e.target.value)}
                className="radio"
              />
              Document
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="parcelType"
                value="non-document"
                checked={parcelType === "non-document"}
                onChange={(e) => setParcelType(e.target.value)}
                className="radio"
              />
              Non-Document
            </label>
          </div>

          {/* Parcel Name */}
          <input
            type="text"
            name="parcelName"
            placeholder="Parcel Name"
            className="input input-bordered w-full mb-4"
            required
          />

          {/* Weight */}
          {parcelType === "non-document" && (
            <input
              type="number"
              name="weight"
              min="0.1"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight (kg)"
              className="input input-bordered w-full"
              required
            />
          )}
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sender Information */}
          <div className="card bg-base-200 p-6 shadow">
            <h2 className="text-2xl font-bold mb-5">Sender Information</h2>

            <div className="space-y-4">
              {/* Sender Name */}
              <input
                name="senderName"
                placeholder="Sender Name"
                className="input input-bordered w-full"
                required
              />

              {/* Sender Contact */}
              <input
                name="senderContact"
                placeholder="Sender Contact"
                className="input input-bordered w-full"
                required
              />

              {/* Sender Region */}
              <select
                value={senderRegion}
                onChange={(e) => {
                  setSenderRegion(e.target.value);
                  setSenderDistrict("");
                }}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Region</option>

                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {/* Sender District */}
              <select
                value={senderDistrict}
                onChange={(e) => setSenderDistrict(e.target.value)}
                className="select select-bordered w-full"
                disabled={!senderRegion}
                required
              >
                <option value="">Select Service Center</option>

                {senderDistricts.map((item) => (
                  <option key={item.id} value={item.district}>
                    {item.district}
                  </option>
                ))}
              </select>

              {/* Sender Address */}
              <textarea
                name="senderAddress"
                placeholder="Sender Address"
                className="textarea textarea-bordered w-full"
                required
              />

              {/* Pickup Instruction */}
              <textarea
                name="pickupInstruction"
                placeholder="Pickup Instruction"
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>

          {/* Receiver Information */}
          <div className="card bg-base-200 p-6 shadow">
            <h2 className="text-2xl font-bold mb-5">Receiver Information</h2>

            <div className="space-y-4">
              {/* Receiver Name */}
              <input
                name="receiverName"
                placeholder="Receiver Name"
                className="input input-bordered w-full"
                required
              />

              {/* Receiver Contact */}
              <input
                name="receiverContact"
                placeholder="Receiver Contact"
                className="input input-bordered w-full"
                required
              />

              {/* Receiver Region */}
              <select
                value={receiverRegion}
                onChange={(e) => {
                  setReceiverRegion(e.target.value);
                  setReceiverDistrict("");
                }}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Region</option>

                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {/* Receiver District */}
              <select
                value={receiverDistrict}
                onChange={(e) => setReceiverDistrict(e.target.value)}
                className="select select-bordered w-full"
                disabled={!receiverRegion}
                required
              >
                <option value="">Select Service Center</option>

                {receiverDistricts.map((item) => (
                  <option key={item.id} value={item.district}>
                    {item.district}
                  </option>
                ))}
              </select>

              {/* Receiver Address */}
              <textarea
                name="receiverAddress"
                placeholder="Receiver Address"
                className="textarea textarea-bordered w-full"
                required
              />

              {/* Delivery Instruction */}
              <textarea
                name="deliveryInstruction"
                placeholder="Delivery Instruction"
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* Delivery Cost */}
        <div className="card bg-base-200 p-6 shadow mt-8">
          <h2 className="text-2xl font-bold">
            Delivery Cost: {deliveryCost} tk.
          </h2>

          <button type="submit" className="btn btn-primary mt-4">
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
