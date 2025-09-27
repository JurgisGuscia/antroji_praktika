import React, {useState} from 'react'
import axios from 'axios';
import styles from "./GroupModal.module.scss";
export default function GroupModal({modalOff, reload, setSection, showSuccess}) {
    const [groupNameInput, setGroupNameInput] = useState();
    const [loading, setLoading] = useState(false);

    async function createGroup(e) {
        if(groupNameInput !== ""){
            e.preventDefault();
            setLoading(true);
            const url = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/groups/`;
            try {
            const response = await axios.post(url, {
                name: groupNameInput,
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
                       placeholder="Bendrijos pavadinimas"
                       required
                       autoCapitalize="off"
                       onChange={(e)=>setGroupNameInput(e.target.value.trim())}
                       value={groupNameInput}
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
