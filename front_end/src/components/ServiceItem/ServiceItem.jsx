import React from 'react'
import styles from "./ServiceItem.module.scss";

export default function GroupItem({ index, item, selectedItems, type, toggle, selectedGroup }) {
  return (
    type === "services" ?
    <div className={styles.serviceItemContainer}>
      <input
        type="checkbox"
        defaultChecked={selectedItems.some(selected => selected.id === item.id)} 
        checked={selectedGroup.includes(item.id)}
        onChange={() => toggle(item.id)}
        />
      {item.name} 
    </div>
    :
    <div className={styles.serviceItemContainer}>
      <input
        type="checkbox"
        defaultChecked={selectedItems === item.group} 
        checked={selectedGroup.includes(item.id)}
        onChange={() => toggle(item.id)}
        />
        {item.name + " " + item.lastName}
    </div>
  )
}