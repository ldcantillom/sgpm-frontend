import React, { useEffect, useState } from 'react';

const Home = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/v1/usuarios', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();
        setUsuario(data[0]);
        sessionStorage.setItem("usuario", JSON.stringify(data[0]));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

      
    };


    fetchUsuario();

    fetch('http://localhost:8080/api/v1/parqueaderos/imagen/1', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      setImageUrl(url); // state que usas para la src del img
    });
  }, []);

  if (loading) return <p>Cargando usuario...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!usuario) return <p>No hay datos disponibles</p>;

  return (
    <div className='container-layout'>
      <h1>Bienvenido, {usuario.nombre} {usuario.apellido}</h1>
      <p><strong>Correo:</strong> {usuario.correo}</p>
      <p><strong>Parqueadero:</strong> {usuario.parqueadero}</p>
      <p><strong>Roles:</strong> {usuario.roles.join(', ')}</p>
      <img src={imageUrl} alt="Imagen del parqueadero"/>
    </div>
  );
};

export default Home;
