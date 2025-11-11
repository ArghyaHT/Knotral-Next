"use client"; // since we use useEffect and useState

import Header from "@/components/Header/Header";
import Requestdemo from "@/components/RequestDemo/Requestdemo";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";

const RequestDemo = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const stored = localStorage.getItem("selectedProducts");
  if (stored) setProducts(JSON.parse(stored));
}, []);

  return (
    <div>
      <Header />
      <Requestdemo products={products} />
      <Footer />
    </div>
  );
};

export default RequestDemo;
