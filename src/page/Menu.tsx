import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container} from 'reactstrap';
import Header from '../component/Header';
import MenuItem from '../component/MenuItem';
import { Route, Redirect } from "react-router-dom";
import {getSession} from '../services/session.service';

//import icons
import list from '../resources/list.svg';
import addEvent from '../resources/addEvent.svg';
import eventHistory from '../resources/eventHistoryA.svg';
import user from '../resources/user.svg';
import addUser from '../resources/addUserA.svg';
import change from '../resources/change.svg';
import ROUTES from '../config/routes';
import { readFileSync } from 'fs';
import exit from '../resources/exit.svg';
import Footer from '../component/Footer';

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type MenuState = {

}
const ADMIN = "ADMIN";
const ADMINREG= "ADMINREG";
function isAdmin(roles : string[]) : boolean{
    for (let index = 0; index < roles.length; index++) {
        if(ADMIN == roles[index]) return true;        
    }
    return false
}
function isAdminReg(roles : string[]) : boolean{
    for (let index = 0; index < roles.length; index++) {
        if(ADMINREG == roles[index]) return true;        
    }
    return false
}



export default class Menu extends Component<{}, {}> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {
    var username : any = localStorage.getItem("username");
        
  }

  // render will know everything!
  //justify-content-md-center
  render() {
    var session = getSession();
    console.log(session)
    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
            <Header title=" - Centro de administración" navigate={true}></Header> 
            <Row className="mt-4">
            <Route render={({ history}) => (
                <Fragment>
                {isAdminReg(session.roles) && 
                    <Fragment>
                        <MenuItem icon={list} title = "Administrar Eventos" onClick={()=>{history.push(ROUTES.ADMIN_EVENT)}}/>
                        <MenuItem icon={addEvent} title = "Agregar Evento" onClick={()=>{history.push(ROUTES.ADD_EVENT); sessionStorage.removeItem("event")}}/>
                        <MenuItem icon={change} title = "Cambiar Contraseña" onClick={()=>{history.push(ROUTES.CHANGE_PASSWORD)}}/>
                        <MenuItem icon={exit} title = "Logout" onClick={()=>{history.push(ROUTES.NEWS_FEED); sessionStorage.removeItem("event");sessionStorage.removeItem("session")}}/>
                    </Fragment>
                }
                {isAdmin(session.roles) && 
                    <Fragment>
                        <MenuItem icon={eventHistory} title = "Historial De Eventos" onClick={()=>{history.push(ROUTES.EVENT_HISTORY)}}/>
                        <MenuItem icon={user} title = "Administrar Usuarios" onClick={()=>{history.push(ROUTES.ADMIN_USER)}}/>
                        <MenuItem icon={addUser} title = "Agregar Usuario" onClick={()=>{history.push(ROUTES.ADD_USER)}}/>
                        <MenuItem icon={change} title = "Cambiar Contraseña" onClick={()=>{history.push(ROUTES.CHANGE_PASSWORD)}}/>
                        <MenuItem icon={exit} title = "Logout" onClick={()=>{history.push(ROUTES.NEWS_FEED); sessionStorage.removeItem("event");sessionStorage.removeItem("session")}}/>
                    </Fragment>
                }
                </Fragment>
            )} />
            </Row>
            <Route render={() => {
            if (!session) {
              return <Redirect push to={ROUTES.LOGIN} />;
            }

           }}
         />
         <Footer />
        </div>
        
    )
}
}