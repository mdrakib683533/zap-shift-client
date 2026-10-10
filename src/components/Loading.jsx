const Loading = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-base-100 px-4 text-center">
      {/* Delivery Illustration */}
      <div className="mb-6">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#00BF83]/10">
          <span className="text-7xl">🚚</span>

          {/* Floating parcel */}
          <span className="absolute -right-2 -top-2 animate-bounce text-4xl">
            📦
          </span>
        </div>
      </div>

      {/* Loading Title */}
      <h2 className="mb-2 text-2xl font-bold text-base-content sm:text-3xl">
        Loading Your <span className="text-[#00BF83]">Parcel</span> Journey...
      </h2>

      {/* Subtitle */}
      <p className="mb-6 max-w-md text-sm text-base-content/60 sm:text-base">
        Please wait, we're getting things ready for you.
      </p>

      {/* DaisyUI Loading Spinner */}
      <span className="loading loading-spinner loading-lg text-[#00BF83]"></span>

      <p className="mt-3 text-sm font-medium text-[#00BF83]">
        Delivering your experience...
      </p>
    </div>
  );
};

export default Loading;
