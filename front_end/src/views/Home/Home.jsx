import { useUser } from "./../../context/UserContext";
import UserHome from "../UserHome/UserHome";
import AdminHome from "../AdminHome/AdminHome";
import ManagerHome from "../ManagerHome/ManagerHome";
export default function Home() {
  const user = useUser();

  return (
    <div>
      {user.role === 1 ? 
        <AdminHome />
       : user.role === 3 ? 
        <UserHome />
       :<ManagerHome />
        }
    </div>
  );
}