import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProtectedRoute.module.scss";
import { UserContext } from "../../context/UserContext";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://antrapraktika-bbbncreja2dsfacu.polandcentral-01.azurewebsites.net/api/auth/me",
        { withCredentials: true }
      )
      .then((res) => setUser(res.data)) 
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={styles.ProtectedRoute}>
        <img src="/img/loading.gif" alt="Loading" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default ProtectedRoute;
