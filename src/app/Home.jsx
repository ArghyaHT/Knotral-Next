"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";


import styles from "./Home.module.css";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import AboutUs from "@/components/AboutUs/AboutUs";
import Products from "@/components/Products/Products";
import ContactUs from "@/components/ContactUs/ContactUs";
import Faq from "@/components/Faq/Faq";
import Footer from "@/components/Footer/Footer";

const Home = () => {
  const router = useRouter();
  const contactRef = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selectedProducts");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const handleToggleSelect = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      return exists
        ? prev.filter((p) => p._id !== product._id)
        : [...prev, product];
    });
  };

  const handleClick = () => {
    router.push(
      `/request-demo
      `
    );
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const canonicalUrl = `https://knotral.com`;

  return (
    <>
      <Head>
        <title>Knotral</title>
        <meta name="description" content="This is header page" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Header />
      <Hero onContactClick={scrollToContact} />
      <AboutUs />
      <Products
        selectedProducts={selectedProducts}
        onToggleSelect={handleToggleSelect}
      />
      <div ref={contactRef}>
        <ContactUs />
      </div>
      <Faq />
      <Footer />

      {selectedProducts.length > 0 && (
        <div className={styles.stickyBar}>
          <p className={styles.pendingDesc}>
            <span className={styles.pendingCount}>
              {selectedProducts.length}
            </span>{" "}
            Pending Request
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.stickyBarButton} onClick={handleClick}>
              Click to complete request{" "}
              <span className={styles.arrow}>&raquo;</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
