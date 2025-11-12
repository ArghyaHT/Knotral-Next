"use client"; // since we use useEffect and useState


import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
// import logo from "/assets/knotral.png";
import { useRouter } from "next/navigation"; // ✅ Next.js router
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import Link from "next/link"; // ✅ Next.js Link
import { client } from "../../utils/sanityClient";

const Header = () => {
  const router = useRouter(); // ✅ useRouter instead of useNavigate
  const [showFeedback, setShowFeedback] = useState(false);
  const [formData, setFormData] = useState({
    experience: "",
    facedIssues: "No",
    issueDetails: "",
    confusing: "",
    improvements: "",
    comments: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.create({
        _type: 'feedback',
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      alert("Thank you for your feedback!");
      setShowFeedback(false);
      setFormData({
        experience: "",
        facedIssues: "No",
        issueDetails: "",
        confusing: "",
        improvements: "",
        comments: ""
      });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      alert("Oops! Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    document.body.style.overflow = showFeedback ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showFeedback]);

  return (
    <header className={styles.header}>
      <Link href="/"> {/* ✅ Next.js Link uses href, not to */}
        <img
          src="/knotral.png"
          alt="Logo"
          className={styles.logo}
        />
      </Link>

      <div className={styles.infoContainer}>
        <div className={styles.infoBlock}>
          <div className={styles.infoTitle}>
            <FaEnvelope className={styles.icon} />
            <span>Write To Us</span>
          </div>
          <a
            href="mailto:contact@knotral.com?subject=Support Request&body=Hi Knotral Team,"
            className={styles.email}
          >
            contact@knotral.com
          </a>
        </div>

        <div className={styles.feedbackBlock}>
          <button
            className={styles.feedbackButton}
            onClick={() => setShowFeedback(prev => !prev)}
          >
            Give Feedback
          </button>
        </div>
      </div>

      {showFeedback && (
        <div className={styles.feedbackOverlay}>
          <div className={styles.feedbackModal}>
            <h2 className={styles.modalTitle}>We value your feedback</h2>
            <form className={styles.feedbackForm} onSubmit={handleSubmit}>
              <label>
                How would you rate your overall experience with the website?
                <div className={styles.experienceScale}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                    const isSelected = formData.experience >= num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, experience: num }))}
                        className={`${styles.experienceButton} ${isSelected ? styles.experienceButtonSelected : ""}`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </label>

              <label>
                Did you face any issues while using the website?
                <div className={styles.radio}>
                  <label>
                    <input
                      type="radio"
                      name="facedIssues"
                      value="No"
                      checked={formData.facedIssues === "No"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="facedIssues"
                      value="Yes"
                      checked={formData.facedIssues === "Yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                </div>
              </label>

              {formData.facedIssues === "Yes" && (
                <label>
                  If yes, please describe:
                  <textarea
                    name="issueDetails"
                    value={formData.issueDetails}
                    onChange={handleChange}
                  />
                </label>
              )}

              <label>
                Were you able to find what you were looking for?
                <textarea
                  name="confusing"
                  value={formData.confusing}
                  onChange={handleChange}
                />
              </label>

              <label>
                Any other comments regarding specific products/website.
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                />
              </label>

              <div className={styles.modalButtons}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowFeedback(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
