import React from 'react';
import LoadingMotoImg from '../assets/motorcycle_loading.png';
import styles from '../styles/Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
        <img src={LoadingMotoImg} alt="Cargando..." />
        <h3>Cargando...</h3>
    </div>
  );
}

export default Loading;