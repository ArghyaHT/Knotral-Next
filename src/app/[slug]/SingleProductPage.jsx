
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SingleProduct from "../../components/SingleProduct/SingleProduct";

const SingleProductPage = ({product, slug }) => {
  console.log("SingleProduct Page slug:", slug);

  return (
    <div>
      <Header />
      <SingleProduct slug={slug} />
      <Footer />
    </div>
  );
};

export default SingleProductPage;
