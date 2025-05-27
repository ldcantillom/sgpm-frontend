import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from '../components/Loading';
import '../styles/login.css';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
      const { token, tipo, username: usernameFromToken, roles } = data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", usernameFromToken);
      sessionStorage.setItem("roles", JSON.stringify(roles));

      console.log('Login exitoso:', data);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingBar />
    );
  }

  return (
    <div className='container-layout'>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <h1>LOGIN</h1>
          <input
            type="text"
            name="email"
            id="login-email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Correo"
          />
          <input
            type="password"
            name="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <input className='button button2' type="submit" value="Entrar" />
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
