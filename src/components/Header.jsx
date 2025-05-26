import { NavLink, useNavigate, Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

function Header({ currentPath }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {token ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Inicio
            </NavLink>
            <span className={styles.separator}>|</span>
            <NavLink
              to="/dashboard/bikes"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Mis Motos
            </NavLink>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            {currentPath === "/login" ? (
              <Link to="/signup" className={styles.link}>
                Registrarse
              </Link>
            ) : (
              <Link to="/login" className={styles.link}>
                Iniciar sesión
              </Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
