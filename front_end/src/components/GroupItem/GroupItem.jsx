import React from 'react'
import styles from "./GroupItem.module.scss";
export default function GroupItem({index, value, activateGroup, selected}) {
  return (
    selected 
    ?<div className={styles.activeGroupItemContainer} onClick={() => activateGroup(index)}>{value}</div>
    :<div className={styles.groupItemContainer} onClick={() => activateGroup(index)}>{value}</div>
  )
}
