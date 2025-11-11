import React, { useState } from "react";
import styles from "./InquireNow.module.css";
import { client } from "../../utils/sanityClient";

const InquireNow = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",        // added email field
    phone: "",
    country: "",
    company: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.create({
        _type: "lead",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,  // map phone -> phoneNumber
        country: formData.country,
        company: formData.company,
        message: formData.message,
        submittedAt: new Date().toISOString(),  // matches schema
      });
      console.log("✅ Lead submitted:", response);
      alert("Thank you! We'll contact you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        company: "",
        message: ""
      });
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Submission failed. Try again later.");
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.contactHeading}>Contact Us</h2>
      <form className={styles.contactForm} onSubmit={handleSubmit}>

        <div className={styles.row}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className={styles.row}>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          rows="5"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default InquireNow;
