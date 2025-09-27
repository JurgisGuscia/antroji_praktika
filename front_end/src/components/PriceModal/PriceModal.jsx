import React, { useState, useEffect} from 'react'
import axios from 'axios';
import styles from "./PriceModal.module.scss";
import ServicePriceItem from '../ServicePriceItem/ServicePriceItem';
export default function PriceModal({hideModal, showSuccess}) {
    const [loading, setLoading] = useState(true);
    const [serviceList, setServiceList] = useState([]);

    useEffect(()=>{
        async function getData(){
            const url = "https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/services";
            try {
                const [serviceRes] = await Promise.all([
                    axios.get(url),
                ]);
                setServiceList(serviceRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Klaida:", error);
            }
        }
        
        getData();
    },[]);

    const handlePriceChange = (id, newValue) => {
        setServiceList(prev =>
        prev.map(s =>
            s.id === id ? { ...s, price: newValue } : s
        )
        );
    };

    function modalOff(){
        hideModal(false);
    }

    async function updatePrices(){
        const url = "https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/services/prices";
        const payload = serviceList.map(s => ({
            id: s.id,
            price: Number(s.price)
            }));
        try {
            const [pricesRes] = await Promise.all([
                axios.put(url, payload, ),{headers: { "Content-Type": "application/json" }}]);
            
            showSuccess();
            } catch (error) {
                console.error("Klaida:", error);
            } finally {
                setLoading(false);
            }
    }

    return (
        <div className={styles.priceModalContainer}>
            <div className={styles.modalWindow}>
                {
                loading 
                ? <img src="/img/loading.gif" alt="Loading" />
                : 
                <div className={styles.servicePriceListContainer}>
                    {serviceList.map(item =>
                        <ServicePriceItem item={item} onPriceChange={handlePriceChange}/>
                    )}
                </div>
                }
                <div className={styles.modalControl}>
                    <button className={styles.modalControlButton} onClick={updatePrices}>Atnaujinti</button>
                    <button className={styles.modalControlButton} onClick={modalOff}>Atšaukti</button>
                </div>
            </div>
        </div>
    )
}
