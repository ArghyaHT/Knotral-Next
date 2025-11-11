import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SiteMap from "../../components/SiteMap/SiteMap";

const SiteMapPage = ({ productSlugs }) => {
  return (
    <div>
      <Header />
      <SiteMap productSlugs={productSlugs} />
      <Footer />
    </div>
  );
};

export default SiteMapPage;
