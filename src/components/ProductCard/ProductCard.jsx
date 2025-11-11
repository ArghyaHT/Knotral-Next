import React from "react";
import styles from "../Products/Products.module.css"; // create a CSS module or style accordingly
import Link from "next/link"; // ✅ Replaced react-router-dom Link

const ProductCard = ({ product, isSelected, onToggleSelect }) => {
  console.log("ProductCard received product:", product);

  const handleCheckboxChange = () => {
    onToggleSelect(product);
  };

  return (
    <div className={styles.product}>
      <div className={styles.productHeader}>

        {/* <Link
          href={`/${product.slug.current}`}
          state={{ product }}
        >
          <img
            src={product.productLogo}
            alt={`${product.productName} logo`}
            className={styles.productIcon}
          />
        </Link> */}
        <Link href={`/${product.slug.current}`}>
          <img
            src={product.productLogo}
            alt={`${product.productName} logo`}
            className={styles.productIcon}
          />
        </Link>
        <div className={styles.productTitleWrapper}>
          <h2 className={styles.productTitle}>{product.productName}</h2>
          {/* <h3 className={styles.categoryTag}>{product.category}</h3> */}
        </div>
      </div>

      <div className={styles.productImageWrapper}>
        <Link
          href={`/${product.slug.current}`}
          state={{ product }}
        >
          <img
            src={product.featuredImage}
            srcSet={`
    ${product.featuredImage}?w=400 400w,
    ${product.featuredImage}?w=800 800w,
    ${product.featuredImage}?w=1200 1200w
  `}
            alt={`${product.title} Image`}
            className={styles.productImage}
          />
        </Link>
      </div>

      <div className={styles.productContent}>
        <div className={styles.productTags}>
          <span className={styles.tag}>Age: {product.age}</span>
          <span className={styles.tag}>Grade: {product.grade}</span>
          {/* <span className={styles.tag}>Price: ₹ {product.price}</span> */}
          <span className={styles.tag}>{product.trialType === "free" ? 'Free Trial' : 'Paid Trial'}</span>
          <span className={styles.tag}>{product.subscriptionType === "free" ? 'Free Subscription' : 'Paid Subscription'}</span>

          {/* <span className={styles.tag}>Perfect For: {product.perfectFor}</span> */}
        </div>

        <div className={styles.descriptionWrapper}>
          <p className={styles.productDescription}>{product.shortDescription}</p>
          <Link
            href={`/${product.slug.current}`}
            state={{ product }}
            className={styles.seeMoreLink}
          >
            See More
          </Link>
        </div>

        <div className={styles.ctaWrapper}>

       <Link href={`/${product.slug.current}`}>
  <button className={styles.ctaButton}>View product</button>
</Link>
          <label className={styles.ctaButton1}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            <span className={styles.checkmark}></span>
            <span className={styles.buttonText}>Request info</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
