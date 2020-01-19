import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container} from 'reactstrap';
import Header from '../component/Header';
import { Route } from "react-router-dom";
import {getEvents, getEventsNoFilter} from '../services/event.service'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import {Button} from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ROUTES from '../config/routes';
import Event from '../model/event.model';


type EventHistoryState = {
  events: any,
}


export default class EventHistory extends Component<{}, EventHistoryState> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


    componentWillMount() {
      //var username : any = localStorage.getItem("username");
        this.setState({"events" : undefined})
        getEventsNoFilter(this.onEventsLoaded);//cambie esto para que el admSuperior vea todos 
    }
  


  onEventsLoaded = (response : any) =>{
    /*console.log("loaded")
    console.log(response )*/
    var newEvents : Event[] = [];
    response.forEach(
      (event : any) =>{
        newEvents.push(Event.loadFromJson(event));
      }
    )
    newEvents = Event.sortByDate(newEvents)
    this.setState({"events" : newEvents}); 
  }

  render() {
    let myself = this;
    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
            <Header title=" - Historial de eventos" navigate={true}></Header> 
            <Row className="m-0 dark_blue white_text" >
            <Col md="2">
              <h5>Nombre</h5>
            </Col>
            <Col md="2">
              <h5>Fecha</h5>
            </Col>
            <Col md="2">
              <h5>Participantes</h5>
            </Col>
            <Col md="2">
              <h5>Sede</h5>
            </Col>
            <Col md="2">
              <h5>Lugar</h5>
            </Col>
            <Col md="2">
              <h5>Organizador</h5>
            </Col>
            </Row>
            
            {this.state.events ?
              <List>
              {this.state.events.map(
                (event : Event,index : number) =>{
                return (
                  <Row className="ml-0 mr-0 mb-2 p-2" style={{"backgroundColor":"#FFF"}} key = {index}>
                  <Col md="2" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={event.name}/>

                  </ListItem >
                  </Col>
                  <Col md="2" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={ event.date}/>

                  </ListItem >
                  </Col>
                  <Col md="2" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={event.space}/>

                  </ListItem >
                  </Col>
                  <Col md="2" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={event.place }/>

                  </ListItem >
                  </Col>
                  <Col md="2" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={event.location}/>

                  </ListItem >
                  </Col>
                  <Col md="2" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={event.owner}/>

                  </ListItem >
                  </Col>
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