import React from 'react'
import styles from "./SuccessModal.module.scss";
export default function SuccessModal() {
  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalWindow} ><img src={`/img/success.gif?${Date.now()}`} alt="Loading" /></div>
    </div>
  )
}
