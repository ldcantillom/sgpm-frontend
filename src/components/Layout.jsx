import { Outlet, NavLink } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/dashboard"> Inicio </NavLink> |
          <NavLink to="/dashboard/bikes"> Mis Motos </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
