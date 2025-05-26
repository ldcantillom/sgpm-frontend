import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import './styles/App.css';
import Login from './pages/Login';
import Layout from './components/Layout';
import Bikes from './pages/Bikes'
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />

        <Route path='/dashboard' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='bikes' element={<Bikes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
