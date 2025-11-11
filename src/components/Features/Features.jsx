import styles from "../Features/Features.module.css"
import featureImage from "../../assets/feature.png"
import featureImage1 from "../../assets/featureImage1.png"
import productLogo from "../../assets/productLogo.png"
import { client } from "../../utils/sanityClient";
import { useEffect, useState } from "react";
import Link from "next/link"; // ✅ Replaced react-router-dom Link


// const products = [
//   {
//     id: 1,
//     title: "We Skoolhouse",
//     description: "From New York’s Top Preschool",
//     productLogo: productLogo

//   },
//   {
//     id: 2,
//     title: "We Skoolhouse",
//     description: "From New York’s Top Preschool",
//     productLogo: productLogo

//   }
// ];

const Features = () => {
  const [feature, setFeature] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);


  useEffect(() => {
    client
      .fetch(`*[_type == "video"]{
      _id,
      videoUrl
    }`)
      .then((data) => setFeature(data))
      .catch(console.error);

    // Fetch last 2 featured products, all fields included
    client
      .fetch(`*[_type == "product" && isFeatured == true] | order(_createdAt desc)[0..1] {
         _id,
        productName,
        "productLogo": productLogo.asset->url,
        "featuredImage": featuredImage.asset->url,
        "galleryImages": galleryImages[].asset->url,
        heading,
        shortDescription,
        longDescription,
        companyType,
        tags,
        companyName,
        hqLocation,
        founded,
        age,
        grade,
        features,
        perfectFor,
        awards,
        language,
        training,
        support,
        price,
        aboutHeading,
        aboutDescription,
        reviews[]{
          reviewerName,
          reviewText,
          "reviewProfileImage": reviewProfileImage.asset->url
        },
      metaTitle,
      metaDescription,
      canonicalUrl,
      schemaMarkup
      }`)
      .then((data) => setFeaturedProducts(data))
      .catch(console.error);

  }, []);

  const latestVideo = feature[0]; // Most recent video

  const getEmbedUrl = (url) => {
    const match = url?.match(/(?:\?v=|\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = getEmbedUrl(latestVideo?.videoUrl);
  return (
    <section className={styles.features}>
      <h2 className={styles.featureHeading}>Newly Launched</h2>
      {latestVideo?.videoUrl ? (
        <div className={styles.videoWrapper}>
          <iframe
            className={styles.youtubeEmbed}
            src={embedUrl}
            // src="https://www.youtube.com/watch?v=M8WJsQXfZU4&ab_channel=IndiaMarketEntry"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>Loading video...</p>
      )
      }

      {/* Dynamic two cards below the video */}
      <div className={styles.productsRow}>
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <div key={product.id} className={styles.product}>
              {/* Left section: heading + description + button */}
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{product.productName}</h3>
                <p className={styles.productDesc}>{product.shortDescription}</p>
                <Link
                  to={`/${product.slug}`}
                  state={{ product }}
                  className={styles.learnMoreButton}
                >
                  Learn More
                </Link>
              </div>

              {/* Right section: image */}
              <div className={styles.productImageWrapper}>
                <img
                  src={product.productLogo}
                  alt={product.title}
                  className={styles.productImage}
                />
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noProducts}>No featured products available.</p>
        )}
      </div>
    </section>
  );

}

export default Features;