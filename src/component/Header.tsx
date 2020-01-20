import React, { Fragment } from 'react'; // we need this to make JSX compile
import { Route } from "react-router-dom";
import {getSession} from '../services/session.service'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Row} from 'reactstrap';
import ROUTES from '../config/routes'
import Avatar from '@material-ui/core/Avatar';

type HeaderProps = {
  title: string,
  navigate : boolean | undefined 
}

const Header = 
({ title , navigate}: HeaderProps) => {
      var session = getSession();  
      return(
        <div className="header_container p-2">
            <Route render={({ history}) => (
              <h2 style={{cursor:"pointer"}}
                onClick={()=>{history.push(ROUTES.NEWS_FEED)}} 
                className="p-3 d-inline single_line_text mt" >
                  { "TEConecta  " + title }
              </h2>
            )} />
            {session && 
            <Row className="ml-5 vcenter mt-1" style={{width:"80%"}}>
              <Avatar aria-label="recipe">
                  {session.id[0]}
                </Avatar>
              <label className="my-auto ml-1">{session.id}</label>
            </Row>
            }
            {navigate && 
            <Route render={({ history}) => (
            <button 
              style={{"position":"absolute","top":"1rem","right":"1rem"}}
              className="mr-4 ml-4 blue teconecta_button mid_lenght"
              onClick={()=>{history.goBack()}}
              >
                Volver
            </button>
              )} />
            }
             {!navigate && 
            <Route render={({ history}) => (
            <Fragment>
              <button 
                style={{"position":"absolute","top":"0.5rem","right":"1rem"}}
                className="mr-4 ml-4 blue teconecta_button mid_lenght"
                onClick={()=>{
                  var target = session ? ROUTES.MENU : ROUTES.LOGIN
                  history.push(target)
                }}
                >
                  {session ? "Menú Principal" : "Iniciar Sesión"}
                  <AccountCircleIcon className="ml-4" />
              </button>
              <button 
                style={{"position":"absolute","top":"3.5rem","right":"1rem"}}
                className="mr-4 ml-4 blue teconecta_button mid_lenght"
                onClick={()=>{history.push(ROUTES.LIST_USER)}}
                >
                  Grupos De Interés
                  <AccountBoxIcon  className="ml-2" />
              </button>
            </Fragment>
              )} />
              
            }
            
        </div>
        )  
    }

    interface LoginProps {
    
    }

export default Header;