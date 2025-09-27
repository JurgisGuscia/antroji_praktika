import React, {useState} from 'react'
import axios from 'axios';
import styles from "./EditModal.module.scss";
export default function EditModal({item, turnModalOff, reload, showSuccess}) {
  const [nameInput, setNameInput] = useState(item.item.name);
  const [loading, setLoading] = useState(false);
  async function update(e){
    if(nameInput !== ""){
    e.preventDefault();
      setLoading(true);
      const url = item.section === "groups" 
      ? `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/groups/${item.item.id}`
      : item.section === "services" 
      ? `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/services/${item.item.id}`
      : "";
      try {
        const response = await axios.put(url, {
            name: nameInput,
        });
        showSuccess();
        turnModalOff(false);
      } catch (error) {
          console.error("Įvyko klaida:", error);
      } finally {
          setLoading(false);
          reload(prevCount => prevCount + 1);
      }
    }
    
  }

  async function remove(e){
    e.preventDefault();
    setLoading(true);
    const url = item.section === "groups" 
    ? `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/groups/${item.item.id}`
    : item.section === "services" 
    ? `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/services/${item.item.id}`
    : "";
    try {
      const response = await axios.delete(url, {});
      showSuccess();
      turnModalOff(false);
    } catch (error) {
        console.error("Įvyko klaida:", error);
    } finally {
        setLoading(false);
        reload(prevCount => prevCount + 1);
    }
  }

  function modalOff(e){
    e.preventDefault()
    turnModalOff(false);
  }
  return (
    <div className={styles.modalContainer}>
        <form className={styles.modalWindow}>
            <div className={styles.modalInput}>
                <input type="text" 
                       placeholder={item.section === "groups" ? "Bendrijos pavadinimas" : "Paslaugos Pavadinimas"}
                       required
                       autoCapitalize="off"
                       onChange={(e)=>setNameInput(e.target.value.trim())}
                       value={nameInput}
                       ></input>           
            </div>
            <div className={styles.modalControl}>
                {loading ? <img src="/img/loading.gif" alt="Loading" /> : <>
                <button className={styles.modalControlButton} onClick={update}>Atnaujinti</button>
                <button className={styles.modalControlButton} onClick={remove}>Panaikinti</button>
                <button className={styles.modalControlButton} onClick={modalOff}>Atšaukti</button>
                </>
                }
            </div>
        </form>
    </div>
  )
}
