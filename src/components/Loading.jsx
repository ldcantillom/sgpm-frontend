import React from 'react';
import LoadingMotoImg from '../assets/motorcycle_loading.png';
import '../styles/loading.css'

const Loading = () => {
  return (
    <div className='loaderContainer'>
        <img src={LoadingMotoImg} alt="Cargando..." />
        <h3>Cargando...</h3>
    </div>
  );
}

export default Loading;