"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AllProducts from "../../components/AllProducts/Allproducts";
import styles from "../Home/Home.module.css";



const AllProductsPage = ({ products }) => {
  const router = useRouter();


  // ✅ Maintain selected products
  const [selectedProducts, setSelectedProducts] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selectedProducts");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // ✅ Sync selectedProducts to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    }
  }, [selectedProducts]);

  // ✅ Toggle selection
  const handleToggleSelect = (product) => {
    setSelectedProducts((prevSelected) => {
      const exists = prevSelected.find((p) => p._id === product._id);
      const updated = exists
        ? prevSelected.filter((p) => p._id !== product._id)
        : [...prevSelected, product];

      console.log("Selected Products:", updated);
      return updated;
    });
  };

  // ✅ Navigate with query params (Next.js doesn’t support state like React Router)
  const handleClick = () => {
    const encodedProducts = encodeURIComponent(JSON.stringify(selectedProducts));
    router.push(`/request-demo?products=${encodedProducts}`);
  };

  return (
    <div>
      <Header />
      <AllProducts
        products={products}
        selectedProducts={selectedProducts}
        onToggleSelect={handleToggleSelect}
      />
      <Footer />

      {selectedProducts.length > 0 && (
        <div className={styles.stickyBar}>
          <p className={styles.pendingDesc}>
            <span className={styles.pendingCount}>{selectedProducts.length}</span>{" "}
            Pending Request
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.stickyBarButton} onClick={handleClick}>
              Click to complete request
              <span className={styles.arrow}>&raquo;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductsPage;
