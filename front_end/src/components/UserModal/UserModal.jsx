import React, {useState, useEffect} from 'react'
import axios from 'axios';
import styles from "./UserModal.module.scss";
export default function UserModal({turnModalOff, reload, showSuccess}) {
  const [loading, setLoading] = useState(false);
  const [nameState, setNameState] = useState("");
  const [lastNameState,setLastNameState] = useState("");
  const [userNameState,setUserNameState] = useState(""); 
  const [passwordState, setPasswordState] = useState("");
  const [genderState,setGenderState] = useState("Vyras");
  const [groupState,setGroupState] = useState(1);
  const [roleState, setRoleState] = useState(3);
  const [roleList, setRoleList] = useState(null);
  const [groupList, setGroupList] = useState(null);
  const [autoGenerate, setAutoGenerate] = useState(false);

   useEffect(()=>{
    const rolesUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/roles`;
    const groupsUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/groups`;
    const fetchData = async () => {
    try {
      const [rolesRes, groupsRes] = await Promise.all([
        axios.get(rolesUrl),
        axios.get(groupsUrl),
      ]);
      setRoleList(rolesRes.data);
      setGroupList(groupsRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Klaida:", error);
    }
  };

    fetchData();
  }, []);

  async function create(e){
    console.log(autoGenerate);
    if((nameState !== "" && lastNameState !== "" && userNameState !== "" && passwordState !== "") || (nameState !== "" && lastNameState !== "" && autoGenerate)){
      e.preventDefault()
      const name = nameState;
      const lastName = lastNameState;
      const userName = autoGenerate ? nameState : userNameState;
      const password = autoGenerate ? lastNameState : passwordState
      const gender = genderState;
      const group = parseInt(groupState, 10);
      const role = parseInt(roleState, 10);
      const url = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/users`;
        
      const userDto = {
        name,
        lastName,
        userName,
        password,
        gender,
        group,
        role,   
      };

      try {
        const response = await axios.post(url, userDto);
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
 

  function modalOff(e){
    e.preventDefault()
    turnModalOff(false);
  }
  return (
    <div className={styles.modalContainer}>
            <form className={styles.modalWindow}>
                <div className={styles.modalInput}>
                  <p><span>Vardas: </span><input type="text" required value={nameState} onChange={(e)=>setNameState(e.target.value.trim())} placeholder="Vardas"/></p>
                  <p><span>Pavardė: </span><input type="text" required value={lastNameState} onChange={(e)=>setLastNameState(e.target.value.trim())} placeholder="Pavardė"/></p>
                  <p><span>Generuoti</span>
                  <div className={styles.checkBoxContainer}>
                    <input className={styles.checkBox}
                           type="checkbox"
                           checked={autoGenerate}
                           onChange={(e) => setAutoGenerate(e.target.checked)}
                    />  
                  </div>
                  </p>        
                  <p>
                    <span>Vartotojas: </span>
                    <input type="text" required 
                           value={autoGenerate ? "Auto generavimas" :userNameState}
                           disabled={autoGenerate}
                           onChange={(e)=>setUserNameState(e.target.value.trim())} 
                           placeholder="Vartotojas"/>
                  </p>
                  <p>
                    <span>Slaptažodis: </span>
                    <input type={autoGenerate ? "text" : "password"} required 
                          value={autoGenerate ? "Auto generavimas" : passwordState} 
                          disabled={autoGenerate}
                          onChange={(e)=>setPasswordState(e.target.value.trim())} 
                          placeholder="Slaptažodis"/>
                  </p> 
                  <p><span>Lytis: </span>
                    <select onChange={(e)=>setGenderState(e.target.value)} required value={genderState}>
                      <option value="Vyras" >Vyras</option>
                      <option value="Moteris" >Moteris</option>
                    </select>
                  </p>   
                  <p>
                    <span>Bendrija: </span>
                    {groupList !== null? 
                    <select onChange={(e)=>setGroupState(e.target.value)}  required value={groupState}>
                      {groupList.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    : <div className={styles.imgContainer}><img src="/img/loading.gif" alt="Loading"/></div>
                    }
                  </p>        
                  <p>
                    <span>Rolė: </span>
                    {roleList !== null? 
                    <select required onChange={(e)=>setRoleState(e.target.value)} value={roleState}>
                      {roleList.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    : <div className={styles.imgContainer}><img src="/img/loading.gif" alt="Loading"/></div>
                    }
                  </p>        
                </div>
                <div className={styles.modalControl}>
                    {loading ? <img src="/img/loading.gif" alt="Loading" /> : <>
                    <button className={styles.modalControlButton} onClick={create}>Sukurti</button>
                    <button className={styles.modalControlButton} onClick={modalOff}>Atšaukti</button>
                    </>
                    }
                </div>
            </form>
        </div>
  )
}
