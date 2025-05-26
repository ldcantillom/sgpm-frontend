import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
    navigate('/login');
  };
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Inicio
        </NavLink>
        <span className={styles.separator}>|</span>
        <NavLink 
          to="/dashboard/bikes" 
          className={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Mis Motos
        </NavLink>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </nav>
    </header>
  );
}

export default Header;
