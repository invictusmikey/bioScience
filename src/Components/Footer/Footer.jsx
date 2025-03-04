import React from 'react';
import './Footer.css';
import LogoClinica from '../../assets/LogoClinica.png'; // Asegúrate de que la ruta sea correcta

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <img src={LogoClinica} alt="Logo" className="footer-logo" />
        <div className="footer-links">
          <a href="https://clinicacentral.co/" target="_blank">Acerca de</a>
          <a href="#services">Servicios</a>
          <a href="#contact">Contacto</a>
          <a href="#privacy">Política de Privacidad</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Clinica Central del Quindio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
