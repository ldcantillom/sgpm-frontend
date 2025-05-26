import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";

function Header() {
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
      </nav>
    </header>
  );
}

export default Header;
