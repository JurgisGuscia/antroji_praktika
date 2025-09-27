import React, {useState, useEffect} from 'react'
import styles from "./ManagerHome.module.scss";
import { useNavigate } from "react-router-dom";
import { useUser } from "./../../context/UserContext";
import GroupItem from '../../components/GroupItem/GroupItem';
import ServiceItem from "../../components/ServiceItem/ServiceItem";
import BackDrop from '../../components/BackDrop/BackDrop';
import PriceModal from '../../components/PriceModal/PriceModal';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import axios from "axios";
export default function ManagerHome() {
    const user = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [secondaryLoading, setSecondaryLoading] = useState(true);
    const [roleData, setRoleData] = useState(null);
    const [groupData, setGroupData] = useState();
    const [serviceData, setServiceData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(1);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [priceModal, setPriceModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);

    useEffect(()=>{
        const roleUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/roles/${user.role}`;
        const groupsUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/groups`;
        const servicesUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/services`;
        const usersUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/users`;
        

        const fetchData = async () => {
        try {
            const [roleRes, groupsRes, servicesRes, usersRes] = await Promise.all([
            axios.get(roleUrl),
            axios.get(groupsUrl),
            axios.get(servicesUrl),
            axios.get(usersUrl)
        ]);
        setRoleData(roleRes.data[0].name);
        setGroupData(groupsRes.data);
        setServiceData(servicesRes.data);
        setUserData(usersRes.data);

        setLoading(false);
        
        } catch (error) {
            console.error("Klaida:", error);
        }
    };

    fetchData();
    

    }, [user.role]);
    

    async function handleLogout(){
        const url = "https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/auth/logout";
        try{
            const response = await axios.post(url, {},
                { withCredentials: true });
            navigate("/");
        }catch (error){
            console.log("Klaia.")
        }
    }


    useEffect(()=>{
        setSecondaryLoading(true);
        const serviceUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/groups/${selectedGroup}/services`;
        const userUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/groups/${selectedGroup}/users`;
        const fetchData = async () => {
        try {
            const [serviceRes, userRes] = await Promise.all([
            axios.get(serviceUrl),
            axios.get(userUrl),
            
        ]);
        setSelectedServices(serviceRes.data.map(s => s.id));
        setSelectedUsers(userRes.data);
        setSecondaryLoading(false);
        } catch (error) {
            setSecondaryLoading(false);
            console.error("Klaida:", error);
        }
    };
    fetchData();
    }, [selectedGroup])
    

    const toggleService = (id) => {
        setSelectedServices(prev =>
            prev.includes(id)
            ? prev.filter(x => x !== id)   
            : [...prev, id]                
        );
    };

    const toggleUser = (id) => {
        setSelectedUsers(prev =>
            prev.includes(id)
            ? prev.filter(x => x !== id)
            : [...prev, id]
        );
    };
   
    async function saveData(){
        const servicesPayload = {"servicesList" : selectedServices};
        const usersPayload = selectedUsers;
        const servicesUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/groups/${selectedGroup}/services`;
        const usersUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/users/assignUsers/${selectedGroup}`;
        try {
            const [serviceRes, usersRes] = await Promise.all([
            axios.put(servicesUrl, servicesPayload, {headers: {"Content-Type": "application/json"}}),
            axios.put(usersUrl, usersPayload, {headers: {"Content-Type": "application/json"}}),
            
        ]);
        showSuccess();
        } catch (error) {
            console.error("Klaida:", error);
        }
    }

    function updatePrices(){
        setPriceModal(true);
    }

    function showSuccess(){
        setSuccessModal(true);
        setTimeout(()=>{
            setSuccessModal(false);
        }, 2300);
    }
    return (
        <>
        {priceModal || successModal ? <BackDrop /> : ""}
        {priceModal ? <PriceModal hideModal={setPriceModal} showSuccess={showSuccess}/> : ""}
        {successModal ? <SuccessModal /> : ""}
        <div className={styles.adminHome}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <div className={styles.headerInfoField}>Vartotojas: {user.userName}</div>
                    <div className={styles.headerInfoField}>Rolė: {roleData ? roleData : <img src="/img/loading.gif" alt="Loading" />}</div>
                </div>
                <div className={styles.LogOut} onClick={handleLogout}>Atsijungti</div>
            </div>
            <div className={styles.body}>
                <div className={styles.groupControl}>
                    <div className={styles.controlHead}>
                        <span>Bendrijos:</span>
                        <span></span>
                    </div>
                    <div className={styles.controlsList}>
                        {loading ? <img src="/img/loading.gif" alt="Loading" /> : groupData.map((item, index) => (
                            <GroupItem index={item.id} value={item.name} activateGroup={setSelectedGroup} selected={item.id === selectedGroup}/>
                        ))}
                    </div>
                </div>
                <div className={styles.groupControl}>
                    <div className={styles.controlHead}>
                        <span>Priskirtos paslaugos:</span>
                        <span></span>
                    </div>
                    <div className={styles.controlsList}>
                        {loading || secondaryLoading ? <img src="/img/loading.gif" alt="Loading" /> : serviceData.map((item, index) => (
                            <ServiceItem index={index} item={item} selectedItems={selectedServices} type="services" toggle={toggleService} selectedGroup={selectedServices}/>
                        ))}
                    </div>
                </div>
                <div className={styles.groupControl}>
                    <div className={styles.controlHead}>
                        <span>Priskirti vartotojai:</span>
                        <span></span>
                    </div>
                    <div className={styles.controlsList}>
                        {loading || secondaryLoading ? <img src="/img/loading.gif" alt="Loading" /> : userData.map((item, index) => (
                            <ServiceItem index={index} item={item} selectedItems={selectedGroup} type="users" toggle={toggleUser} selectedGroup={selectedUsers}/>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.managerUpdateContainer}><button onClick={updatePrices}>Kainoraštis</button><button onClick={saveData}>Atnaujinti</button></div>
        </div>
        </>
    )
}
