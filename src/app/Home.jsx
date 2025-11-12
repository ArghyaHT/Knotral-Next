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
import Script from "next/script";

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

   const schemaWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Knotral",
    "url": "https://knotral.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://knotral.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

    const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Knotral",
  "url": "https://knotral.com",
  "logo": "https://knotral.com/assets/logo.png",
  "description": "Knotral is a curated EdTech marketplace connecting schools, resellers, and education innovators with global learning solutions across early years, K-12, and teacher development.",
  "sameAs": [
    "https://www.linkedin.com/company/knotral",
    "https://www.facebook.com/knotral",
    "https://twitter.com/knotral"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-88001 06877",
    "contactType": "customer support",
    "areaServed": "IN",
    "availableLanguage": ["English"]
  },
  "founder": {
    "@type": "Person",
    "name": "Dhiraj Trakru"
  },
  "foundingDate": "2024-01-01",
  "foundingLocation": {
    "@type": "Place",
    "name": "Faridabad, India"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Faridabad",
    "addressRegion": "Haryana",
    "addressCountry": "IN"
  }
}

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Knotral EdTech Solutions",
    "description":
      "Explore global education technology solutions for schools and resellers — from literacy intervention to SEL, game-based learning, and teacher development.",
    "url": "https://knotral.com",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "IDL — Literacy & Numeracy Intervention",
        "url": "https://knotral.com/idl",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Number Hive — Game-Based Maths Learning",
        "url": "https://knotral.com/number-hive",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Save My Exams — Revision Platform",
        "url": "https://knotral.com/save-my-exams",
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Express Publishing — English Language Learning",
        "url": "https://knotral.com/express-publishing",
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Better Together Cubed — SEL Programme",
        "url": "https://knotral.com/better-together-cubed-bt",
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "OneHE — Teacher Professional Development",
        "url": "https://knotral.com/onehe",
      },
    ],
  };

  const addressSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Knotral",
  "image": "https://knotral.com/assets/logo.png",
  "url": "https://knotral.com",
  "telephone": "+91-88001 06877",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sector 15",
    "addressLocality": "Faridabad",
    "addressRegion": "Haryana",
    "postalCode": "121007",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.4089,
    "longitude": 77.3178
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "founder": {
    "@type": "Person",
    "name": "Dhiraj Trakru"
  }
}


const ogSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Thing",
      "name": "Knotral",
      "description": "Knotral connects global EdTech innovators with Indian schools and resellers, offering world-class digital learning solutions for literacy, numeracy, SEL and teacher development.",
      "url": "https://knotral.com"
    },
    {
      "@type": "EducationalAudience",
      "educationalRole": ["teachers", "school administrators", "resellers", "education consultants"]
    },
    {
      "@type": "SpecialAnnouncement",
      "name": "Partner With Knotral",
      "text": "Partner with Knotral to represent global EdTech brands and bring world-class learning solutions to Indian schools.",
      "url": "https://knotral.com/all-products"
    }
  ]
}

  return (
    <>
      <Head>
        <title>Knotral</title>
        <meta name="description" content="This is header page" />
        <link rel="canonical" href={canonicalUrl} />
       <Script
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Script
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
      />

      <Script
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />


      <Script
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(addressSchema) }}
      />


      <Script
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ogSchema) }}
      />
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
