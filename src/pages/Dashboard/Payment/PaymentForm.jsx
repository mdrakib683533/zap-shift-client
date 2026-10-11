import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <p className="text-center py-10">Loading parcel...</p>;
  }

  const amount = parcelInfo.deliveryCost;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent repeated clicks while payment is processing
    if (isProcessing) return;

    if (!stripe || !elements) {
      setError("Payment system is not ready. Please try again.");
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      setError("Card information is missing.");
      return;
    }

    // Disable the button immediately
    setIsProcessing(true);
    setError("");

    try {
      // Step 1: Validate card details
      const { error: cardError } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (cardError) {
        setError(cardError.message);
        return;
      }

      // Step 2: Create PaymentIntent
      const res = await axiosSecure.post("/create-payment-intent", {
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      // Step 3: Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        // Step 4: Verify payment and save payment history
        const paymentData = {
          parcelId,
          userEmail: user.email,
          amount,
          transactionId,
          paymentMethod: "card",
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.success) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `
              <p>Your payment has been completed successfully.</p>
              <p class="mt-3"><strong>Transaction ID:</strong></p>
              <p class="text-sm break-all">${transactionId}</p>
            `,
            confirmButtonText: "Go to My Parcels",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/dashboard/myParcels");
            }
          });
        }
      }
    } catch (err) {
      console.error("Payment error:", err);

      setError(
        err.response?.data?.message || "Payment failed. Please try again.",
      );
    } finally {
      // Re-enable the button after success or failure
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded" />

        <button
          type="submit"
          className="btn w-full bg-[#B8D469] hover:bg-[#A6C45B] disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Processing Payment...
            </>
          ) : (
            `Pay $${amount}`
          )}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
