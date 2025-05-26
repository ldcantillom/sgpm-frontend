import { Route, Routes } from 'react-router-dom';
import './styles/App.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Home from './pages/Home';
import Bikes from './pages/Bikes';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />

        <Route path='dashboard'>
          <Route index element={<Home />} />
          <Route path='bikes' element={<Bikes />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
