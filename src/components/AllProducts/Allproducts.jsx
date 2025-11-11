import React, { useState, useEffect } from "react";
import styles from "./AllProducts.module.css";
import { client } from "../../utils/sanityClient";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";

const AllProducts = ({ selectedProducts, onToggleSelect }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 📦 Fetch products from Sanity
  useEffect(() => {
    client
      .fetch(`*[_type == "product"]{
        _id,
        productName,
        "slug": slug.current,
        "productLogo": productLogo.asset->url,
        "featuredImage": featuredImage.asset->url,
        "galleryImages": galleryImages[].asset->url,
        heading,
        slug,
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
        currency, 
        productFor,    
        aboutHeading,
        subscriptionType,
        trialType,
        aboutDescription,
        reviews[]{
          reviewerName,
          reviewText,
          "reviewProfileImage": reviewProfileImage.asset->url
        },
      metaTitle,
      metaDescription,
      schemaMarkup
      }`)
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  // 🔎 Filter based on search query
  const filteredProducts = products.filter((product) => {
    const query = (searchQuery || "").toLowerCase().trim().replace(/\u00A0/g, " ");
    return (
      (product.productName ?? "").toLowerCase().includes(query) ||
      (product.companyType ?? "").toLowerCase().includes(query) ||
      (product.tags || []).some((tag) =>
        (tag ?? "").toLowerCase().replace(/\u00A0/g, " ").includes(query)
      )
    );
  });

  return (
    <section className={styles.products}>
      <h2 className={styles.productsHeading}>Global Education Solutions</h2>

      <div className={styles.searchBarWrapper}>
        <div className={styles.searchInputContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search your solution"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isSelected={selectedProducts.some((p) => p._id === product._id)}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
