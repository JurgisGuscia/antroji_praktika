import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import Sweeper from './views/Sweeper/Sweeper';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Sweeper />} />
        <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
