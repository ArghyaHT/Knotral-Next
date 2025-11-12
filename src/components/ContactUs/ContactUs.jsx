import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ContactUs.module.css";
import styles1 from "@/components/Requestdemo/Requestdemo.module.css";
import { client } from "../../utils/sanityClient";
import contactImage from "../../assets/contactImage.png";
import { useRouter } from "next/navigation";

const ContactUs = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    phoneNumber: "",
    message: ""
  });

  // Fetch products from Sanity
  useEffect(() => {
    client
      .fetch(`*[_type == "product"]{
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
        }
      }`)
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const onlyDigits = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: onlyDigits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.create({
        _type: "lead",
        formType: "get-in-touch",
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        category: selectedCategory,
        productName: selectedProduct,
        message: formData.message,
        submittedAt: new Date().toISOString()
      });

      setShowPopup(true);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        role: "",
        phoneNumber: "",
        message: ""
      });
      setSelectedCategory("");
      setSelectedProduct("");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactContent}>
        {/* Left: Image */}
        <div className={styles.contactImageWrapper}>
          <Image
            src={contactImage}
            alt="Contact"
            className={styles.contactImage}
          />
        </div>

        {/* Right: Form */}
        <div className={styles.formSection}>
          <h3 className={styles.formHeading}>Get In Touch</h3>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">
                  Full Name<span className={styles.requiredTag}>(Required)</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">
                  Phone Number<span className={styles.requiredTag}>(Required)</span>
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">
                Email<span className={styles.requiredTag}>(Required)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role">
                What best describes me? <span className={styles.requiredTag}>(Required)</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">-- Select an option --</option>
                <option value="institutional-leader">Institutional Leader</option>
                <option value="educator">Educator</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="reseller-distributor">Reseller / Distributor</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>Submit Now</button>
          </form>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className={styles1.popupOverlay}>
          <div className={styles1.popup}>
            <h2>Thank You!</h2>
            <p>We've received your request and will contact you shortly.</p>
            <button
              onClick={() => {
                setShowPopup(false);
                localStorage.clear();
                router.push("/");
              }}
              className={styles1.popupButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
