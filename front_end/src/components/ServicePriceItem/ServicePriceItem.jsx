import React from "react";
import styles from "./ServicePriceItem.module.scss";

export default function ServicePriceItem({ item, onPriceChange }) {
  return (
    <form className={styles.pricesContainer} onSubmit={e => e.preventDefault()}>
      <div className={styles.serviceNameContainer}>{item.name}</div>
      <div className={styles.servicePriceContainer}>
        <input
          type="number"
          min="0"
          step="0.01"
          value={item.price ?? ""}             
          onChange={e => onPriceChange(item.id, e.target.value)}
        />
      </div>
    </form>
  );
}
