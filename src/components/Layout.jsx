import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const token = sessionStorage.getItem("token");
  const location = useLocation();

  return (
    <div id="layout">
      <Header currentPath={location.pathname} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
