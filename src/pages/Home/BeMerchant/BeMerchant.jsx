import location from "../../../assets/location.png";
const BeMerchant = () => {
  return (
    <div data-aos="zoom-in" className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] p-20 rounded-4xl">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          alt="Tailwind CSS hero component"
          src={location}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl text-white font-bold">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-gray-400">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn btn-primary rounded-full">Become A Merchant</button>
          <button className="btn btn-primary btn-outline rounded-full ml-4">Become A Merchant</button>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
