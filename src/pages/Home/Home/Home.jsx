import Banner from "../Banner/Banner";
import BeMerchant from "../BeMerchant/BeMerchant";
import Benefits from "../Benefits/Benefits";
import ClientLogos from "../ClientLogos/ClientLogos";
import CustomerReviews from "../CustomerReviews/CustomerReviews";
import FAQ from "../FAQ/FAQ";
import Services from "../Services/Services";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientLogos></ClientLogos>
            <Benefits></Benefits>
            <BeMerchant></BeMerchant>
            <CustomerReviews></CustomerReviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;