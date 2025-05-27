import { Route, Routes } from 'react-router-dom';
import './styles/App.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Home from './pages/Home';
import Bikes from './pages/Bikes';
import Spaces from './pages/Spaces';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Rutas públicas */}
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />

        {/* Rutas protegidas */}
        <Route
          path='dashboard'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='dashboard/bikes'
          element={
            <PrivateRoute>
              <Bikes />
            </PrivateRoute>
          }
        />
        <Route
          path='dashboard/spaces'
          element={
            <PrivateRoute>
              <Spaces />
            </PrivateRoute>
          }
        />
        <Route
          path='dashboard/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
