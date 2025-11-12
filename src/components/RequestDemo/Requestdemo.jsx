"use client"; // Required because we use useState, useEffect

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Requestdemo.module.css"
import SelectedProductCard from "../SelectedProductCard/SelectedProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { client } from "../../utils/sanityClient";
import { FaChevronDown } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Requestdemo = ({ allProducts }) => {
  const router = useRouter();
  const swiperRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    category: "",
    productName: "",
    role: "",
    country: "",
    message: ""
  });

  const [isChecked, setIsChecked] = useState(false);
  const [formError, setFormError] = useState("");
  const [isOpen, setIsOpen] = useState(typeof window !== "undefined" && window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth <= 768);
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsOpen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get selected products from localStorage
  const initialSelectedProducts = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("selectedProducts")) || []
    : [];

  const [selectedProducts, setSelectedProducts] = useState(initialSelectedProducts);

  // Save selection to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    }
  }, [selectedProducts]);

  const selectedProductIds = selectedProducts.map((p) => p._id);
  const selectedCategories = [
    ...new Set(selectedProducts.map((p) => p.categoryTag).filter(Boolean)),
  ];

  const relatedProducts = allProducts?.filter(
    (p) => selectedCategories.includes(p.categoryTag) && !selectedProductIds.includes(p._id)
  ) || [];

  // Redirect to home if no selected products on desktop
  useEffect(() => {
    if (isOpen && selectedProducts.length === 0) {
      router.push("/");
    }
  }, [isOpen, selectedProducts, router]);

  const handleToggleProduct = (product) => {
    const isAlreadySelected = selectedProducts.some((p) => p._id === product._id);
    if (isAlreadySelected) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const onlyDigits = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: onlyDigits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      setFormError("You must agree to the terms before submitting.");
      return;
    }

    const productNames = selectedProducts.map(p => p.productName).join(", ");
    const categories = selectedProducts.map(p => p.categoryTag).join(", ");

    try {
      await client.create({
        _type: "lead",
        formType: "request-free-info",
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber, // Keep as string to avoid leading-zero issues
        category: categories,
        productName: productNames,
        role: formData.role,
        country: formData.country,
        message: formData.message,
        submittedAt: new Date().toISOString()
      });

      setShowPopup(true);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        category: "",
        productName: "",
        role: "",
        country: "",
        message: ""
      });
      setIsChecked(false);
      setFormError("");
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Submission failed. Try again later.");
    }
  };

  return (
    <div className={styles.requestDemo}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <div className={styles.yourSelection}>
          <div className={styles.header} onClick={() => isMobile && setIsOpen((prev) => !prev)}>
            <div className={styles.headerConatainer}>
              <h2 className={styles.sectionHeading}>Your Selection</h2>
              <h3 className={styles.productCount}>{selectedProducts.length}</h3>
            </div>
            {isMobile && (
              <FaChevronDown className={`${styles.dropdownIcon} ${isOpen ? styles.open : ""}`} />
            )}
          </div>

          {isOpen && selectedProducts.length > 0 && (
            <div className={styles.carouselWrapper}>
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Autoplay, Navigation, Pagination]}
                navigation={!isMobile ? { prevEl: ".custom-prev", nextEl: ".custom-next" } : false}
                spaceBetween={20}
                autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                pagination={true}
                loop={true}
                className={styles.relatedproductList}
                slidesPerView={isMobile ? 1 : 2}
              >
                {selectedProducts.map((product) => (
                  <SwiperSlide key={product._id} className={styles.relatedproductListItem}>
                    <SelectedProductCard
                      product={product}
                      isSelected={true}
                      onToggleSelect={handleToggleProduct}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div className={styles.youMayAlsoLike}>
            <h2 className={styles.sectionHeading}>You May Also Like</h2>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
              loop={true}
              className={styles.relatedproductList}
              slidesPerView={isMobile ? 1 : 2}
            >
              {relatedProducts.map((product) => (
                <SwiperSlide key={product._id} className={styles.relatedproductListItem}>
                  <SelectedProductCard
                    product={product}
                    isSelected={false}
                    onToggle={handleToggleProduct}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div className={styles.formSection}>
          <h3 className={styles.formHeading}>Request information</h3>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name<span className={styles.requiredTag}>(Required)</span></label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">Phone Number<span className={styles.requiredTag}>(Required)</span></label>
                <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email<span className={styles.requiredTag}>(Required)</span></label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role">What best describes me? <span className={styles.requiredTag}>(Required)</span></label>
              <select id="role" name="role" value={formData.role} onChange={handleChange} required>
                <option value="">-- Select an option --</option>
                <option value="institutional-leader">Institutional Leader</option>
                <option value="educator">Educator</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="reseller-distributor">Reseller / Distributor</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="country">Country</label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Comment</label>
              <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange}></textarea>
            </div>

            <div className={styles.checkboxWrapper}>
              <label>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <span className={styles.checkboxText}>
                  {isMobile && !showFullDisclaimer ? (
                    <>
                      <span>Terms & Conditions</span>{" "}
                      <button type="button" className={styles.readMoreButton} onClick={() => setShowFullDisclaimer(true)}>Read More</button>
                    </>
                  ) : (
                    <>
                      By clicking <strong>“Request Free Information”</strong>, you consent to be contacted by the Knotral team and the selected businesses via phone, text, or email at the number provided above, including for marketing purposes related to your inquiry.
                    </>
                  )}
                </span>
              </label>
            </div>

            {formError && <p className={styles.checkboxError}>{formError}</p>}

            <button type="submit" className={styles.submitButton}>Request Free Information</button>
          </form>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Thank You!</h2>
            <p>We've received your request and will contact you shortly.</p>
            <button onClick={() => {
              setShowPopup(false);
              if (typeof window !== "undefined") localStorage.clear();
              router.push("/");
            }} className={styles.popupButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requestdemo;
