import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        {/* 403 Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 mt-4 rounded-full bg-error/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
              />
            </svg>
          </div>
        </div>

        {/* 403 */}
        <h1 className="text-7xl md:text-8xl font-black text-primary">403</h1>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mt-4">
          Access Restricted
        </h2>

        {/* Description */}
        <p className="text-base-content/60 mt-3 max-w-md mx-auto leading-relaxed">
          Sorry, you don't have permission to access this page. Please return to
          your dashboard and continue managing your parcels.
        </p>

        {/* Parcel visual */}
        <div className="mt-8 flex justify-center">
          <div className="bg-base-100 border border-base-300 rounded-2xl shadow-sm px-6 py-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2h-1.5L12 7 7.5 4H6a2 2 0 00-2 2v7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 13l8 4 8-4M12 7v10"
                />
              </svg>
            </div>

            <div className="text-left">
              <p className="font-semibold">Parcel Delivery</p>
              <p className="text-sm text-base-content/50">
                Secure access for authorized users
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/" className="btn btn-outline">
            Go Home
          </Link>

          <Link to="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>

        {/* Small message */}
        <p className="text-xs text-base-content/40 mt-8">
          Error Code: 403 • Forbidden Access
        </p>
      </div>
    </div>
  );
};

export default Forbidden;
