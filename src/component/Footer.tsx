import React, { Fragment } from 'react'; // we need this to make JSX compile
import InfoCard from '../component/InfoCard';

const acerca = 'Está plataforma ha sido desarrollada como parte del curso:\nProyecto de Ingeniería de Software en el periodo de verano 2019 de la\nescuela de Ingeniería en Computación del Tecnológico de Costa Rica\npor los estudiantes:\nCarlos Gomez Soza Email: cargomez@ic-itcr.ac.cr\nWilson López Rubi Email: willopez@ic-itcr.ac.cr\nJuan José Solano Email: juasolano@ic-itcr.ac.cr'

const Footer = () => {
      return(
      <footer className="page-footer"  style={{textAlign:"center", "bottom":"1rem", width: "100%", height: "50px"}}>
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
          <InfoCard
          Contenido = "No disponible."
          titulo = "Términos y Condiciones "
          />
          </div>
          <div className="col l5 offset-l2 s12">
          <InfoCard
          Contenido = {acerca}
          titulo = "Acerca"
          />
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2020 Copyright    
        </div>
      </div>
      </div>
    </footer>
    )
}
export default Footer;