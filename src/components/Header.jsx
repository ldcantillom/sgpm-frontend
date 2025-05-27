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
    <header>
      <div className='container-layout'>
        <div className='header'>
          <div className='sgmp-logo'>
            <h1>SGPM</h1>
          </div>
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
                <button className='button1' onClick={handleLogout}>Cerrar sesión</button>
              </>
            ) : (
              <>
                {currentPath === '/login' ? (
                  <Link to='/signup' className='button button2'>
                    Registrarse
                  </Link>
                ) : (
                  <Link to='/login' className='button button2'>
                    Iniciar sesión
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
