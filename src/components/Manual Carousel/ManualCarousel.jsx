import React, { useEffect, useState } from "react";
import styles from "./ManualCarousel.module.css";
import SelectedProductCard from "../SelectedProductCard/SelectedProductCard";

const ManualCarousel = ({ products, onToggle, selectedIds, visibleCount = 3 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % (products.length - visibleCount + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, [products.length, visibleCount]);

  return (
    <div className={styles.carouselWrapper}>
      <div
        className={styles.track}
        style={{
          transform: `translateX(-${index * (100 / visibleCount)}%)`,
        }}
      >
        {products.map(product => (
          <div key={product._id} className={styles.slide}>
            <SelectedProductCard
              product={product}
              isSelected={selectedIds.includes(product._id)}
              onToggle={() => onToggle(product)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManualCarousel;
