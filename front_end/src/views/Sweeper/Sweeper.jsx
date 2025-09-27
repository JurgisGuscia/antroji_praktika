import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
export default function Sweeper() {
    const navigate = useNavigate();
    
    useEffect(()=>{
        navigate("/Home");
    },[])
  return <></>
}
