"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // ✅ App router hook
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import RequestDemo from "@/components/RequestDemo/RequestDemo.jsx";

const RequestDemoPage = () => {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const productsParam = searchParams.get("products");
    if (productsParam) {
      try {
        const parsed = JSON.parse(productsParam);
        setProducts(parsed);
      } catch (err) {
        console.error("Failed to parse products from query:", err);
      }
    } else {
      const stored = localStorage.getItem("selectedProducts");
      if (stored) setProducts(JSON.parse(stored));
    }
  }, [searchParams]);

  return (
    <div>
      <Header />
      <RequestDemo allProducts={products} />
      <Footer />
    </div>
  );
};

export default RequestDemoPage;
