import React from "react";
import styles from "../SelectedProductCard/SelectedProductCard.module.css"; // create a CSS module or style accordingly
import Link from "next/link"; // ✅ Replaced react-router-dom Link

const SelectedProductCard = ({ product, isSelected, onToggleSelect }) => {

    return (
        <div className={styles.product}>
            <div className={styles.productHeader}>
                <img
                    src={product.productLogo}
                    alt={`${product.productName} logo`}
                    className={styles.productIcon}
                />
                <div className={styles.productTitleWrapper}>
                    <h2 className={styles.productTitle}>{product.productName}</h2>
                    {/* <h3 className={styles.categoryTag}>{product.category}</h3> */}
                </div>
            </div>

            <div className={styles.productImageWrapper}>
                <img
                    src={product.featuredImage}
                    alt={`${product.productName} Image`}
                    className={styles.productImage}
                />
            </div>

            <div className={styles.productContent}>
                <div className={styles.productTags}>
                    <span className={styles.tag}>Age: {product.age}</span>
                    <span className={styles.tag}>Grade: {product.grade}</span>
                    {/* <span className={styles.tag}>Price:₹ {product.price}</span> */}
                    <span className={styles.tag}>{product.trialType === 'free' ? 'Free Trial' : 'Paid Trial'}</span>
                    <span className={styles.tag}>{product.subscriptionType === 'free' ? 'Free Subscription' : 'Paid Subscription'}</span>

                    {/* <span className={styles.tag}>Perfect For: {product.perfectFor}</span> */}
                </div>

                <div className={styles.ctaWrapper}>
                    <button
                        className={isSelected ? styles.ctaButton1 : styles.ctaButton2}
                        onClick={() => onToggleSelect(product)}
                    >
                        {isSelected ? "Remove" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectedProductCard;
