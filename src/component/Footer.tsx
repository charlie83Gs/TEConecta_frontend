import React, { Fragment } from 'react'; // we need this to make JSX compile
import { Route } from "react-router-dom";
import {getSession} from '../services/session.service'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Row} from 'reactstrap';
import ROUTES from '../config/routes'
import Avatar from '@material-ui/core/Avatar';
import { callbackify } from 'util';


const Footer = () => {
      return(
      <footer className="page-footer"  style={{textAlign:"center", "bottom":"0", width: "100%", height: "100px"}}>
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2014 Copyright         
        <a className="grey-text text-lighten-4 right" href="#!"  >
            More Links</a>
        </div>
      </div>
    </footer>
    )
}
export default Footer;