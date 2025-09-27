import React, {useEffect, useState} from 'react'
import axios from "axios";
import styles from "./UserEditModal.module.scss";
export default function UsedEditModa({user, turnModalOff, reload, showSuccess}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.item.name);
  const [lastName,setLastName] = useState(user.item.lastName);
  const [userName,setUserName] = useState(user.item.userName);  
  const [gender,setGender] = useState(user.item.gender);
  const [group,setGroup] = useState(user.item.group);
  const [role, setRole] = useState(user.item.role);
  const [roleList, setRoleList] = useState(null);
  const [groupList, setGroupList] = useState(null);

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

  async function update(e){
    if(name !== "" && lastName !== "" && userName !== "" && gender !== ""){
      e.preventDefault();
      setLoading(true);
      const url = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/users/${user.item.id}`;
      const payload = {
        id: user.item.id, 
        name,
        lastName,
        userName,
        gender,
        group: parseInt(group, 10),
        role: parseInt(role, 10),    
      };

      try {
        const response = await axios.put(url, payload);
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
    const url = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/users/${user.item.id}`;
    try {
      const response = await axios.delete(url, {});
      showSuccess();
      turnModalOff(false);
    } catch (error) {
        console.error("Įvyko klaida:" + error);
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
              <p><span>Vardas: </span><input type="text" value={name} onChange={(e)=>setName(e.target.value.trim())} placeholder="Vardas"/></p>
              <p><span>Pavardė: </span><input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value.trim())} placeholder="Pavardė"/></p>        
              <p><span>Vartotojas: </span><input type="text" value={userName} onChange={(e)=>setUserName(e.target.value.trim())} placeholder="Vartotojas"/></p>
              <p><span>Lytis: </span>
                <select onChange={(e)=>setGender(e.target.value)} value={gender}>
                  <option value="Vyras" >Vyras</option>
                  <option value="Moteris" >Moteris</option>
                </select>
              </p>   
              <p>
                <span>Bendrija: </span>
                {groupList !== null? 
                <select onChange={(e)=>setGroup(e.target.value)}  value={group}>
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
                <select onChange={(e)=>setRole(e.target.value)} value={role}>
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
