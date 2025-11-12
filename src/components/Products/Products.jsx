"use client"; // since we use useEffect and useState

import React, { useState, useEffect } from "react";
import styles from "./Products.module.css";
import { client } from "../../utils/sanityClient"; 
import { FaSearch } from "react-icons/fa";
import Link from "next/link"; 
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../ProductCard/ProductCard";

const Products = ({ selectedProducts, onToggleSelect }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
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
         productFaqs[]{
          question,
          answer,
        },
      metaTitle,
      metaDescription,
      schemaMarkup
      }`)
      
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  // 📱 Adjust items per page based on screen width
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      setItemsPerPage(width <= 480 ? 3 : 6);
    };

    updateItemsPerPage(); // Initial call
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // 🔎 Filter based on search query
  const filteredProducts = products.filter((product) => {
    const query = (searchQuery || "")
      .toLowerCase()
      .trim()
      .replace(/\u00A0/g, " ");

    return (
      (product.productName ?? "").toLowerCase().includes(query) ||
      (product.companyType ?? "").toLowerCase().includes(query) ||
      (product.tags || []).some((tag) =>
        (tag ?? "").toLowerCase().replace(/\u00A0/g, " ").includes(query)
      )
    );
  });

  // 📊 Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // ⏩ Handlers
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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
          // optionally, onChange handler here
          />
        </div>
      </div>

      <div className={styles.productGrid}>
        {visibleProducts
          .filter((product) => {
            const query = (searchQuery || "").toLowerCase();
            return (
              product.productName?.toLowerCase().includes(query) ||
              product.companyType?.toLowerCase().includes(query) ||
              product.tags?.some(tag => tag.toLowerCase().includes(query))
            );
          }).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isSelected={selectedProducts.some((p) => p._id === product._id)}
              onToggleSelect={onToggleSelect}
            />
          ))}
      </div>
      {totalPages > 1 && (
        <div className={styles.carouselControls}>
          <button onClick={handlePrev} disabled={currentPage === 0}>
            &#8592; Prev
          </button>

          {/* Numbered page buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index ? styles.activePage : ''}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          ))}

          <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
            Next &#8594;
          </button>
        </div>
      )}
    </section>
  );
};

export default Products;
