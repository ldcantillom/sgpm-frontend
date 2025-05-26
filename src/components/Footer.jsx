import React from 'react'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav>
        <a href="">Acerca de Nosotros</a>
        <a href="">Ayudanos a Mejorar</a>
        <a href="">Aviso de Privacidad</a>
        <a href="">Términos de Uso</a>
      </nav>
    </footer>
  )
}

export default Footer