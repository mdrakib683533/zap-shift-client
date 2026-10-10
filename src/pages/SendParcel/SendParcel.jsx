import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaCreditCard,
  FaBox,
  FaUser,
  FaMapMarkerAlt,
  FaArrowRight,
  FaTruck,
  FaWeightHanging,
} from "react-icons/fa";

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

  const regions = [...new Set(serviceCenters.map((item) => item.region))];

  const senderDistricts = serviceCenters.filter(
    (item) => item.region === senderRegion,
  );

  const receiverDistricts = serviceCenters.filter(
    (item) => item.region === receiverRegion,
  );

  // Existing delivery cost calculation
  const calculateCost = () => {
    if (!senderDistrict || !receiverDistrict) return 0;

    const sameDistrict = senderDistrict === receiverDistrict;

    if (parcelType === "document") {
      return sameDistrict ? 60 : 80;
    }

    if (!weight) return 0;

    let cost = sameDistrict ? 110 : 150;

    if (Number(weight) > 3) {
      cost += Math.ceil(Number(weight) - 3) * 40;
    }

    return cost;
  };

  const deliveryCost = calculateCost();

  // Existing parcel submission logic
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

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } w-[min(360px,calc(100vw-24px))] rounded-2xl border border-base-300 bg-base-100 p-4 shadow-2xl sm:p-5`}
      >
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00BF83]/10 text-lg text-[#009966]">
            <FaBox />
          </div>
          <div>
            <h3 className="font-bold">Confirm Your Parcel</h3>
            <p className="text-xs text-base-content/60">
              Review your delivery cost
            </p>
          </div>
        </div>

        <div className="mb-4 rounded-xl bg-base-200 p-3">
          <p className="text-xs text-base-content/60">
            Calculated delivery cost
          </p>
          <p className="mt-1 text-2xl font-extrabold text-[#009966]">
            {deliveryCost} tk
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              toast.dismiss(t.id);

              console.log("Confirmed Parcel:", parcelData);

              axiosSecure.post("/parcels", parcelData).then((res) => {
                console.log(res.data);

                if (res.data.insertedId) {
                  toast.success("Redirecting to payment...", {
                    icon: "✅",
                    duration: 3000,
                  });

                  navigate("/dashboard/myParcels");
                }
              });
            }}
            className="btn min-h-10 flex-1 border-none bg-[#00BF83] text-white hover:bg-[#009966]"
          >
            <FaCreditCard />
            Proceed to Payment
          </button>

          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            className="btn min-h-10 flex-1"
          >
            Edit
          </button>
        </div>
      </div>
    ));
  };

  // Compact UI styles
  const inputClass =
    "input input-bordered h-10 min-h-10 w-full rounded-lg border-base-300 bg-base-100 text-sm focus:border-[#00BF83] focus:outline-none focus:ring-1 focus:ring-[#00BF83]/20";

  const selectClass =
    "select select-bordered h-10 min-h-10 w-full rounded-lg border-base-300 bg-base-100 text-sm focus:border-[#00BF83] focus:outline-none focus:ring-1 focus:ring-[#00BF83]/20";

  const textareaClass =
    "textarea textarea-bordered min-h-16 w-full rounded-lg border-base-300 bg-base-100 text-sm focus:border-[#00BF83] focus:outline-none focus:ring-1 focus:ring-[#00BF83]/20";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-base-content/75 sm:text-sm";

  return (
    <div className="min-h-screen bg-base-200/40">
      <div className="mx-auto max-w-6xl px-3 py-5 sm:px-5 sm:py-7 lg:px-6">
        {/* Compact page heading */}
        <div className="relative mb-5 overflow-hidden rounded-2xl bg-base-100 shadow-sm">
          <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-[#00BF83]/10 sm:h-44 sm:w-44" />

          <div className="relative flex items-center gap-3 px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00BF83]/10 text-xl text-[#009966] sm:h-12 sm:w-12">
              <FaTruck />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Send Your <span className="text-[#00BF83]">Parcel</span>
              </h1>
              <p className="mt-1 text-xs text-base-content/60 sm:text-sm">
                Fast, safe and reliable parcel delivery.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Parcel information */}
          <section className="overflow-hidden rounded-xl border border-base-300/70 bg-base-100 shadow-sm">
            <div className="flex items-center gap-2.5 border-b border-base-300/70 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00BF83]/10 text-[#009966]">
                <FaBox />
              </div>
              <div>
                <h2 className="text-base font-bold sm:text-lg">
                  Parcel Information
                </h2>
                <p className="text-xs text-base-content/55">
                  Basic parcel details
                </p>
              </div>
            </div>

            <div className="space-y-4 p-4">
              <div>
                <label className={labelClass}>Parcel Type</label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 transition ${
                      parcelType === "document"
                        ? "border-[#00BF83] bg-[#00BF83]/5"
                        : "border-base-300 hover:border-[#00BF83]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="parcelType"
                      value="document"
                      checked={parcelType === "document"}
                      onChange={(e) => setParcelType(e.target.value)}
                      className="radio radio-sm checked:border-[#00BF83] checked:bg-[#00BF83]"
                    />
                    <div>
                      <p className="text-sm font-bold">Document</p>
                      <p className="text-xs text-base-content/55">
                        Letters and papers
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 transition ${
                      parcelType === "non-document"
                        ? "border-[#00BF83] bg-[#00BF83]/5"
                        : "border-base-300 hover:border-[#00BF83]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="parcelType"
                      value="non-document"
                      checked={parcelType === "non-document"}
                      onChange={(e) => setParcelType(e.target.value)}
                      className="radio radio-sm checked:border-[#00BF83] checked:bg-[#00BF83]"
                    />
                    <div>
                      <p className="text-sm font-bold">Non-Document</p>
                      <p className="text-xs text-base-content/55">
                        Packages and goods
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div
                className={`grid grid-cols-1 gap-3 ${
                  parcelType === "non-document" ? "sm:grid-cols-2" : ""
                }`}
              >
                <div>
                  <label className={labelClass}>Parcel Name</label>
                  <input
                    type="text"
                    name="parcelName"
                    placeholder="e.g. Books, Documents"
                    className={inputClass}
                    required
                  />
                </div>

                {parcelType === "non-document" && (
                  <div>
                    <label className={labelClass}>
                      <span className="inline-flex items-center gap-1.5">
                        <FaWeightHanging className="text-[#00BF83]" />
                        Weight (kg)
                      </span>
                    </label>
                    <input
                      type="number"
                      name="weight"
                      min="0.1"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Enter weight"
                      className={inputClass}
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Sender and receiver */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
            {/* Sender information */}
            <section className="overflow-hidden rounded-xl border border-base-300/70 bg-base-100 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-base-300/70 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00BF83]/10 text-[#009966]">
                  <FaUser />
                </div>
                <div>
                  <h2 className="text-base font-bold sm:text-lg">
                    Sender Information
                  </h2>
                  <p className="text-xs text-base-content/55">
                    Parcel pickup details
                  </p>
                </div>
              </div>

              <div className="space-y-3 p-4">
                <div>
                  <label className={labelClass}>Sender Name</label>
                  <input
                    name="senderName"
                    placeholder="Enter sender name"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Contact Number</label>
                  <input
                    name="senderContact"
                    placeholder="Enter contact number"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Region</label>
                    <select
                      value={senderRegion}
                      onChange={(e) => {
                        setSenderRegion(e.target.value);
                        setSenderDistrict("");
                      }}
                      className={selectClass}
                      required
                    >
                      <option value="">Select region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>District / Center</label>
                    <select
                      value={senderDistrict}
                      onChange={(e) => setSenderDistrict(e.target.value)}
                      className={selectClass}
                      disabled={!senderRegion}
                      required
                    >
                      <option value="">Select district</option>
                      {senderDistricts.map((item) => (
                        <option key={item.id} value={item.district}>
                          {item.district}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Pickup Address</label>
                  <textarea
                    name="senderAddress"
                    placeholder="House, road, area and other details"
                    className={textareaClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Pickup Instructions{" "}
                    <span className="font-normal text-base-content/45">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    name="pickupInstruction"
                    placeholder="Special pickup instructions"
                    className={textareaClass}
                  />
                </div>
              </div>
            </section>

            {/* Receiver information */}
            <section className="overflow-hidden rounded-xl border border-base-300/70 bg-base-100 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-base-300/70 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B8D469]/25 text-base-content">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h2 className="text-base font-bold sm:text-lg">
                    Receiver Information
                  </h2>
                  <p className="text-xs text-base-content/55">
                    Parcel delivery details
                  </p>
                </div>
              </div>

              <div className="space-y-3 p-4">
                <div>
                  <label className={labelClass}>Receiver Name</label>
                  <input
                    name="receiverName"
                    placeholder="Enter receiver name"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Contact Number</label>
                  <input
                    name="receiverContact"
                    placeholder="Enter contact number"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Region</label>
                    <select
                      value={receiverRegion}
                      onChange={(e) => {
                        setReceiverRegion(e.target.value);
                        setReceiverDistrict("");
                      }}
                      className={selectClass}
                      required
                    >
                      <option value="">Select region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>District / Center</label>
                    <select
                      value={receiverDistrict}
                      onChange={(e) => setReceiverDistrict(e.target.value)}
                      className={selectClass}
                      disabled={!receiverRegion}
                      required
                    >
                      <option value="">Select district</option>
                      {receiverDistricts.map((item) => (
                        <option key={item.id} value={item.district}>
                          {item.district}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Delivery Address</label>
                  <textarea
                    name="receiverAddress"
                    placeholder="House, road, area and other details"
                    className={textareaClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Delivery Instructions{" "}
                    <span className="font-normal text-base-content/45">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    name="deliveryInstruction"
                    placeholder="Special delivery instructions"
                    className={textareaClass}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Delivery cost */}
          <section className="rounded-xl border border-base-300/70 bg-base-100 shadow-sm">
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
              <div>
                <p className="text-xs font-semibold text-base-content/60 sm:text-sm">
                  Total Delivery Cost
                </p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-[#009966]">
                    {deliveryCost}
                  </span>
                  <span className="text-sm font-semibold text-base-content/60">
                    tk
                  </span>
                </div>
                <p className="mt-1 text-xs text-base-content/50">
                  Calculated from your selected districts and parcel type.
                </p>
              </div>

              <button
                type="submit"
                className="btn min-h-11 w-full rounded-lg border-none bg-[#00BF83] px-6 text-sm font-bold text-white hover:bg-[#009966] sm:w-auto"
              >
                Submit Parcel
                <FaArrowRight />
              </button>
            </div>
          </section>
        </form>

        <p className="mt-4 text-center text-xs text-base-content/45">
          Zap Shift · Reliable parcel delivery
        </p>
      </div>
    </div>
  );
};

export default SendParcel;
