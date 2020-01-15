import React, { Fragment } from 'react'; // we need this to make JSX compile
import { Route } from "react-router-dom";
import {getSession} from '../services/session.service'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Row} from 'reactstrap';
import ROUTES from '../config/routes'
import Avatar from '@material-ui/core/Avatar';
import { callbackify } from 'util';
import InfoCard from '../component/InfoCard';

const acerca = 'Está plataforma ha sido desarrollada como parte del curso:\n \
Proyecto de Ingeniería de Software en el periodo de verano 2019\n \
de la escuela de Ingeniería en Computación del Tecnológico de Costa Rica\n \
por los estudiantes:\n \
Carlos Gomez Soza Email: cargomez@ic-itcr.ac.cr\n \
Wilson López Rubi Email: willopez@ic-itcr.ac.cr\n \
Juan José Solano Email: juasolano@ic-itcr.ac.cr\n'

const Footer = () => {
      return(
      <footer className="page-footer"  style={{textAlign:"center", "bottom":"1rem", width: "100%", height: "50px"}}>
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
          <InfoCard
          Contenido = "prueba"
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