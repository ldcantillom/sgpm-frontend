import React, { useEffect, useState } from 'react';

const Bikes = () => {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const usuarioData = sessionStorage.getItem('usuario');
        const token = sessionStorage.getItem('token');

        if (!usuarioData || !token) {
          throw new Error('Usuario no autenticado o falta el token.');
        }

        const usuario = JSON.parse(usuarioData);
        console.log(usuario);
        const idUsuario = usuario.id;
        console.log(idUsuario);

        const response = await fetch('http://localhost:8080/api/v1/motos', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('No se pudieron obtener las motos.');
        }

        const data = await response.json();
        const motosUsuario = data.filter((moto) => moto.idUsuario === idUsuario);
        setMotos(motosUsuario);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMotos();
  }, []);

  if (loading) return <p>Cargando motos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bikes-container">
      <h1>Mis Motos</h1>
      {motos.length === 0 ? (
        <p>No tienes motos registradas.</p>
      ) : (
        <ul>
          {motos.map((moto) => (
            <li key={moto.idMoto}>
              <strong>{moto.modelo}</strong>: {moto.descripcion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bikes;
