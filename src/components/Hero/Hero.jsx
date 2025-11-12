import React from "react";
import styles from "../Hero/Hero.module.css"
import heroImage from "../../../public/assets/bannerImage.jpg"
import Image from "next/image";


const Hero = ({ onContactClick }) => {
 return (
  
    <section className={styles.hero}>
     <div className={styles.left}>
        <h1 className={styles.title}>Connect - Trade -Transform Education</h1>
        <h3 className={styles.subtitle}>The global marketplace where education solutions meet institutional buyers through trusted local expertise.</h3>
        <p className={styles.text}>Knotral bridges the gap between innovative education solutions and schools worldwide. Access verified products, connect with local resellers, and accelerate your education procurement—all in one intelligent platform.</p>
          <button className={styles.button} onClick={onContactClick}>
        Get in Touch
      </button>
      </div>
      <div className={styles.right}>
        <img src="/assets/bannerImage.jpg" alt="Hero" className={styles.image} />
      </div>
    </section>
  );
}

export default Hero