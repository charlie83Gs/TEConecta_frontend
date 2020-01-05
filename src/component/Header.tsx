import React, { Fragment } from 'react'; // we need this to make JSX compile
import { Route } from "react-router-dom";
import {getSession} from '../services/session.service'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Row} from 'reactstrap';
import Routes from '../config/routes'
type HeaderProps = {
  title: string,
  navigate : boolean | undefined 
}

const Header = 
({ title , navigate}: HeaderProps) => {
      var session = getSession();  
      return(
        <div className="header_container">
            <Route render={({ history}) => (
              <h2 style={{cursor:"pointer"}}onClick={()=>{history.push(Routes.NEWS_FEED)}} className="p-3 d-inline single_line_text" >{ "TEConecta  " + title }</h2>
            )} />
            {session && 
            <Row className="ml-5 vcenter">
              <AccountCircleIcon style={{ fontSize: 40 }}/>
              <label className="my-auto ml-1">{session.id}</label>
            </Row>
            }
            {navigate && 
            <Route render={({ history}) => (
            <button 
              style={{"position":"absolute","top":"1rem","right":"1rem"}}
              className="mr-4 ml-4 green teconecta_button mid_lenght"
              onClick={()=>{history.goBack()}}
              >
                Volver
            </button>
              )} />
            }
        </div>
        )  
    }

    interface LoginProps {
    
    }

export default Header;