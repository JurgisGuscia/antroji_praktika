import React from 'react'


import styles from "./ControlDisplayItem.module.scss";
export default function ControlDisplayItem({ item, section, editItem, showEditModal }) {

    function editEntry(){
        editItem({item, section});
        showEditModal(true);
    }
  return (
    section === "users" 
    ? <div className={styles.controlItemContainer} onClick={editEntry}>{item.name + " " + item.lastName}</div>
    : <div className={styles.controlItemContainer} onClick={editEntry}>{item.name}</div>
  )
}
