import React from 'react'
import styles from "./UserHome.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUser } from "./../../context/UserContext";
import axios from "axios";

export default function UserHome() {
    const user = useUser();
    const navigate = useNavigate();
    const [roleData, setRoleData] = useState(null);
    const [groupData, setGroupData] = useState(null);
    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(true);

    async function handleLogout(){
        const url = "https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/auth/logout";
        try{
            const response = await axios.post(url, {},
                { withCredentials: true });
            navigate("/");
        }catch (error){
            console.log("Klaida.")
        }
    }
    
    useEffect(()=>{
        var groupUrl;
        var serviceUrl;
        const roleUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/roles/${user.role}`;
        if(user.group !== null){
            groupUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/groups/${user.group}`;        
            serviceUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/groups/${user.group}/services`
        }else{
            groupUrl = "";        
            serviceUrl = ""
        }   
        const fetchData = async (groupUrl, serviceUrl) => {
            if(groupUrl === ""){
                try {
                    const [roleRes] = await Promise.all([
                    axios.get(roleUrl),
                    ]);
                    setRoleData(roleRes.data[0].name);
                    setGroupData("Nepriskirta");
                    setServiceData([]);      
                }catch (error) {
                    console.error("Klaida:", error);
                } finally{
                    setLoading(false);
                }
            }else{
                try {
                    const [roleRes, serviceRes, groupRes] = await Promise.all([
                    axios.get(roleUrl),
                    axios.get(serviceUrl),
                    axios.get(groupUrl),
                ]);
                setRoleData(roleRes.data[0].name);
                setGroupData(groupRes.data[0].name);
                setServiceData(serviceRes.data);  
                }catch (error) {
                    console.error("Klaida:", error);
                } finally{
                    setLoading(false);
                }
            }
        };

        fetchData(groupUrl, serviceUrl);
    }, []);
  return (
    <div className={styles.userHome}>
        <div className={styles.header}>
            <div className={styles.headerInfo}>
                <div className={styles.headerInfoField}>Vartotojas: {user.userName}</div>
                <div className={styles.headerInfoField}>Rolė: {roleData? roleData: <img src="/img/loading.gif" alt="Loading" />}</div>
                <div className={styles.headerInfoField}>Bendrija: {groupData ? groupData : <img src="/img/loading.gif" alt="Loading" />}</div>
            </div>
            <div className={styles.LogOut} onClick={handleLogout}>Atsijungti</div>
        </div>
        <div className={styles.body}>
            <p>Jūsų bendrijai priskirtos paslaugos:</p>

            {loading? <img src="/img/loading.gif" alt="Loading" /> : serviceData.map((item, index) => (
                <div key={index} className={styles.service}>
                    <span className={styles.pavadinimas}>{item.name}</span> <span className={styles.kaina}>{item.price}</span> Eur.
                </div>
            ))}
        </div>
    </div>
  )
}
