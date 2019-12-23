import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container} from 'reactstrap';
import Header from '../component/Header';
import MenuItem from '../component/MenuItem';
import { Route } from "react-router-dom";

//import icons
import list from '../resources/list.svg';
import addEvent from '../resources/addEvent.svg';
import eventHistory from '../resources/eventHistoryA.svg';
import user from '../resources/user.svg';
import addUser from '../resources/addUserA.svg';
import ROUTES from '../config/routes';



// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type MenuState = {

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
    
    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
            <Header title="Centro de administración"></Header> 
            <Row className="mt-4">
            <Route render={({ history}) => (
                <Fragment>
                <MenuItem icon={list} title = "Administrar Eventos" onClick={()=>{history.push(ROUTES.ADMIN_EVENT)}}/>
                <MenuItem icon={addEvent} title = "Agregar Evento" onClick={()=>{history.push(ROUTES.ADD_EVENT)}}/>
                <MenuItem icon={eventHistory} title = "Historial De Eventos" onClick={()=>{history.push(ROUTES.EVENT_HISTORY)}}/>
                <MenuItem icon={user} title = "Administrar Usuarios" onClick={()=>{history.push(ROUTES.ADMIN_USER)}}/>
                <MenuItem icon={addUser} title = "Agregar Usuario" onClick={()=>{history.push(ROUTES.ADD_USER)}}/>
                </Fragment>
            )} />
            </Row>
        </div>
        
    )
}
}