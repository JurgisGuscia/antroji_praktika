import React, { useState } from 'react'
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState("");
    const navigate = useNavigate();
    const url = "https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/auth/login";
    async function handleLogin(e){
        if(username && password)
        {
            e.preventDefault();
            setLoading(true);
            try{
                const response = await axios.post(url, 
                    { username: username, password: password},
                    { withCredentials: true });
                setErrorState("")
                setLoading(false);
                navigate("/Home");
            }catch (error){
                setErrorState(error.response?.data)
                setLoading(false);
            }
        }
    }


  return (
    <div className={styles.loginContainer}>
        <div className={styles.loginWrapper}>
            <form action="#" method="Post" className={styles.loginForm}>
                <input type="text" id="username" 
                       className={styles.inputField}
                       placeholder="Vartotojas" 
                       required 
                       autoComplete="off"
                       value={username}
                       onChange={(e) => setUsername(e.target.value.trim())}
                       ></input>
                <input type="password" id="password" 
                       className={styles.inputField}
                       placeholder="Slaptažodis" 
                       required
                       autoComplete="off"
                       value={password}
                       onChange={(e) => setPassword(e.target.value.trim())}
                       ></input>
                <button type="submit" onClick={handleLogin} 
                        className={styles.loginButton}
                        disabled={loading}>{loading ? <img src="./img/loading.gif" alt="Loading" /> : "Prisijungti"}</button>
                <p className={styles.errorLog}>{errorState}</p>
            </form>
        </div>
    </div>
  )
}
