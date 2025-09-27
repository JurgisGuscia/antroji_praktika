import React, {useState} from 'react'
import axios from 'axios';
import styles from "./ServiceModal.module.scss";
export default function ServiceModal({modalOff, reload, setSection, showSuccess}) {
    const [serviceNameInput, setServiceNameInput] = useState("");
    const [loading, setLoading] = useState(false);

    async function createGroup(e) {
        if(serviceNameInput !== ""){
            e.preventDefault();
                setLoading(true);
                const url = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/services/`;
                try {
                const response = await axios.post(url, {
                    name: serviceNameInput,
                });
                showSuccess();
                modalOff(false);
                } catch (error) {
                    console.error("Įvyko klaida:", error);
                } finally {
                    setLoading(false);
                    reload(prevCount => prevCount + 1);
            }
        }
    }

    function turnModalOff(e){
        e.preventDefault()
        modalOff(false);
    }
  return (
    <div className={styles.modalContainer}>
        <form className={styles.modalWindow}>
            <div className={styles.modalInput}>
                <input type="text" 
                       placeholder="Paslaugos pavadinimas"
                       required
                       autoCapitalize="off"
                       onChange={(e)=>setServiceNameInput(e.target.value.trim())}
                       value={serviceNameInput}
                       ></input>           
            </div>
            <div className={styles.modalControl}>
                {loading ? <img src="/img/loading.gif" alt="Loading" /> : <>
                <button className={styles.modalControlButton} onClick={createGroup}>Pridėti</button>
                <button className={styles.modalControlButton} onClick={turnModalOff}>Atšaukti</button>
                </>
                }
            </div>
        </form>
    </div>
  )
}
