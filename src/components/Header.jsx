import { NavLink, useNavigate, Link } from 'react-router-dom';
import '../styles/header.css';

function Header({ currentPath }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <header className='header'>
      <nav className='nav'>
        {token ? (
          <>
            <NavLink
              to='/dashboard'
              className={({ isActive }) =>
                isActive ? '.activeLink ' : '.link'
              }
            >
              Inicio
            </NavLink>
            <span className='separator'>|</span>
            <NavLink
              to='/dashboard/bikes'
              className={({ isActive }) =>
                isActive ? '.activeLink' : '.link'
              }
            >
              Mis Motos
            </NavLink>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            {currentPath === '/login' ? (
              <Link to='/signup' className='link'>
                Registrarse
              </Link>
            ) : (
              <Link to='/login' className='link'>
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
