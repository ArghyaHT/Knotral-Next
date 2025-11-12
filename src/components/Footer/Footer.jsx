"use client"; // since we use useEffect and useState


import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css"
// import footerImage from "../../../public/assets/KnotralFooter.png"
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";
import { client } from "../../utils/sanityClient";
import { useState } from "react";
import Link from "next/link"; // ✅ Replaced react-router-dom Link

const Footer = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const handleSubscribe = async () => {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
            setStatus("Please enter a valid email.");
            return;
        }

        const sanitizedId = `subscription-${normalizedEmail.replace(/[@.]/g, '-')}`;

        try {
            const existing = await client.fetch(
                `*[_type == "subscription" && email == $email][0]`,
                { email: normalizedEmail }
            );

            if (existing) {
                setStatus("You're already subscribed.");
                return;
            }

            await client.createIfNotExists({
                _id: sanitizedId,
                _type: "subscription",
                email: normalizedEmail,
            });

            setStatus("Thanks for subscribing!");
            setEmail("");
        } catch (err) {
            console.error("Subscription error:", err);
            setStatus("Something went wrong. Please try again.");
        }
    };


    return (
        <section className={styles.footer}>
            <div className={styles.gridContainer}>

                {/* Part 1: Image */}
                <div className={styles.imageSection}>
                    <Link href="/">
                        <Image
                            src="/assets/KnotralFooter.png"
                            alt="Company Logo"
                            className={styles.logoImage}
                        />
                    </Link>
                </div>

                {/* Part 2: Quick Links */}
                <div className={styles.linksSection}>
                    <h4>Quick Links</h4>
                    <ul className={styles.linksList}>
                        <li><Link href="/all-products">Products</Link></li>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link href="/sitemap">Sitemap</Link></li>
                    </ul>
                </div>

                {/* Part 3: Social Icons */}
                <div className={styles.socialSection}>
                    <h4>Socialize With Us</h4>
                    <div className={styles.socialIcons}>
                        <SocialIcon url="https://facebook.com/KnotralGlobal" style={{ height: 30, width: 30 }} target="_blank" rel="noopener noreferrer" />
                        <SocialIcon url="https://instagram.com/knotral_knowledgetradelink" style={{ height: 30, width: 30 }} target="_blank" rel="noopener noreferrer" />
                        <SocialIcon url="https://x.com/Knotral_Global" style={{ height: 30, width: 30 }} target="_blank" rel="noopener noreferrer" />
                        <SocialIcon url="https://linkedin.com//showcase/knotral" style={{ height: 30, width: 30 }} target="_blank" rel="noopener noreferrer" />
                    </div>

                    <div className={styles.subscribeSection}>
                        <div className={styles.inputWrapper}>
                            <span className={styles.icon}><FaEnvelope /></span> {/* You can replace with an icon component */}
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.subscribeInput}
                            />
                        </div>
                        <button className={styles.subscribeButton} onClick={handleSubscribe}>
                            Subscribe
                        </button>
                        {status && <p
                            className={styles.subscribeStatus}
                        >{status}</p>}
                    </div>
                </div>
            </div>
            <div className={styles.copyRightText}>
                &copy; 2025 Knotral. All Rights Reserved.
            </div>

            <div className={styles.companyInfo}>
                Trakru Global Services Private Limited that owns&nbsp;
                <a href="https://www.knotral.com" target="_blank" rel="noopener noreferrer">
                    www.knotral.com
                </a>, is a company incorporated under the laws of India, having its office at 588, Sector 14, Faridabad, Delhi NCR, Haryana, 121007, having CIN number U93000HR2020PTC087647
            </div>
        </section>
    );
};

export default Footer;