import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container} from 'reactstrap';
import Header from '../component/Header';
import { Route } from "react-router-dom";
import {getEvents} from '../services/event.service'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import {Button} from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ROUTES from '../config/routes';
import AlertDialog from '../component/AlertDialog'
import {updateEvent} from '../services/event.service'
import {getSession} from '../services/session.service';
import Event from '../model/event.model';
type AdminEventState = {
  events: any,
}

export default class AdminEvent extends Component<{}, AdminEventState> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
    }

    

  componentWillMount() {
    //var username : any = localStorage.getItem("username");
      this.setState({"events" : undefined})

      getEvents(this.onEventsLoaded);
  }

  onEventsLoaded = (response : any) =>{
      console.log("loaded")
      console.log(response )
      this.setState({"events" : response});
  }

  setEvent = (event: any) => { 
    sessionStorage.setItem("event", JSON.stringify(event));
  }

  deleteEvent = (event: any) => { 
    //deleteUser(user.id, ()=>{});
  }

  onCancelEvent = (result : boolean) =>{
  }

  handleCancel = (event: Event) => {
    //TODO validation
    let stateUpdate : any = {}
    let err : boolean = false
    //reset status
    stateUpdate["nameError"] = false;
    stateUpdate["descriptionError"] = false;
    stateUpdate["placeError"] = false;


    this.setState(stateUpdate);
    //console.log(err)
    if(err) return;
    var session = getSession();
    //create a new event object
    let newEvent : Event = new Event(
                                  event.id,
                                  event.name,
                                  event.date,
                                  event.description,
                                  event.place,
                                  "event",
                                  event.location,
                                  event.urlImgActivity,
                                  event.timeI,
                                  event.timeF,
                                  event.assistance,
                                  "Cancelado",
                                  event.space,
                                  session.id
    );
    console.log("cancel event object");
    updateEvent(newEvent,this.onCancelEvent);

  }

  render() {
    let myself = this;
    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
            <Header title="Administrar Eventos" navigate={true}></Header> 
            <Row className="m-0 dark_blue white_text" >
            <Col md="2">
              <h5>Nombre</h5>
            </Col>
            <Col md="2">
              <h5>fecha</h5>
            </Col>
            <Col md="1">
              <h5>cupo</h5>
            </Col>
            </Row>
            {this.state.events ?
              <List>
              {this.state.events.map(
                (event : any,index : number) =>{
                return (
                  <Row className="ml-0 mr-0 mb-2 p-2" style={{"backgroundColor":"#FFF"}} key = {index}>
                  <Col md="2" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={event.name + " - " + event.date }
                           secondary={event.description.substring(0,Math.min(20))}/>

                  </ListItem >
                  </Col>
                  <Col md="2" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={ event.date}/>

                  </ListItem >
                  </Col>
                  <Col md="1" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={event.space}/>

                  </ListItem >
                  </Col>
                  <Route render={({ history}) => (
                  <Col md="7"  className="my-auto">
                  
                  <Button variant="contained" color="primary" 
                    onClick={()=>{myself.setEvent(event) ;history.push(ROUTES.ADD_EVENT);}}>
                    Actualizar
                  </Button>
                  <Button className="ml-2" variant="contained" color="primary" >
                    Participantes
                  </Button>

                  <AlertDialog onAccept={() => {this.handleCancel(event); history.push(ROUTES.ADMIN_EVENT);}}  onReject={() => {}} text ={"cancelar"} 
                  titleText = {"¿Desea cancelar la actividad seleccionada?"}
                  infoText = {"Una vez cancela no se puede activar nuevamente."}/>

                  </Col>
                  )} />
                  </Row>
                )   
                }
              )}
              </List>
              :
              <div></div>
            }
           
        </div>
        
    )
}
}