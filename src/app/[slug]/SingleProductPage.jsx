
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SingleProduct from "../../components/SingleProduct/SingleProduct";

const SingleProductPage = ({product, slug }) => {

  return (
    <div>
      <Header />
      <SingleProduct product={product} slug={slug} />
      <Footer />
    </div>
  );
};

export default SingleProductPage;
