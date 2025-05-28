import React, { useEffect, useState } from 'react'
import LoadingBar from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [loading, setLoading] = useState(true);
  const [nombre, setName] = useState('');
  const [apellido, setLastName] = useState('');
  const [dirección, setAddress] = useState('');
  const [cel, setNumber] = useState('');
  const [correo, setEmail] = useState('');
  const [contrasenia, setPassword] = useState('');
  const [codigo, setCode] = useState('');
  const [rol, setRole] = useState('');
  const roles = [
    {value: "ROLE_ADMINISTRADOR", label: "Administrador"},
    {value: "ROLE_ESTUDIANTE", label: "Estudiante"},
    {value: "ROLE_PROFESOR", label: "Profesor"},
    {value: "ROLE_VIGILANTE", label: "Vigilante"},
  ]
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
      const token = sessionStorage.getItem('token');

      if (token) {
        setTimeout(() => {
          navigate('/Login');
        }, 1000);
      } else {
        setLoading(false);
      }
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{

      
      const response = await fetch('http://localhost:8080/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nombre, apellido, dirección, cel, correo, contrasenia, codigo, rol }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || 'Error al registrarse');
      }

      console.log('Registro exitoso:', data);
      navigate("/login");
    } catch (err) {
      console.error('Error en el registro:', err);
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
          <h1>SIGNUP</h1>
          <input
            type = "text"
            name = "name"
            id = "signup-name"
            value = {nombre}
            onChange = {(e) => setName(e.target.value)}
            placeholder = "Nombre"
          />

          <input
            type = "text"
            name = "lastname"
            id = "signup-lastname"
            value = {apellido} 
            onChange = {(e) => setLastName(e.target.value)}
            placeholder = "Apellido"
          />

          <input
            type = "text"
            name = "address"
            id = "signup-address"
            value = {dirección}
            onChange = {(e) => setAddress(e.target.value)}
            placeholder = "Direccion"
          />

          <input
            type = "text"
            name = "number"
            id = "signup-number"
            value = {cel}
            onChange = {(e) => setNumber(e.target.value)}
            placeholder = "Numero de telefono"
          />

          <input
            type = "text"
            name = "email"
            id = "signup-email"
            value = {correo}
            onChange = {(e) => setEmail(e.target.value)}
            placeholder = "Correo"
          />

          <input
            type = "password"
            name = "password"
            id = "signup-password"
            value = {contrasenia}
            onChange = {(e) => setPassword(e.target.value)}
            placeholder = "Contraseña"
          />

          <input
            type = "text"
            name = "code"
            id = "signup-code"
            value = {codigo}
            onChange = {(e) => setCode(e.target.value)}
            placeholder = "Codigo"
          />

          <select
            name = "role"
            id = "signup-role"
            value = {rol}
            onChange = {(e) => setRole(e.target.value)}
          >
            <option value ="">Selecciona un rol</option>
            {roles.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <input className='button button2' type="submit" value="Registrarse" />
          {error && <p className="error">{error}</p>} 
        </form>
      </div>
    </div>
  )
}

export default Signup