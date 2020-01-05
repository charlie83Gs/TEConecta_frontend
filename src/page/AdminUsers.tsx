import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container, Label} from 'reactstrap';
import Header from '../component/Header';
import { Route } from "react-router-dom";
import {getUsers,deleteUser} from '../services/user.services'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import {Button} from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ROUTES from '../config/routes';

type AdminUsersState = {
  users: any,
}

export default class AdminUsers extends Component<{}, AdminUsersState> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {
    //var username : any = localStorage.getItem("username");
      this.setState({"users" : undefined})
      getUsers(this.onUsersLoaded);
  }

  onUsersLoaded = (response : any) =>{
      console.log(response )
      this.setState({"users" : response});
  }

  setUser = (user: any) => { 
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  deleteUser = (user: any) => { 
    deleteUser(user.id, ()=>{});
  }


  render() {
    let myself = this;
    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
            <Header title="Administrar Usuarios" navigate={true}></Header> 
            {this.state.users ?
              <List>
              {this.state.users.map(
                (user : any,index : number) =>{
                return (
                  <Row className="ml-0 mr-0 mb-2 p-2" style={{"backgroundColor":"#FFF"}}>
                  <Col md="6" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={user.name}
                           secondary={user.id + " - " + user.location}/>
                  </ListItem >
                  </Col>
                  <Route render={({ history}) => (
                  <Col md="4"  className="my-auto">
                  
                  <Button variant="contained" color="primary" 
                    onClick={()=>{myself.setUser(user);history.push(ROUTES.ADD_USER);}}>
                    Edit
                  </Button>
                  <Button className="ml-5" variant="contained" color="secondary" 
                    onClick={()=>{myself.deleteUser(user);window.location.reload();;}}>
                    Delete
                  </Button>
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