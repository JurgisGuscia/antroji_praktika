import React, {useState, useEffect} from 'react'
import styles from "./AdminHome.module.scss";
import { useNavigate } from "react-router-dom";
import BackDrop from '../../components/BackDrop/BackDrop';
import UserModal from '../../components/UserModal/UserModal';
import GroupModal from '../../components/GroupModal/GroupModal';
import ServiceModal from '../../components/SerivceModal/ServiceModal';
import EditModal from '../../components/EditModal/EditModal';
import UserEditModal from '../../components/UserEditModal/UserEditModal';
import { useUser } from "./../../context/UserContext";
import axios from "axios";
import ControlDisplayItem from '../../components/ControlDisplayItem/ControlDisplayItem';
import SuccessModal from '../../components/SuccessModal/SuccessModal';

export default function AdminHome() {
    const user = useUser();
    const navigate = useNavigate();
    const [roleData, setRoleData] = useState(null);
    const [groupsData, setGroupsData] = useState(null);
    const [servicesData, setServicesData] = useState(null);
    const [usersData, setUsersData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [groupModal, setGroupModal] = useState(false);
    const [serviceModal, setServiceModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [reloadData, setReloadData] = useState(0);
    const [editModal, setEditModal] = useState(false);
    const [editItem, setEditItem] = useState();
    const [section, setSection] = useState();
    const [editUser, setEditUser] = useState();
    const [userEditModal, setUserEditModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    

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
        const roleUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/roles/${user.role}`;
        const servicesUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/services`;
        const groupsUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/groups`;
        const usersUrl = `https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/users`;
        

        const fetchData = async () => {
        try {
            const [roleRes, servicesRes, groupsRes, usersRes] = await Promise.all([
            axios.get(roleUrl),
            axios.get(servicesUrl),
            axios.get(groupsUrl),
            axios.get(usersUrl),
        ]);
        setRoleData(roleRes.data[0].name);
        setGroupsData(groupsRes.data);
        setServicesData(servicesRes.data);
        setUsersData(usersRes.data);
        setLoading(false);
        } catch (error) {
            console.error("Klaida:", error);
        }
    };

    fetchData();    
    }, [reloadData, user.role]);

    function addGroup(){
        setGroupModal(true)
    }

    function addService(){
        setServiceModal(true);
    }

    function addUser(){
        setUserModal(true);
    }
    function showSuccess(){
        setSuccessModal(true);
        setTimeout(()=>{
            setSuccessModal(false);
        }, 2300);
    }
  return (
    <>
    {userModal || groupModal || serviceModal || editModal || userEditModal || successModal ? <BackDrop /> : ""}
    {editModal ? <EditModal item={editItem} turnModalOff={setEditModal} section={section} reload={setReloadData} showSuccess={showSuccess}/> : ""}
    {userEditModal ? <UserEditModal user={editUser} turnModalOff={setUserEditModal} reload={setReloadData} showSuccess={showSuccess}/> :""}
    {userModal ? <UserModal turnModalOff={setUserModal} reload={setReloadData} showSuccess={showSuccess}/> : ""}
    {groupModal ? <GroupModal modalOff={setGroupModal} reload={setReloadData} setSection={setSection} showSuccess={showSuccess}/> : ""}
    {serviceModal ? <ServiceModal  modalOff={setServiceModal} reload={setReloadData} setSection={setSection} showSuccess={showSuccess}/>: ""}
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
                    <button  className={styles.addButton} onClick={addGroup}>Pridėti</button>
                </div>
                <div className={styles.controlsList}>
                    {loading ? <img src="/img/loading.gif" alt="Loading" /> : groupsData.map((item, index) => (
                        <ControlDisplayItem item={item} section={"groups"} editItem={setEditItem} showEditModal={setEditModal}/>
                    ))}
                </div>
            </div>
            <div className={styles.groupControl}>
                <div className={styles.controlHead}>
                    <span>Paslaugos:</span>
                    <button  className={styles.addButton} onClick={addService}>Pridėti</button>
                </div>
                <div className={styles.controlsList}>
                    {loading ? <img src="/img/loading.gif" alt="Loading" /> : servicesData.map((item, index) => (
                        <ControlDisplayItem  item={item} section={"services"} editItem={setEditItem} showEditModal={setEditModal}/>
                    ))}
                </div>
            </div>
            <div className={styles.groupControl}>
                <div className={styles.controlHead}>
                    <span>Vartotojai:</span>
                    <button  className={styles.addButton} onClick={addUser}>Pridėti</button>
                </div>
                <div className={styles.controlsList}>
                    {loading ? <img src="/img/loading.gif" alt="Loading" /> : usersData.map((item, index) => (
                        <ControlDisplayItem  item={item} section={"users"} editItem={setEditUser} showEditModal={setUserEditModal}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
